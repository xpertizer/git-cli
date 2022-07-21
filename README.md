# Git CLI
## TO DO LIST

1 - Save repositories and programming languages data into database
2 - Code of list command line



This project allow get informations from git users and store in postgres database and search users by location and code languages that 

First of all, install Node and NPM

What you need to run it?

1 - Postgres database server, if you use docker in root directory have a docker-compose. You can use 2 containers inside pg server and pg admin

    a - initialize containers with docker-compose up on root path using terminal
    b - You can access PG ADMIN to connect using your browser on http://localhost:5050/
    c - Pg Server will run on this network address "localhost" and default port number 5432
    d - Credential are set on docker-compose or you can check db-config.json file on root


2 - Migrations


    a - You can recreate database running following commands on PG-ADMIN or any prefered tools that can run scripts on postgres server, dbeaver for instance.

    CREATE DATABASE lovelystaydb
        WITH
        OWNER = pg_database_owner
        ENCODING = 'UTF8'
        LC_COLLATE = 'en_US.utf8'
        LC_CTYPE = 'en_US.utf8'
        TABLESPACE = pg_default
        CONNECTION LIMIT = -1
        IS_TEMPLATE = False;

    b - After you have database available on terminal in application path type:
        
        npm run refresh
        db-migrate up initialize
    c - Run on terminal 'npm link', this will let use git-cli command on terminal.

3 - Finnaly, test using command bellow.

Enjoy


CLI Commands

git-cli fetch <user> - Fetch profile, repositories and code languages from git <user>
git-cli fetch <list> - List users
