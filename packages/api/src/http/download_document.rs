use axum::{
    extract::Path,
    http::HeaderValue,
    response::{IntoResponse, Response},
    Extension, Json,
};

use crate::{
    error::{Error, Result},
    models::DocumentPubId,
    App,
};

use super::response::DocumentResponse;

pub async fn download_document(
    Path(id): Path<DocumentPubId>,
    Extension(app): Extension<App>,
) -> Result<Response> {
    let document = app
        .documents
        .find_by_pub_id(id)
        .await?
        .ok_or(Error::DocumentNotFound(id))?;

    let content_disposition = format!("attachment; filename=\"{}\"", &document.title);

    let mut res: Response = Json::<DocumentResponse>(document.into()).into_response();

    res.headers_mut().insert(
        "Content-Disposition",
        HeaderValue::from_str(&content_disposition)?,
    );

    Ok(res)
}

#[cfg(test)]
mod test_download_document {
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
            .insert("test.json".into(), json!([]))
            .await
            .unwrap();

        let res = router(app)
            .await
            .oneshot(
                Request::builder()
                    .method(http::Method::GET)
                    .uri(&format!("/document/{}/download", document.pub_id))
                    .body(Body::empty())
                    .unwrap(),
            )
            .await
            .unwrap();

        assert_eq!(res.status(), 200);

        assert_eq!(
            res.headers().get("Content-Disposition").unwrap(),
            r#"attachment; filename="test.json""#
        );
    }
}
