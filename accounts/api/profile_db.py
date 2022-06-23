import psycopg
from poller import get_weather
from jose import jwt
# from psycopg_pool import ConnectionPool
# from psycopg.errors import UniqueViolation

# pool = ConnectionPool()


class ProfileQueries:
    def get_profile(self,id):
      with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                select p.id, p.city
                , p.state
                , p.role
                , users.id
                , users.firstname
                , users.lastname
                , users.username
                from profile p
                INNER JOIN users ON (users.id = p.userid)
                WHERE users.id = %s;
            """, [id]
            )
            
            row = cur.fetchone()
            weather = get_weather.get_weather_data(row[1], row[2])
            d = {
                "id": row[0],
                "city":row[1],
                "state": row[2],
                "role" : row[3],
                "userid":row[4],
                "firstname":row[5],
                "lastname":row[6],
                "username":row[7],
                "weather": weather
            }

            return d

