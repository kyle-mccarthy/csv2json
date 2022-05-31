use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::models::{Document, DocumentPubId, Timestamp};

#[derive(Debug, Clone, PartialEq, Eq, sqlx::FromRow, Serialize, Deserialize)]
pub struct DocumentResponse {
    pub(crate) id: DocumentPubId,
    pub(crate) created_at: Timestamp,
    pub(crate) updated_at: Timestamp,
    pub(crate) title: String,
    pub(crate) contents: Value,
}

impl From<Document> for DocumentResponse {
    fn from(source: Document) -> Self {
        DocumentResponse {
            id: source.pub_id,
            created_at: source.created_at,
            updated_at: source.updated_at,
            title: source.title,
            contents: source.contents,
        }
    }
}
