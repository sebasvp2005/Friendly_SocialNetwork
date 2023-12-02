import { ReactElement, useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/navbar";
import { useAutosizeTextArea } from "../../components/AutosizeTextBox";
import './profile.css'
import {  useParams } from "react-router-dom";
import { Friend_Card } from "../../posts/components/friend_Card";
import { Post_Card } from "../../components/Post_Card";



export const Profile = (): ReactElement =>{

  const {profile_user} = useParams()

  console.log(profile_user + " hola")

  const user = localStorage.getItem('user')

  //GETTING INFO FOR CURRENT USER
  const [data, setData] = useState({
    valid: false,
    data: {
      username:'',
      email: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      country: '',
      phone_number: '',
      password: '',
    }
  })
  
  useEffect(()=>{
    fetch('http://127.0.0.1:8000/user_info/' + profile_user)
    .then(res=>res.json())
    .then(data=>{
      setData(data)
      console.log(data)
    })
  }, [profile_user])
  
  //END OF GETTING INFO FOR CURRENT USER

  //TEXT BOX MODIFICATION
  const [value, setValue] = useState("")
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [postInformation, setPostInformation] = useState({
    content: '',
  })

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault()
    const {name, value} = evt.target
    setPostInformation({
      ...postInformation,
      [name]: value,
    })
    setValue(value);
  }
  //END TEXT BOX MODIFICATION

  //GETTING CURRENT USER FOLLOWS

  const[friends,  setFriends] = useState([])

  useEffect(()=> {
    fetch('http://127.0.0.1:8000/friends/' + profile_user)
    .then(res=>res.json())
    .then(data=>{
      setFriends(data)
      console.log(friends)
    })
  }, [profile_user])

  //END OF GETTING CURRENT FOLLOWS

  //GETTING ALL POST OF CURRENT USER

  const [posts, setPosts] = useState([])

  useEffect(()=> {
    fetch('http://127.0.0.1:8000/post/' + profile_user)
    .then(res=>res.json())
    .then(data=>{
      setPosts(data)
      console.log(data)
    })
  }, [profile_user])
  //

  //CHECK CONNECTIVITY BETWEEN TWO PROFILES

  const [element, setElement] = useState(<></>)
  useEffect(()=>{
    setElement(<></>)
  },[profile_user])

  const [route, setRoute] = useState([])

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/get_connection_between/'+  user+ '/' + profile_user)
    .then(res=>res.json())
    .then(data=>{
      setRoute(data)
    })
  }, [profile_user])

  const handleConectivity = () =>{

    console.log(route)
    console.log(friends)

    const component = (
      <>
      <div className="container-base route-container">
        <h1>Connectivity</h1>
        <div className="vertical">
          {
            route.map((friend) => <Friend_Card friendTag={friend}/>)
          }
        </div>
      </div>
      </>
    )

    
    setElement(component)
    
    
  }
  
  // END OF ONNECTIVITY BETWEEN TWO PROFILES

  //BEGING OF POST SECTION

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
    window.location.reload()
  }

  const RenderPost = (): ReactElement =>{

    if(profile_user!=user){
      return <> </>
    }


    return(
      <>
      <div className="container-base vertical">
              <div className="horizontal add-post">
                <img src="../../../public/images/account_circle.png" alt="" className="photo-profile" />
                <textarea 
                name="content"
                onChange={handleChange} 
                ref = {textAreaRef}
                rows={1}
                placeholder={" Whats on your mind " +  user + "?"} />
              </div>
              <div className="line"></div>
              <button className="post-button" onClick={handleCreatePost}>Post</button>

            </div>  
        
      </>
    )
  }

  //END OF POST SECTION

  //GET FOLLOW
  const [isfollowing, setIsfollowing] = useState(false)

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/is_following/'+user +'/' + profile_user)
    .then(res=>res.json())
    .then(data=>{
      setIsfollowing(data)
    })
    console.log(isfollowing)
  })
  //END GET FOLLOW

  //SET FOLLOW
  const hangleSetFollow = () =>{
    if(isfollowing)return
    fetch('http://127.0.0.1:8000/setFollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        to_follow: profile_user
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

    setIsfollowing(true)
  }
  //END SET FOLLOW


  return(
    <>
      <Navbar/>
      <div className="profile-body">
        <div className="vertical">
          <div className="background-profile"></div>
          <div className="horizontal container-tag">
            <img src="../../../public/images/account_circle.png" 
            alt=""
            className="image-profile"
             />
            <p className="name-tag">{profile_user}</p>
          </div>

        </div>
        <div className="horizontal options shadow">
          <button className="check-button" onClick={handleConectivity}>Check Connectivity</button>
          <button className="follow-button" onClick={hangleSetFollow}>{isfollowing? "Following" : "Follow"}</button>
        </div>


        <div className="horizontal full-container">

          <div className="vertical left-container">

            <div className=" container-base Info-container vertical">
              <h1>Info</h1>

              <h2>Name: {data.data.first_name + ' ' + data.data.last_name}</h2>

              <h2>Email: {data.data.email}</h2>

              <h2>Birth-Date: {data.data.date_of_birth}</h2>


            </div>

            {element}

            <div className="vertical container-base profile-following">
              <h1 >Following</h1>
              {
                friends.map((friend) => <Friend_Card friendTag={friend}/>)
              }

            </div>

          </div>

          <div className="vertical post-section profile-post-section">
            {RenderPost()}

            {
              posts.map( (post) =><Post_Card post = {post}/>)
            }

          </div>

        </div>

      </div>
    </>
  )
}