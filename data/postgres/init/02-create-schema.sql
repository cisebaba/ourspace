\connect jobs

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

ALTER TABLE jobs OWNER TO ourspace;

\connect accounts

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200), 
    lastname VARCHAR(200)
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    city VARCHAR(200),
    state VARCHAR(50),
    role VARCHAR(50),
    userid INT REFERENCES users(id)
);

CREATE TABLE mentorshipVO(
    id SERIAL NOT NULL PRIMARY KEY,
    job_title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    availability VARCHAR(500) NOT NULL,
    mentor_username VARCHAR(100),
    mentee_username VARCHAR(100) 
);
CREATE TABLE eventsVO(
    href VARCHAR(200) NOT NULL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    starts TIMESTAMP,
    ends TIMESTAMP,
    description TEXT NOT NULL,
    location TEXT NOT NULL
);

ALTER TABLE eventsVO OWNER TO ourspace;
ALTER TABLE mentorshipVO OWNER TO ourspace;
ALTER TABLE users OWNER TO ourspace;
ALTER TABLE profile OWNER TO ourspace;

\connect forum

CREATE TABLE post (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR, 
    text TEXT,
    created_on TIMESTAMP,
    author VARCHAR(100)
);

CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY,
    post_id int references post(post_id) ON DELETE CASCADE,
    text VARCHAR(5000),
    created_on TIMESTAMP,
    commenter VARCHAR(100)
);

CREATE TABLE post_upvote (
    post_upvote_id SERIAL PRIMARY KEY, 
    post_id int references post(post_id) ON DELETE CASCADE,
    upvoter VARCHAR(100)
);



ALTER TABLE post OWNER TO ourspace;
ALTER TABLE comment OWNER TO ourspace;
ALTER TABLE post_upvote OWNER TO ourspace;

\connect mentorship

CREATE TABLE mentorship(
    id SERIAL NOT NULL PRIMARY KEY,
    job_title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    availability VARCHAR(500) NOT NULL,
    mentor_username VARCHAR(100),
    mentee_username VARCHAR(100) 
);

ALTER TABLE mentorship OWNER TO ourspace;

\connect reviews

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

ALTER TABLE reviews OWNER TO ourspace;




