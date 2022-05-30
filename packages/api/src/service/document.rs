use serde_json::Value;
use sqlx::PgPool;

use crate::{
    error::Result,
    models::{Document, DocumentPubId},
};

#[derive(Clone)]
pub struct DocumentService {
    pool: PgPool,
}

impl DocumentService {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn insert(&self, title: String, contents: Value) -> Result<Document> {
        let query = "INSERT INTO documents (title, contents) VALUES ($1, $2) RETURNING *";

        let result: Document = sqlx::query_as(query)
            .bind(title)
            .bind(contents)
            .fetch_one(&self.pool)
            .await?;

        Ok(result)
    }

    pub async fn find_by_pub_id(&self, pub_id: DocumentPubId) -> Result<Option<Document>> {
        let query = "SELECT * FROM documents WHERE pub_id = $1";

        let result: Option<Document> = sqlx::query_as(query)
            .bind(pub_id)
            .fetch_optional(&self.pool)
            .await?;

        Ok(result)
    }
}

#[cfg(test)]
mod test_db {
    use serde_json::json;

    use crate::app;

    #[tokio::test]
    async fn test_insert_select() {
        let app = app().await;

        let result = app
            .documents
            .insert("test".into(), json!([{"key": "value"}]))
            .await;

        assert!(result.is_ok());

        let result = result.unwrap();

        let fetched = app.documents.find_by_pub_id(result.pub_id).await;

        assert!(fetched.is_ok());

        let fetched = fetched.unwrap();

        assert!(fetched.is_some());

        let fetched = fetched.unwrap();

        assert_eq!(result, fetched);
    }
}
