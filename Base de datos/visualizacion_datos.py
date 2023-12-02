from pyvis.network import Network
import database_manager

G = Network(directed=True, height="100%")
G.barnes_hut(spring_length=80)

db = database_manager.SocialMediaDatabaseManager()
usernames = db.get_all_users()[1]

for username in usernames:
    G.add_node(
        username, size=50, title=username, labelHighlightBold=True, shape="circle"
    )

for username in usernames:
    following = db.get_following(username)[1]
    for usuario_seguido in following:
        G.add_edge(username, usuario_seguido)

G.write_html("Base de datos/Visualizacion/grafo.html")
