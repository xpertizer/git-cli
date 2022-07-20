/*
    Finds a gitlanguages by user id + gitlanguages name.
*/
SELECT * FROM gitlanguages
WHERE name = ${name} AND login = ${login}
