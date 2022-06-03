# CSV2JSON

A fullstack rust and react app that converts CSV documents to JSON.

## Packages

- [`api`](packages/api) - HTTP API to convert the CSV documents
- [`web`](packages/web) - Web app that provides a UI for interacting with the API

## Usage

Docker compose can be used to run the frontend, API and database. The default docker compose config lives at [./docker-compose.yml](./docker-compose.yml) and runs the API on port 3001 and the frontend site on port 3000.

Get started by running `docker compose up`!

Alternatively, each service can be run independently using the directions in their respective packages.

## Tech Stack

- Next.js, TypeScript, and React
- Rust, Axum, Tokio, and SQLx
- Postgres
