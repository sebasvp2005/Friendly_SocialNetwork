from faker import Faker

from database_manager import SocialMediaDatabaseManager

db_manager = SocialMediaDatabaseManager()
fake = Faker()


def generar(cantidad_usuarios: int = 1500) -> bool:
    try:
        for _ in range(cantidad_usuarios):
            username = fake.unique.user_name()
            email = f"{username}@gmail.com"
            password = fake.password()
            first_name = fake.first_name()
            last_name = fake.last_name()
            date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=80)
            country = fake.country()
            phone_number = fake.phone_number()

            db_manager.add_user(
                username,
                email,
                password,
                first_name,
                last_name,
                date_of_birth,
                country,
                phone_number,
            )
        return True

    except:  # noqa: E722
        return False
