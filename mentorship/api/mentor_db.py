import psycopg
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

pool = ConnectionPool()


class MentorshipQueries:
    def get_all_mentorships(self):
        with psycopg.connect("dbname=mentorship user=ourspace") as conn:
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
                        "job_title":row[1],
                        "description": row[2],
                        "availability": row[3],
                        "mentor_username": row[4],
                        "mentee_username": row[5]
                    }
                    ds.append(d)

                return ds


    def get_one_mentorship(self, mentorship_id: int):
        with psycopg.connect("dbname=mentorship user=ourspace") as conn:
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
                    "job_title":row[1],
                    "description": row[2],
                    "availability": row[3],
                    "mentor_username": str(row[4]),
                    "mentee_username": str(row[5])
                }
                return record