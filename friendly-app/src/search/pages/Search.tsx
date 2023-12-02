import { ReactElement, useEffect, useState } from "react";
import { Navbar } from "../../components/navbar";
import { useParams } from "react-router-dom";
import { Friend_Card } from "../../posts/components/friend_Card";
import './Search.css'



export const SearchPage = ():ReactElement => {

  const {user} = useParams()

  const [users, setUsers] = useState([])

  useEffect(()=> {
    fetch('http://127.0.0.1:8000/search/' + user)
    .then(res=>res.json())
    .then(data=>{
      setUsers(data)
      console.log('me estoy renderizando')
    })
  }, [user])


  return(

    <>
      <Navbar/>
      <div className="vertical center users-container scroll-vertically">

        {
          users.map((friend) => { return (
            <div className="container-base">
              <Friend_Card friendTag={friend}/>
            </div>
          )})
        }


      </div>
    </>
  )
  
}