from faker import Faker
import random

from database_manager import SocialMediaDatabaseManager

db_manager = SocialMediaDatabaseManager()
fake = Faker()


def generar(max_posts: int = 10) -> bool:
    try:
        for user in db_manager.get_all_users()[1]:
            for _ in range(random.randint(0, max_posts)):
                db_manager.add_post(
                    username=user,
                    content=fake.paragraph(),
                    date=fake.date_time_between(start_date="-365d", end_date="now"),
                )
        return True

    except:  # noqa: E722
        return False
    

