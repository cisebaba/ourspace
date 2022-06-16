import psycopg

class DuplicateAccount(RuntimeError):
    pass


class AccountsQueries:

    def get_user(self, username: str):
        # TODO: Replace the body of this method with real SQL
        # It MUST return a dictionary that contains the user
        # data NOT a row. Like:
        # { "id": 3, "username": "Caris", "email": "caris@example.com" }
        with psycopg.connect("dbname=accounts user=ourspace") as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    select a.id, a.username, a.email, a.firstname, a.lastname, password
                    from users a
                """
                )
                for user in cur.fetchall():
                    if user[1] == username:
                        user_dict = {
                            "id": user[0],
                            "username": user[1],
                            "email": user[2],
                            "firstname": user[3],
                            "lastname": user[4],
                            "password": user[5]
                        }
                        print(user_dict)
                        return user_dict

    def create_user(self, username: str, firstname: str, lastname: str, hashed_password: str, email: str = None):
        # TODO: Replace the body of this method with real SQL
        # It MUST return a dictionary that contains the user
        # data NOT a row. Like:
        # { "id": 3, "username": "Caris", "email": "caris@example.com" }
        with psycopg.connect("dbname=accounts user=ourspace") as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO users (username, firstname,lastname,password, email)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING username,firstname,lastname, password, email
                        """,
                        [username, firstname, lastname, hashed_password, email],
                    )
                except psycopg.errors.UniqueViolation:
                    raise DuplicateAccount()               
        
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
