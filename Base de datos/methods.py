from queue import Queue
from database_manager import SocialMediaDatabaseManager
from random import randint
from datetime import date


def Generate_graph(user, path):
   db = SocialMediaDatabaseManager()
   new_path = [node['name'] for node in path]
   db.generate_user_graph(user, new_path)
   return

def bfs_find_paths(start_user, end_user):
    db_manager = SocialMediaDatabaseManager()
    global parents
    parents = {start_user: None}

    queue = Queue()
    queue.put(start_user)

    while not queue.empty():
        current_user = queue.get()

        if current_user == end_user:
            path = [{'name' : end_user}]
            while parents[end_user] is not None:
                end_user = parents[end_user]
                path.insert(0, {'name': end_user})

            Generate_graph(start_user, path)
            return path


        success, neighbors = db_manager.get_following(current_user)
        if success:
            for neighbor in neighbors:
          
                if neighbor not in parents:
                    parents[neighbor] = current_user
                    queue.put(neighbor)

    return []

def obtener_info_usuario(username):
  db = SocialMediaDatabaseManager()
  success, user_info = db.get_user_info(username)

  if success:
    return {
      "username": user_info["username"],
      "email": user_info["email"],
      "first_name": user_info["first_name"],
      "last_name": user_info["last_name"],
      "date_of_birth": user_info["date_of_birth"],
      "country": user_info["country"],
      "phone_number": user_info["phone_number"],
      "password" : user_info["password"]
    }
  else:
    return None

def Get_Posts(username):
  db = SocialMediaDatabaseManager()
  success,posts = db.get_user_posts(username=username)
  print(posts)
  for post in posts:
    post["date"] = post["date"].split()[0]
    print(post["date"])
  return posts
  
def Obtener_Seguidos(username):
  db = SocialMediaDatabaseManager()
  success, friends = db.get_following(username=username)
  
  if success:
     friends_format= []
     for friend in friends:
        friends_format.append({'name': friend})
     return friends_format
  else: return None


def Search_users(username):
   db = SocialMediaDatabaseManager()
   success, users = db.get_user_by_substring(username)
   users_format=[{'name': user} for user in users]
   return users_format

def get_posts(username):
  db = SocialMediaDatabaseManager()
  all_posts = []

  def dfs(name, visited:dict, level):
     user_posts = Get_Posts(name)
     for post in user_posts: all_posts.append(post)
     visited[name]=1
     if level==3: return
     for user in db.get_following(username=username)[1]:
        if visited.get(user, 0) == 1: continue
        dfs(user, visited, level+1)

  dfs(username, {}, 0)

  for i in range(len(all_posts)):
     temp = all_posts[i]
     newindex = randint(0, len(all_posts)-1)
     all_posts[i] = all_posts[newindex]
     all_posts[newindex] = temp
  return all_posts

def CreatePost(name, content):
  db = SocialMediaDatabaseManager()
  db.add_post(username=name, content=content)
  return


def CreateFollow(user, to_follow):
   db = SocialMediaDatabaseManager()
   db.add_follow_relationship(username=user, username_followed=to_follow)
   return

def checkFollow(user, to_follow):
   db = SocialMediaDatabaseManager()
   success, users = db.get_following(user)
   if to_follow in users: return True
   else: return False

#solo para probar si funciona 
def main():
  db = SocialMediaDatabaseManager()
  #print(db.get_all_users())
  print(obtener_info_usuario(db.get_all_users()[1][0]))
  #Generate_graph("aaron42", 1)

main()
