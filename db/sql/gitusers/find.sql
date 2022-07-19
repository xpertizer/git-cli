/*
    Finds a gitusers by user id + gitusers name.
*/
SELECT * FROM gitusers
WHERE login = ${login} AND location = ${location}
