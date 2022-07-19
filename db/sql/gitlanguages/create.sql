/*
    Creates table gitlanguages.
*/
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