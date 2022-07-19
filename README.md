# Git CLI

Migrations

Step
To create database run follow command on PG-ADMIN or any tools to run scripts on postgres server

CREATE DATABASE lovelystaydb
    WITH
    OWNER = pg_database_owner
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

Step
db-migrate up initialize