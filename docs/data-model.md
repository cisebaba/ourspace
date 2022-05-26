# Data models

## Users

| Name      | Type   | Unique | Optional |
| --------- | ------ | ------ | -------- |
| username  | string | yes    | no       |
| password  | string | no    | no       |
| email     | string | yes    | no       |
| fullname  | string | no     | no       |
| location  | string | no     | yes      |
| role      | string | no     | yes      |
| photo URL | string | no     | no       |

The `Users` entity contains the data about a user account
with personalized information.

### FORUM MODELS

## Post

| Name        | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| title       | string | no     | no       |
| description | string | no     | no       |
| uservo      | string | yes    | no       |
| author      | string | yes    | no       |
| timeposted  | int    | no     | no       |
| upvotes     | int    | no     | yes      |

## Comment

| Name        | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| text        | string | no     | no       |
| description | string | no     | no       |
| uservo      | string | yes    | no       |
| author      | string | yes    | no       |
| upvotes     | int    | no     | yes      |

## UserVO

| Name  | Type   | Unique | Optional |
| ----- | ------ | ------ | -------- |
| email | string | yes    | no       |

## Upvote_post

| Name    | Type | Unique | Optional |
| ------- | ---- | ------ | -------- |
| counter | int  | no     | yes      |
| post_id | int  | yes    | no       |

## Upvote_comment

| Name       | Type | Unique | Optional |
| ---------- | ---- | ------ | -------- |
| counter    | int  | no     | yes      |
| post_id    | int  | yes    | no       |
| comment_id | int  | yes    | no       |

### EDUCATION

## Scholarship

| Name | Type | Unique | Optional |
| ---- | ---- | ------ | -------- |

| name | string | no | no |
| uservo | string | yes | no |
| details | string | no | no |
| url | string | no | yes |
| organization | string | no | no |

# Mentorship

| Name | Type | Unique | Optional |
| ---- | ---- | ------ | -------- |

| uservo | string | yes | no |
| job_title | string | no | no |
| description | string | no | no |
| availability | string | no | no |
| has_mentee | bool | no | no |

## Jobs

| Company Name  | Type   | Unique | Optional |
| ------------- | ------ | ------ | -------- |
| Company Name  | string | yes    | no       |
| Company Type  | string | yes    | no       |
| email         | string | no     | no       |
| location      | string | no     | no       |
| Job Type      | string | no     | no       |
| Salary        | int    | no     | yes      |
| Qualification | string | no     | no       |
| Date Posted   | Int    | no     | yes      |

## Events & Conferences

| Name        | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| name        | string | yes    | no       |
| location    | string | no     | no       |
| dates       | int    | no     | no       |
| description | string | no     | no       |
| photo_url   | string | no     | no       |
| event_url   | string | yes    | no       |
| userVO      | string | yes    | no       |

The `Events & Conferences` entity contains the data about events, conferences, and meetups.

## Company Reviews

| Name                | Type   | Unique | Optional |
| ------------------- | ------ | ------ | -------- |
| company_name        | string | yes    | no       |
| employment_duration | int    | no     | no       |
| salary              | int    | no     | no       |
| benefits            | string | no     | yes      |
| role                | string | no     | no       |
| location            | string | no     | no       |
| ratings             | int    | no     | no       |
| review              | string | no     | no       |
| userVO              | string | yes    | no       |

The `Company Reviews` entity contains the data where users can rate and review companies with the option of anonymity.
