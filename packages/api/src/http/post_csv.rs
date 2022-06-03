use axum::{
    extract::{ContentLengthLimit, Multipart},
    Extension, Json,
};

use super::response::DocumentResponse;
use crate::{error::Error, App};

/// Handles incoming requests and transforms the attached CSV to JSON.
pub async fn post_csv(
    Extension(app): Extension<App>,
    ContentLengthLimit(mut multi): ContentLengthLimit<Multipart, { 25 * 1024 * 1024 }>,
) -> Result<Json<DocumentResponse>, Error> {
    let field = multi.next_field().await?.ok_or(Error::MissingFile)?;

    let title = field.file_name().unwrap_or("unnamed").to_owned();
    let file_contents = field.bytes().await?;

    let contents = app.transformer.csv_to_json(file_contents.as_ref())?;

    let result = app.documents.insert(title, contents).await?;

    Ok(Json(result.into()))
}

#[cfg(test)]
mod route_tests {
    use axum::{
        body::Body,
        http::{self, Request},
    };
    use hyper::StatusCode;
    use tower::ServiceExt;

    use crate::{app, http::response::DocumentResponse, router};

    #[tokio::test]
    async fn test_post_csf() {
        let body = "--123\r\n\
Content-Disposition: form-data; name=\"file\"; filename=\"csvfile.csv\"\r\n\
Content-Type: text/csv\r\n\
\r\n\
iata,city,state
STL,St. Louis,Missouri
CHI,Chicago,Illinois
DAL,Dallas,Texas
\r\n\
--123--\r\n";

        let req = Request::builder()
            .method(http::Method::POST)
            .uri("/transform/csv-to-json")
            .header(
                http::header::CONTENT_TYPE,
                "multipart/form-data; boundary=123",
            )
            .body(Body::from(body))
            .unwrap();

        let app = app().await;
        let res = router(app).await.oneshot(req).await.unwrap();
        assert_eq!(res.status(), StatusCode::OK);

        let body = hyper::body::to_bytes(res.into_body()).await.unwrap();

        let found = serde_json::from_slice::<DocumentResponse>(&body).unwrap();
        let expected = serde_json::json!([
            {"iata": "STL", "city": "St. Louis", "state": "Missouri"},
            {"iata": "CHI", "city": "Chicago", "state": "Illinois"},
            {"iata": "DAL", "city": "Dallas", "state": "Texas"}
        ]);

        assert_eq!(found.contents, expected);
    }
}
