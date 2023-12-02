import { FormEvent, ReactElement, useState } from "react";
import './navbar.css';
import { Link, useNavigate} from "react-router-dom";

export const Navbar= () : ReactElement =>{
  const navigate = useNavigate()

  const user = localStorage.getItem('user')
  
  const [data, setData] = useState({
    value:''
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = event.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    console.log('/search/' + data.value)
    navigate('/search/' + data.value)
  }

  return (
      <header className="shadow">
        <div className="home-button-container">
          <Link to={'/home'}><img src='../../public/images/logo.png' alt=""  width="120px" height="100px"/></Link>
        </div>
        <form onSubmit={handleSearch}>
          <div className="search-container">
            <input type="text" placeholder="Search Friendly"name="value" onChange={handleInputChange} required />
            <img src='../../public/images/search.png' alt=""  width="20px" height="20px"/>
          </div>
        </form>
        <div className="settings-button-container">
        <Link to={'/profile/' + user}><img src='../../public/images/account_circle.png' width="60px" height="60px" alt=""/></Link>
        </div>
      </header>
  )
}