use std::{env, sync::Arc};

use axum::{routing::{post, get}, Extension, Router};
use service::{DocumentService, TransformService};
use sqlx::PgPool;

mod error;
mod models;
mod service;
mod http;

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

    let pool = PgPool::connect(&config.db_url)
        .await
        .expect("failed to create the connection pool");

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
        .layer(Extension(app))
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
    let host = env::var("HOST").unwrap_or("127.0.0.1".into());
    let port = env::var("PORT").unwrap_or("3000".into());

    let addr = format!("{host}:{port}");

    let app = app().await;

    axum::Server::bind(&addr.parse().expect("invalid host or port provided"))
        .serve(router(app).await.into_make_service())
        .await
        .expect("failed to start server")
}
