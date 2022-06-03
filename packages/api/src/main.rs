use std::{env, sync::Arc};

use axum::{
    routing::{get, post},
    Extension, Router,
};
use service::{DocumentService, TransformService};
use sqlx::PgPool;
use tower_http::{cors::{self, AllowMethods, CorsLayer}, trace::TraceLayer};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};


mod error;
mod http;
mod models;
mod service;

pub struct Config {
    /// connection string for the database
    db_url: String,
}

impl Config {
    pub fn new() -> Self {
        let default_db_url = if cfg!(test) {
            "postgres://postgres@localhost/csv2json_test"
        } else {
            "postgres://postgres@localhost/csv2json"
        };

        let db_url = env::var("DATABASE_URL").unwrap_or(default_db_url.into());

        Config { db_url }
    }
}

pub async fn app() -> App {
    let config = Config::new();

    let pool = PgPool::connect(&config.db_url).await.expect(&format!(
        "failed to create the connection pool on {}",
        &config.db_url
    ));

    let state = State {
        transformer: TransformService::default(),
        documents: DocumentService::new(pool.clone()),
        pool,
    };

    Arc::new(state)
}

/// Creates a new router with the routes and shared state attached.
pub async fn router(app: App) -> Router {
    Router::new()
        .route("/transform/csv-to-json", post(http::post_csv))
        .route("/document/:id", get(http::get_document))
        .route("/document/:id/download", get(http::download_document))
        .layer(Extension(app))
        .layer(
            CorsLayer::new()
                .allow_methods(AllowMethods::any())
                .allow_origin(cors::Any),
        )
        .layer(TraceLayer::new_for_http())
}

#[derive(Clone)]
pub struct State {
    transformer: TransformService,
    documents: DocumentService,
    pool: PgPool,
}

pub type App = Arc<State>;

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG")
                .unwrap_or_else(|_| "csv2json_api=debug,tower_http=warn".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let host = env::var("HOST").unwrap_or("127.0.0.1".into());
    let port = env::var("PORT").unwrap_or("3001".into());

    let addr = format!("{host}:{port}");

    let app = app().await;

    sqlx::migrate!()
        .run(&app.pool)
        .await
        .expect("failed to run migrations");

    tracing::debug!("successfully ran db migrations");

    axum::Server::bind(&addr.parse().expect("invalid host or port provided"))
        .serve(router(app).await.into_make_service())
        .await
        .expect("failed to start server")
}
