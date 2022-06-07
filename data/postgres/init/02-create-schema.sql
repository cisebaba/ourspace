\connect ourspace

CREATE TABLE jobs (
    id BIGINT NOT NULL PRIMARY KEY,
    created TIMESTAMP NOT NULL,
    city VARCHAR(200),
    state VARCHAR(50),
    title VARCHAR(200),
    company VARCHAR(250),
    description TEXT,
    redirect_url VARCHAR(1000)
);

CREATE TABLE users (
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL, 
    email VARCHAR(200) NOT NULL PRIMARY KEY, 
    firstname VARCHAR(200) NOT NULL, 
    lastname VARCHAR(200) NOT NULL,
    city VARCHAR(200),
    state VARCHAR(50),
    role VARCHAR(50)
    
);

ALTER TABLE jobs OWNER TO ourspace;
ALTER TABLE users OWNER TO ourspace;