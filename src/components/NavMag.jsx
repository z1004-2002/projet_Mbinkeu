import React from 'react'
import { NavLink } from 'react-router-dom'
import acceuil from './../assets/img/accueil.png'
import categories from './../assets/img/categories.png'
import products from './../assets/img/products.png'
import stock from './../assets/img/stock.png'
import about from './../assets/img/about.png'
import "./../styles/components/navCaisse.css"

export default function NavMag({mag}) {
    return (
        <nav>
            <ul>
                <li><NavLink to={"/magasinier/"+mag}><img class="navi" src={acceuil} />Accueil</NavLink></li>
                <li><NavLink to={"/magasinier/"+mag+"/categorie/1"}><img class="navi" src={categories} />Catégories</NavLink></li>
                <li><NavLink to={"/magasinier/"+mag+"/produit/1"}><img class="navi" src={products} />Produits</NavLink></li>
                <li><NavLink to={"/magasinier/" +mag+ "/stock"}><img class="navi" src={stock} />Stock</NavLink></li>
                <li><NavLink to="#"><img class="navi" src={about} />A propos</NavLink></li>
            </ul>
        </nav>
    )
}
