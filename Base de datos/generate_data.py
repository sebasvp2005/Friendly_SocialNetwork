import database_creation
import user_generation
import followers_generation
import posts_generation


assert database_creation.generar()
assert user_generation.generar(3500)
assert followers_generation.generar(20)
assert posts_generation.generar()
