# Data models

## Users

| Name      | Type         | Unique | Optional |
| --------- | ------------ | ------ | -------- |
| username  | string       | yes    | no       |
| password  | string       | no     | no       |
| email     | string       | yes    | no       |
| firstname | string       | no     | no       |
| lastname  | string       | no     | no       |
| location  | ref_location | no     | yes      |
| role      | string       | no     | yes      |
| photo_url | string       | no     | no       |

The `Users` entity contains the data about a user account
with personalized information.

## Location

| Name  | Type   | Unique | Optional |
| ----- | ------ | ------ | -------- |
| city  | string | yes    | no       |
| state | string | yes    | no       |

### FORUM MODELS

## Post

| Name       | Type     | Unique | Optional |
| ---------- | -------- | ------ | -------- |
| id         | int      | yes    | no       |
| title      | string   | no     | no       |
| text       | string   | no     | no       |
| author     | ref_user | yes    | no       |
| timeposted | int      | no     | no       |

## Comment

| Name       | Type        | Unique | Optional |
| ---------- | ----------- | ------ | -------- |
| comment_id | int         | yes    | no       |
| post_id    | ref_post_id | yes    | no       |
| text       | string      | no     | no       |
| commenter  | ref_user    | yes    | no       |
| timeposted | int         | no     | no       |

## Upvote_post

| Name       | Type     | Unique | Optional |
| ---------- | -------- | ------ | -------- |
| comment_id | int      | yes    | no       |
| upvoter    | ref_user | no     | yes      |
| post_id    | ref_post | yes    | no       |

### EDUCATION

# Mentorship

| Name            | Type     | Unique | Optional |
| --------------- | -------- | ------ | -------- |
| mentor_username | ref_user | no     | no       |
| mentee_username | ref_user | no     | no       |
| description     | string   | no     | no       |
| availability    | string   | no     | no       |
| booked          | bool     | no     | no       |
| email           | str      | yes    | no       |
| location        | string   | no     | yes      |

## Jobs

| Company Name  | Type   | Unique | Optional |
| ------------- | ------ | ------ | -------- |
| company_name  | string | yes    | no       |
| company_type  | string | yes    | no       |
| email         | string | no     | no       |
| location      | string | no     | no       |
| job_type      | string | no     | no       |
| salary        | int    | no     | yes      |
| qualification | string | no     | no       |
| date Posted   | Int    | no     | yes      |

## Events & Conferences

| Name        | Type         | Unique | Optional |
| ----------- | ------------ | ------ | -------- |
| name        | string       | yes    | no       |
| location    | string       | no     | no       |
| dates       | int          | no     | no       |
| description | string       | no     | no       |
| photo_url   | string       | no     | no       |
| event_url   | string       | yes    | no       |
| userVO      | reference to | yes    | no       |

The `Events & Conferences` entity contains the data about events, conferences, and meetups.

## Company Reviews

| Name           | Type         | Unique | Optional |
| -------------- | ------------ | ------ | -------- |
| company_name   | string       | no     | no       |
| salary         | int          | no     | no       |
| rating         | int          | no     | no       |
| diversity      | int          | no     | no       |
| balance        | int          | no     | no       |
| parental_leave | int          | no     | no       |
| flexibility    | int          | no     | no       |
| userVO         | reference to | yes    | no       |

The `Company Reviews` entity contains the data where users can rate and review companies with the option of anonymity.
