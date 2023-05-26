import React from 'react'
import logout from './../assets/img/logout.png'
import user from './../assets/img/user.png'
import "../styles/components/header.css"
import { NavLink } from 'react-router-dom'

export default function Header({name}) {
  return (
    <header>
        <a href="#" class="profile"><img class="nav" src={user}/>{name}</a>
        <NavLink to="/" class="disc">Deconnexion<img class="nav" src={logout}/></NavLink> 
   </header>
  )
}
