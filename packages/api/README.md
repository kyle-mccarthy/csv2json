# CSV2JSON API

Simple API that takes in a CSV document and converts it to JSON.

## Prerequisites

- Latest version of rust installed
- Postgresql >= 14 is installed
- [sqlx-cli](https://crates.io/crates/sqlx-cli) is installed

## Usage

1. Add the database connection string to the environment 
    - Export it via `export
      DATABASE_URL="postgres://{user}:{password}@{host}/{database}"` 
    - Prepend when running commands (e.x `DATABASE_URL="..." sqlx database
      create`)

2. Create the database and run the migrations _(make sure to prepend each
command with the env var above if it hasn't been exported)_

```
> sqlx database create sqlx mig run
```

3. Run the API

- By default the API will run on 127.0.0.1:3000, this can be configured with
  the `HOST` and `PORT` env variables
- Make sure that the `DATABASE_URL` env variable has been exported or prepended
  to the command. By default it will use
  `postgres://postgres@localhost/csv2json`

```
> cargo run --release
```
