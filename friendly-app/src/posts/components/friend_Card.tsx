import { ReactElement } from "react"
import { Link } from "react-router-dom";
import './friend_Card.css'

export interface FriendTag{
  name: string,
}

export type FriendTagProps = {
  friendTag: FriendTag
}


export const Friend_Card = ({friendTag}: FriendTagProps): ReactElement =>{
  return(
    <> 
    <div className="friend-tag">
      <Link to = {"/profile/" + friendTag.name} className="horizontal center">
      <img src="../../../public/images/account_circle.png" alt="" />
      <p>{friendTag.name}</p>
      </Link>
    </div>
    </>
  )
}