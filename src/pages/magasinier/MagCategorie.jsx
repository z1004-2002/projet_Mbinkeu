import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'
import search from "./../../assets/img/search.png"
import BoxCat from '../../components/BoxCatMag'
import { Add } from '@mui/icons-material'

export default function MagCategorie() {


  const { id, num } = useParams()
  const [pages, setPages] = useState(1)
  const [data, setData] = useState([])
  const navig = useNavigate()

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4500/categorie/nombre", requestOptions)
      .then(response => response.text())
      .then(result => {
        setPages(parseInt(result / 8) + 1)
      })
      .catch(error => console.log('error', error));
    console.log(id);

    fetch("http://localhost:4500/categorie", requestOptions)
      .then(response => response.text())
      .then(result => {
        let a = JSON.parse(result)
        let e = []
        for (let i = (num - 1) * 8; i < num * 8; i++) {
          if (i < a.length) {
            e.push(a[i])
          }
        }
        setData(e)
      })
      .catch(error => console.log('error', error));


  }, [num])


  return (
    <div className='body page'>
      <Header name={'Abel'} />
      <main>
        <Nav mag="116" />
        <div class="sam">
          <div>
            <span className='chemin'>Acceuil</span>
            <span className='chemin'>Categorie</span>
          </div>
          <div class="toutcat"><span>Toutes les catégories</span></div>
        </div>
        <div className='searchs'>
          <containt>
            <button class="imprim">Catalogue</button>
            <button class="refresh">Rafraichir</button>
            <span className='creer'><Add className='add'/>Créer categorie</span>
          </containt>
          <div className="formu">
            <input type="text" id="code" maxLength={7} placeholder="Nom Categorie" />
            <button class="search"><img class="loupe" src={search} /></button>
          </div>
        </div>
        <div class="pBox">

          {data.map((d, idx) => (
            <BoxCat key={idx} idCat={d.idCat} nomCat={d.nomCat} />
          ))}

        </div>
        <div class="pagination">
          <div className="nume">
            <span onClick={() => {
              if (num > 1) {
                navig("/magasinier/"+id+"/categorie/"+(num-1))
              }
            }} href="#">&laquo;</span>
            <span class="active" href="#">{num}</span>
            <span onClick={() => {
              if (num < pages) {
                let a = num - 1 + 2
                navig("/magasinier/"+id+"/categorie/"+a)
              }
            }} href="#">&raquo;</span>
          </div>
          <div className="nbpage">
            {num}/{pages}
          </div>
        </div>
      </main>
    </div>
  )
}
