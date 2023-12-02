import {ReactElement, useEffect, useRef, useState} from "react";
import { Navbar } from "../../components/navbar";
import { Post_Card } from "../../components/Post_Card";
import './HomePage.css';
import { Friend_Card} from "../components/friend_Card";
import { useAutosizeTextArea } from "../../components/AutosizeTextBox";
import { useNavigate } from "react-router-dom";




export const HomePage = (): ReactElement => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
  console.log(user)

  if(user==null){
    navigate('/login')
  }
  
  //GET USER FRIENDS POSTS
  const [post, setPost] = useState([]) 
  useEffect(()=> {
    fetch('http://127.0.0.1:8000/getfriendsposts/' + user)
    .then(res=>res.json())
    .then(data=>{
      setPost(data)
      console.log('me estoy renderizando')
    })
  }, [])
  console.log(post)

  //GET USER FRIENDS
  const [friends, setFriends] = useState([])

  useEffect(()=> {
    fetch('http://127.0.0.1:8000/friends/' + user)
    .then(res=>res.json())
    .then(data=>{
      setFriends(data)
      console.log(friends)
    })
  }, [])


  // TEXT AREA MODIFICATION

  const [postInformation, setPostInformation] = useState({
    content: '',
  })

  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target
    setValue(value);
    setPostInformation({
      ...postInformation,
      [name]: value
    })
  }
  // END OF TEXT AREA MODIFICATION
  //
  const handleCreatePost = () =>{
    console.log(postInformation.content)
    if(postInformation.content=='') return

    fetch('http://127.0.0.1:8000/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: postInformation.content,
        name: user
      })

    })
    .then(res=>res.json())
    .then(data=>{
      console.log('Succes', data)
    })
    .catch(error=>{
      console.error('Error: ', error)
    })
    console.log('done')
  }
  //

  return (
    
    <>
      <Navbar/>
      <div className="home-body">
        <div className="horizontal ">
          <div className="options-container vertical">
            <div>
              <img src='../../../public/images/account_circle.png' alt=""/>
              <p className= "bold">{user}</p>
            </div>
            <div>
              <img src="../../../public/images/people.png" alt=""/>
              <p>Friends</p>
            </div>
            <div>
              <img src="../../../public/images/wifi-search.png" alt=""/>
              <p>Discovery</p>
            </div>
            <div>
              <img src="../../../public/images/bookmark.png" alt=""/>
              <p>Saved</p>
            </div>

          </div>

          <div className="vertical post-section scroll-vertically">

            <div className="container-base vertical">
              <div className="horizontal add-post">
                <img src="../../../public/images/account_circle.png" alt="" className="photo-profile" />
                <textarea 
                name="content"
                onChange={handleChange} 
                ref = {textAreaRef}
                rows={1}
                placeholder={" Whats on your mind "+ user+ "?"} />
              </div>
              <div className="line"></div>
              <button className="post-button" onClick={handleCreatePost}>Post</button>

            </div>  

            {
              post.map( (post) =><Post_Card post = {post}/>)
            }

          </div>

          <div className="container-base vertical friends-section ">

            <p className="center-margin bold font-big">Chats</p>
            <div className="vertical scroll-vertically">

              {
                friends.map((friend) => <Friend_Card friendTag={friend}/>)
              }

            </div>
          </div>
        </div>
      </div>
    </>
  )
}