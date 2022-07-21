/*
    Adds a new gi trepos for the specified git repos.
*/
INSERT INTO gitrepos(
	login, repositoryname)
	VALUES (${login}, ${repositoryname});
VALUES(${login}, ${repositoryname})
RETURNING *
