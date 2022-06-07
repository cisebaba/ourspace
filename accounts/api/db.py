class AccountsQueries:
    FAKE_USERS = []  # DELETE THIS AFTER REPLACING WITH SQL

    def get_user(self, username: str):
        # TODO: Replace the body of this method with real SQL
        # It MUST return a dictionary that contains the user
        # data NOT a row. Like:
        # { "id": 3, "username": "Caris", "email": "caris@example.com" }
        for user in self.FAKE_USERS:
            if user["username"] == username:
                return user

    def create_user(self, username: str, hashed_password: str, email: str = None):
        # TODO: Replace the body of this method with real SQL
        # It MUST return a dictionary that contains the user
        # data NOT a row. Like:
        # { "id": 3, "username": "Caris", "email": "caris@example.com" }
        user = {
            "id": len(self.FAKE_USERS),
            "username": username,
            "email": email,
            "hashed_password": hashed_password,
        }
        self.FAKE_USERS.append(user)
        return user
