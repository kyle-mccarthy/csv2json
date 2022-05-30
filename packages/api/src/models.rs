use std::fmt::Display;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

pub type Timestamp = DateTime<Utc>;

#[derive(
    Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Copy, sqlx::Type,
)]
#[serde(transparent)]
#[sqlx(transparent)]
pub struct DocumentId(i32);

#[derive(
    Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Copy, sqlx::Type,
)]
#[serde(transparent)]
#[sqlx(transparent)]
pub struct DocumentPubId(Uuid);

impl Display for DocumentPubId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.0.to_hyphenated_ref().fmt(f)
    }
}

#[derive(Debug, Clone, PartialEq, Eq, sqlx::FromRow, Serialize)]
pub struct Document {
    #[serde(skip)]
    pub(crate) id: DocumentId,
    #[serde(rename(serialize = "id"))]
    pub(crate) pub_id: DocumentPubId,
    pub(crate) created_at: Timestamp,
    pub(crate) updated_at: Timestamp,
    pub(crate) title: String,
    pub(crate) contents: Value,
}
