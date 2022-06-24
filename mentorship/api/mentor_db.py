import os
from psycopg_pool import ConnectionPool

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class MentorshipQueries:
    def get_all_mentorships(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT m.id, m.job_title, m.description, m.availability,
                        m.mentor_username, m.mentee_username
                    FROM mentorship m
                    WHERE m.mentee_username IS null
                """
                )

                ds = []
                for row in cur.fetchall():
                    d = {
                        "id": row[0],
                        "job_title": row[1],
                        "description": row[2],
                        "availability": row[3],
                        "mentor_username": row[4],
                        "mentee_username": row[5],
                    }
                    ds.append(d)

                return ds

    def get_one_mentorship(self, mentorship_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    f"""
                    SELECT m.id, m.job_title, m.description, m.availability,
                        m.mentor_username, m.mentee_username
                    FROM mentorship m
                    WHERE id = %s
                """,
                    [mentorship_id],
                )
                row = cur.fetchone()
                if row is None:
                    return {"message": "Mentorship not found"}
                record = {
                    "id": row[0],
                    "job_title": row[1],
                    "description": row[2],
                    "availability": row[3],
                    "mentor_username": str(row[4]),
                    "mentee_username": str(row[5]),
                }
                return record

    def insert_mentorship(
        self, job_title, description, availability, username
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO mentorship (job_title, description, availability, mentor_username, mentee_username)
                        VALUES (%s, %s, %s, %s, null)
                        RETURNING id, job_title, description, availability, mentor_username, mentee_username
                        """,
                        [job_title, description, availability, username],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    def update_mentorship(self, username, mentorship_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        UPDATE mentorship
                        SET mentee_username = %s
                        WHERE id = %s
                        RETURNING id, job_title, description, availability, mentor_username, mentee_username
                    """,
                        [username, mentorship_id],
                    )
                except Exception as e:
                    return e

                conn.commit()
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
