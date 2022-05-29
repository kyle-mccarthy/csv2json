use std::{env, sync::Arc};

use axum::{routing::post, Extension, Router};
use handler::post_csv;
use service::TransformService;

mod error;
mod handler;
mod service;

/// Creates a new router with the routes and shared state attached.
pub fn app() -> Router {
    Router::new()
        .route("/transform/csv-to-json", post(post_csv))
        .layer(Extension(Arc::new(State::default())))
}

#[derive(Clone, Default)]
pub struct State {
    transformer: TransformService,
}

pub type App = Arc<State>;

#[tokio::main]
async fn main() {
    let host = env::var("HOST").unwrap_or("127.0.0.1".into());
    let port = env::var("PORT").unwrap_or("3000".into());

    let app = app();

    axum::Server::bind(
        &format!("{host}:{port}")
            .parse()
            .expect("invalid host or port provided"),
    )
    .serve(app.into_make_service())
    .await
    .expect("faile to start server")
}
