-- In here, you can create any extra users and databases
-- that you might need for all of your services

CREATE USER ourspace WITH LOGIN PASSWORD 'ourspace';

CREATE DATABASE accounts WITH OWNER ourspace;
CREATE DATABASE reviews WITH OWNER ourspace;
CREATE DATABASE jobs WITH OWNER ourspace;
CREATE DATABASE events WITH OWNER ourspace;
CREATE DATABASE forum WITH OWNER ourspace;
CREATE DATABASE mentorship WITH OWNER ourspace;