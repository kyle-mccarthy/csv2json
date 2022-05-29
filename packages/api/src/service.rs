use csv::Reader as CsvReader;
use serde_json::Value;
use std::io::Read;

use crate::error::*;

#[derive(Clone, Copy, Default)]
pub struct TransformService;

impl TransformService {
    pub fn csv_to_json<R: Read>(&self, reader: R) -> Result<Value> {
        // create the csv reader + deserializer
        let mut reader = CsvReader::from_reader(reader);

        let headers = reader
            .headers()?
            .into_iter()
            .map(|s| s.to_string())
            .collect::<Vec<String>>();

        let deserializer = reader.deserialize::<Vec<Value>>();

        // turn the deserializer into an iterator and collect the results
        let values = deserializer
            .into_iter()
            .map(
                |row: csv::Result<Vec<Value>>| -> Result<Vec<(String, Value)>> {
                    let row = row?.into_iter();

                    // zip the headers and row -> (key, value)
                    let zipped = headers.clone().into_iter().zip(row).collect();

                    Ok(zipped)
                },
            )
            .map(|record| -> Result<Value> { Ok(serde_json::Map::from_iter(record?).into()) })
            .collect::<Result<Vec<Value>>>()?;

        Ok(values.into())
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_transforms_csv() {
        let input = "\
iata,city,state
STL,St. Louis,Missouri
CHI,Chicago,Illinois
DAL,Dallas,Texas
";

        let service = TransformService::default();
        let result = service.csv_to_json(input.as_bytes());

        assert!(result.is_ok());

        let output = result.unwrap();

        let expected = serde_json::json!([
            {"iata": "STL", "city": "St. Louis", "state": "Missouri"},
            {"iata": "CHI", "city": "Chicago", "state": "Illinois"},
            {"iata": "DAL", "city": "Dallas", "state": "Texas"}
        ]);

        assert_eq!(output, expected);
    }
}
