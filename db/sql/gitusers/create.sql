/*
    Creates table gitusers.
*/
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


