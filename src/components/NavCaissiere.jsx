import React from 'react'
import { NavLink } from 'react-router-dom'
import acceuil from './../assets/img/accueil.png'
import categories from './../assets/img/categories.png'
import products from './../assets/img/products.png'
import about from './../assets/img/about.png'
import "./../styles/components/navCaisse.css"

export default function Nav({caiss}) {
  return (
    <nav>
      <ul>
        <li><NavLink to={"/caissiere/"+caiss+"/facturation"}><img className="navi" alt='' src={acceuil} />Facturation</NavLink></li>
        <li><NavLink to={"/caissiere/"+caiss+"/categorie/1"}><img className="navi" alt='' src={categories} />Catégories</NavLink></li>
        <li><NavLink to={"/caissiere/"+caiss+"/produit/1"}><img className="navi" alt='' src={products} />Produits</NavLink></li>
        <li><NavLink to="#"><img className="navi" src={about} alt='' />A propos</NavLink></li>
      </ul>
    </nav>
  )
}
