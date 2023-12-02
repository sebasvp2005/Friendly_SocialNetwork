from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from methods import *
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],  # You can specify specific HTTP methods (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify specific headers if needed
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/post/{username}")
def post(username):
    return  Get_Posts(username=username)

@app.get("/getfriendsposts/{username}")
def GetFriendsPots(username):
    return get_posts(username=username)


@app.get("/login/{username}/{password}")
def login(username, password):
    info = obtener_info_usuario(username=username)
    if info is None or password!=info['password']:
        return {"valid": False}
    else:
        return {
            "valid": True,
            "data" : info
        }


@app.get('/friends/{username}')
def get_friends(username):
    return Obtener_Seguidos(username=username)

@app.get('/user_info/{username}')
def get_user_info(username):
    info = obtener_info_usuario(username=username)
    if info is None:
        return {"valid": False}
    else:
        return {
            "valid": True,
            "data" : info
        }


@app.get('/get_connection_between/{username}/{targer_username}')
def getConnectionBetween(username, targer_username):
    return bfs_find_paths(username, targer_username)
    
@app.get('/is_following/{username}/{target}')
def check_Connection(username, target):
    return checkFollow(username, target)

@app.get('/search/{user}')
def search_user(user):
    return Search_users(user)

class ItemPost(BaseModel):
    content: str
    name: str

@app.post('/createPost')
async def ProcessData(post: ItemPost):
    content = post.content
    name = post.name

    CreatePost(name, content)
    return {'message': "Data received successfully"}

class ItemFollow(BaseModel):
    user: str
    to_follow: str

@app.post('/setFollow')
async def ProcessFollow(followItem: ItemFollow):
    user = followItem.user
    to_follow = followItem.to_follow
    CreateFollow(user, to_follow)
    return {'message': "Data received successfully"}