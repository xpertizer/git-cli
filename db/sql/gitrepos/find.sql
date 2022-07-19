/*
    Finds a gitrepos by user id + gitrepos name.
*/
SELECT * FROM gitrepos
WHERE login = ${login} 
