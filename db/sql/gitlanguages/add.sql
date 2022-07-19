/*
    Adds a new gitlanguages for the specified gitlanguages.
*/
INSERT INTO gitlanguages(
	login, language, name)
	VALUES (${login}, ${language}${name});
RETURNING *
