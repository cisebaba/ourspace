\connect ourspace

CREATE TABLE jobs (
    id INTEGER NOT NULL PRIMARY KEY,
    created TIMESTAMP NOT NULL,
    contract_time VARCHAR(20),
    city VARCHAR(200),
    state VARCHAR(50),
    title VARCHAR(200),
    company VARCHAR(250),
    description TEXT
);

ALTER TABLE jobs OWNER TO ourspace;