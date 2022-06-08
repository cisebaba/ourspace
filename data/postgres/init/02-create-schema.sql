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
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200) NOT NULL, 
    lastname VARCHAR(200) NOT NULL,
    city VARCHAR(200),
    state VARCHAR(50),
    role VARCHAR(50)
);

-- FORUM TABLES

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR, 
    text TEXT,
    created_on TIMESTAMP
    --upvotes --foreign key to upvotes
    --author -- foreign key to userid
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    post_id int references post(post_id), --foreign key
    text VARCHAR(5000)
    --commenter -- foreign key to userid
    --upvotes -- foreign key to upvotes
);

CREATE TABLE mentorship(
    id SERIAL NOT NULL PRIMARY KEY,
    job_title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    availability VARCHAR(500) NOT NULL,
    booked BOOLEAN,
    mentor_username VARCHAR(100) references users(username),
    mentee_username VARCHAR(100) references users(username)
);

CREATE TABLE reviews(
    id SERIAL NOT NULL PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    rating INT NOT NULL,
    salary INT NOT NULL,
    diversity INT NOT NULL,
    balance INT NOT NULL,
    parental_leave INT NOT NULL,
    flexibility INT NOT NULL
);



ALTER TABLE jobs OWNER TO ourspace;
ALTER TABLE users OWNER TO ourspace;
ALTER TABLE post OWNER TO ourspace;
ALTER TABLE reviews OWNER TO ourspace;
ALTER TABLE comment OWNER TO ourspace;
ALTER TABLE mentorship OWNER TO ourspace;


