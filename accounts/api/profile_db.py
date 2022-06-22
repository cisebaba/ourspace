import psycopg
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

pool = ConnectionPool()


class ProfileQueries:
    def get_profile(self):
#       with psycopg.connect("dbname=accounts user=ourspace") as conn:
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
            """, [user["id"]]
            )
            
            row = cur.fetchone()
            weather = get_weather.get_weather_data(row[1], row[2])
            # print("WEATHER",weather)
            d = {
                "id": row[0],
                "city":row[1],
                "state": row[2],
                "role" : row[3],
                "userid":user["id"],
                "firstname":user["firstname"],
                "lastname":user["lastname"],
                "username":username,
                "weather": weather
            }
            # print(d)

            return d


