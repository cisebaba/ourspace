# Data models

## Users

| Name     | Type   | Unique | Optional |
| -------- | ------ | ------ | -------- |
| username | string | yes    | no       |
| email    | string | yes    | no       |
| fullname | string | no     | no       |
| location | string | no     | yes      |
| role     | string | no     | no       |

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
| description | string | no | no |

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

## Events & Conference

| Name        | Type   | Unique | Optional |
| ----------- | ------ | ------ | -------- |
| name        | string | yes    | no       |
| location    | string | yes    | no       |
| dates       | string | no     | no       |
| description | string | no     | yes      |
| photo URL   | string | no     | no       |
| photo URL   | string | no     | no       |
| photo URL   | string | no     | no       |
| photo URL   | string | no     | no       |

The `Users` entity contains the data about a user account
with personalized information.
