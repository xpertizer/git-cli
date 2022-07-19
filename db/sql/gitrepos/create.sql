/*
    Creates table gitrepos.
*/
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
