/*
    Adds a new gitusers.
*/
INSERT INTO public.gitusers(
	login, location, name, bio, avatar_url, company)
	VALUES (${login}, ${location}, ${name}, ${bio}, ${avatar_url}, ${company});
RETURNING *
