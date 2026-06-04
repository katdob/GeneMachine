FROM mysql:latest

# Official MySQL Community Server image — https://hub.docker.com/_/mysql
# Override these when running in non-local environments.
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=bvari

COPY bvari_snapshot.sql /docker-entrypoint-initdb.d/01-bvari_snapshot.sql

EXPOSE 3306
