use std::result::Result as StdResult;

use axum::{extract::multipart::MultipartError, http::StatusCode, response::IntoResponse, Json};
use hyper::header::InvalidHeaderValue;
use serde::{Serialize, Serializer};

use crate::models::DocumentPubId;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("Failed to parse the CSV")]
    Parse(#[from] csv::Error),

    #[error("Failed to read the request body")]
    Multipart(#[from] MultipartError),

    #[error("The request did not contain a CSV file")]
    MissingFile,

    #[error("Database Error {0:?}")]
    Database(#[from] sqlx::Error),

    #[error("The document with pub id {0:?} does not exist")]
    DocumentNotFound(DocumentPubId),

    #[error("Invalid header value :: {0:?}")]
    InvalidHeaderValue(#[from] InvalidHeaderValue),
}

impl Error {
    pub fn status_code(&self) -> StatusCode {
        match self {
            Self::Parse(_) | Self::Multipart(_) | Self::MissingFile => StatusCode::BAD_REQUEST,
            Self::DocumentNotFound(_) => StatusCode::NOT_FOUND,
            Self::Database(_) | Self::InvalidHeaderValue(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    pub fn message(&self) -> String {
        match self {
            Self::Multipart(_) | Self::Parse(_) | Self::MissingFile => self.to_string(),
            Self::DocumentNotFound(_) => "The requested resource could not be found".to_string(),
            Self::Database(_) | Self::InvalidHeaderValue(_) => {
                "An unknown error occurred".to_owned()
            }
        }
    }
}

impl From<Error> for ErrorResponse {
    fn from(source: Error) -> Self {
        ErrorResponse {
            message: source.message(),
            status: source.status_code(),
        }
    }
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        let response: ErrorResponse = self.into();
        response.into_response()
    }
}

#[derive(Serialize, Debug)]
pub struct ErrorResponse {
    message: String,
    #[serde(serialize_with = "status_code_serializer")]
    status: StatusCode,
}

fn status_code_serializer<S: Serializer>(status: &StatusCode, s: S) -> StdResult<S::Ok, S::Error> {
    s.serialize_u16(status.as_u16())
}

impl IntoResponse for ErrorResponse {
    fn into_response(self) -> axum::response::Response {
        let status_code = self.status;
        let mut res = Json(self).into_response();
        *res.status_mut() = status_code;
        res
    }
}

pub type Result<T> = std::result::Result<T, Error>;
