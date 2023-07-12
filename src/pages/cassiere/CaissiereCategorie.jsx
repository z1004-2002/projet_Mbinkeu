import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavCaissiere'
import search from "./../../assets/img/search.png"
import BoxCat from '../../components/BoxCat'


export default function CaissiereCategorie() {

  const { id, num } = useParams()
  const [pages, setPages] = useState(1)
  const [q, setQ] = useState(1)
  const [data, setData] = useState([])
  const navig = useNavigate()

  useEffect(() => {
    let a = num - 1
    let r = a % 5
    setQ((a - r) / 5)

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


  }, [num, id])
  return (
    <div className='body page'>
      <Header />
      <main>
        <Nav caiss={id} />
        <div className="sam">
          <div>
            <span className='chemin'>Acceuil</span>
            <span className='chemin'>Categorie</span>
          </div>
          <div className="toutcat"><span>Toutes les catégories</span></div>
        </div>
        <div className='searchs'>
          <div>
            <button className="imprim">Catalogue</button>
            <button className="refresh">Rafraichir</button>
          </div>
          <div className="formu">
            <input type="text" id="code" maxLength={7} placeholder="Nom Categorie" />
            <button className="search"><img alt='test' className="loupe" src={search} /></button>
          </div>
        </div>
        <div className="pBox">

          {data.map((d, idx) => (<NavLink key={idx} to={"/caissiere/" + id + "/produit/" + d.idCat + "/1"}>
            <BoxCat key={idx} idCat={d.idCat} nomCat={d.nomCat} />
          </NavLink>
          ))}

        </div>
        <div className="pagination">
          <div className="nume">
            <span onClick={() => {
              if (num > 1) {
                navig("/caissiere/" + id + "/categorie/" + (num - 1))
              }
            }} href="#">&laquo;</span>
            {5*q+1<=pages && <NavLink to={`/caissiere/${id}/categorie/${5*q+1}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+1}</NavLink>}
            {5*q+2<=pages && <NavLink to={`/caissiere/${id}/categorie/${5*q+2}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+2}</NavLink>}
            {5*q+3<=pages && <NavLink to={`/caissiere/${id}/categorie/${5*q+3}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+3}</NavLink>}
            {5*q+4<=pages && <NavLink to={`/caissiere/${id}/categorie/${5*q+4}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+4}</NavLink>}
            {5*q+5<=pages && <NavLink to={`/caissiere/${id}/categorie/${5*q+5}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+5}</NavLink>}
            
            <span onClick={() => {
              if (num < pages) {
                let a = num - 1 + 2
                navig("/caissiere/" + id + "/categorie/" + a)
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
