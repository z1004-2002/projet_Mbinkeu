import React, { useEffect, useState } from 'react'
import logout from './../assets/img/logout.png'
import userImage from './../assets/img/user.png'
import "../styles/components/header.css"
import { NavLink, useParams } from 'react-router-dom'

export default function Header() {
  const {id} = useParams()
  const [user,setUser] = useState({
      idGest: 0,
      nomGest: ""
  })
  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:4500/gestionnaire/115", requestOptions)
      .then(response => response.text())
      .then(result => setUser(JSON.parse(result)))
      .catch(error => console.log('error', error));
  },[id])
  return (
    <header>
      <a href="#t" className="profile"><img className="nav" alt='e' src={userImage} />
        {user.nomGest}
      </a>
      <NavLink to="/" className="disc">
        Deconnexion
        <img className="nav" src={logout} alt='r'/>
      </NavLink>
    </header>
  )
}
