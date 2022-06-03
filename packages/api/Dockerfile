# adapted from https://github.com/linux-china/axum-demo/blob/6d5fd1503f844412d5a2ce03dd57f196726e8449/Dockerfile

# Build Stage
FROM rust:1.61.0 as builder

RUN USER=root cargo new --bin api 
WORKDIR ./api
COPY ./Cargo.toml ./Cargo.toml
# Build empty app with downloaded dependencies to produce a stable image layer for next build
RUN cargo build --release

# Build web app with own code
RUN rm src/*.rs
ADD . ./
RUN rm ./target/release/deps/csv2json_api*
RUN cargo build --release


FROM debian:buster-slim
ARG APP=/usr/src/app

RUN apt-get update \
    && apt-get install -y ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080

ENV TZ=Etc/UTC
ENV APP_USER=appuser
ENV HOST=0.0.0.0
ENV PORT=8080

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

COPY --from=builder /api/target/release/csv2json_api ${APP}/app

RUN chown -R $APP_USER:$APP_USER ${APP}

USER $APP_USER
WORKDIR ${APP}

CMD ["./app"]
