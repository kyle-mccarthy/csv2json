use axum::{extract::Path, Extension, Json};

use crate::{
    error::{Error, Result},
    models::{Document, DocumentPubId},
    App,
};

pub async fn get_document(
    Path(id): Path<DocumentPubId>,
    Extension(app): Extension<App>,
) -> Result<Json<Document>> {
    let document = app
        .documents
        .find_by_pub_id(id)
        .await?
        .ok_or(Error::DocumentNotFound(id))?;

    Ok(Json(document))
}

#[cfg(test)]
mod test_get_document {
    use axum::{
        body::Body,
        http::{self, Request},
    };
    use serde_json::json;
    use tower::ServiceExt;

    use crate::{app, router};

    #[tokio::test]
    async fn test_get_document() {
        let app = app().await;

        let document = app
            .documents
            .insert("test".into(), json!([]))
            .await
            .unwrap();

        let res = router(app)
            .await
            .oneshot(
                Request::builder()
                    .method(http::Method::GET)
                    .uri(&format!("/document/{}", document.pub_id))
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(res.status(), 200);

        let body = hyper::body::to_bytes(res.into_body()).await.unwrap();
        let json = serde_json::from_slice::<serde_json::Value>(&body).unwrap();

        assert_eq!(json["id"].as_str().unwrap(), &document.pub_id.to_string());
    }
}
