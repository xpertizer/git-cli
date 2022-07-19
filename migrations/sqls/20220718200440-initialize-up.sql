/* Replace with your SQL commands */
-- Database: lovelystaydb

-- Table: public.gitusers

-- DROP TABLE IF EXISTS public.gitusers;

CREATE TABLE IF NOT EXISTS public.gitusers
(
    login character varying COLLATE pg_catalog."default",
    location character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default",
    bio character varying COLLATE pg_catalog."default",
    avatar_url character varying COLLATE pg_catalog."default",
    company character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gitusers
    OWNER to postgres;

-- Table: public.gitrepos

-- DROP TABLE IF EXISTS public.gitrepos;

CREATE TABLE IF NOT EXISTS public.gitrepos
(
    login character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gitrepos
    OWNER to postgres;


-- Table: public.gitlanguages

-- DROP TABLE IF EXISTS public.gitlanguages;

CREATE TABLE IF NOT EXISTS public.gitlanguages
(
    login character varying COLLATE pg_catalog."default",
    language character varying COLLATE pg_catalog."default",
    name character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gitlanguages
    OWNER to postgres;