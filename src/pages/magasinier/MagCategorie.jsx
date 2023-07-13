import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'
import search from "./../../assets/img/search.png"
import BoxCat from '../../components/BoxCatMag'
import { Add, Clear, Person, BorderColorSharp } from '@mui/icons-material'

export default function MagCategorie() {

  const { id, num } = useParams()
  const [pages, setPages] = useState(1)
  const [data, setData] = useState([])
  const [q, setQ] = useState(1)
  const [modal, setModal] = useState(false)
  const navig = useNavigate()

  const [nom, setNom] = useState("")
  const createCategorie = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nomCat": nom
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:4500/categorie/add", requestOptions)
      .then(response => response.text())
      .then(result => {
          console.log(JSON.parse(result))
          setModal(false)
          alert('Categorie Créée')
        window.location.reload()
      })
      .catch(error => console.log('error', error));
  }

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
      {
        modal && <div className="modal">
          <div className="content_modal">
            <Clear onClick={() => setModal(false)} className='close' />
            <div className="tet">
              <Person className='pers' />
              <span>Ajouter Une Categorie</span>
            </div>
            <div className="corps">
              <div className="form">
                <div className="text-field">
                  <BorderColorSharp className='iform' />
                  <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className='input' placeholder='Nom du produit' />
                </div>
              </div>
              <div className="btns">
                <span className="ajouter" onClick={() => setModal(false)}>Annuler</span>
                <span className="ajouter" onClick={()=>createCategorie()}>Ajouter</span>
              </div>
            </div>
          </div>
        </div>
      }
      <Header />
      <main>
        <Nav mag={id} />
        <div className="sam">
          <div>
            <span className='chemin'>Acceuil</span>
            <span className='chemin'>Categorie</span>
          </div>
          <div className="toutcat"><span>Toutes les catégories</span></div>
        </div>
        <div className='searchs'>
          <containt>
            <button className="imprim">Catalogue</button>
            <button className="refresh">Rafraichir</button>
            <span className='creer' onClick={()=>setModal(true)}><Add className='add' />Créer categorie</span>
          </containt>
          <div className="formu">
            <input type="text" id="code" maxLength={7} placeholder="Nom Categorie" />
            <button className="search"><img className="loupe" alt='te' src={search} /></button>
          </div>
        </div>
        <div className="pBox">
          {data.map((d, idx) => (
            <NavLink key={idx} to={"/magasinier/" + id + "/produit/" + d.idCat + "/1"}>
              <BoxCat idCat={d.idCat} nomCat={d.nomCat} />
            </NavLink>
          ))}

        </div>
        <div className="pagination">
          <div className="nume">
            <span onClick={() => {
              if (num > 1) {
                navig("/magasinier/" + id + "/categorie/" + (num - 1))
              }
            }} href="#">&laquo;</span>
            {5 * q + 1 <= pages && <NavLink to={`/magasinier/${id}/categorie/${5 * q + 1}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 1}</NavLink>}
            {5 * q + 2 <= pages && <NavLink to={`/magasinier/${id}/categorie/${5 * q + 2}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 2}</NavLink>}
            {5 * q + 3 <= pages && <NavLink to={`/magasinier/${id}/categorie/${5 * q + 3}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 3}</NavLink>}
            {5 * q + 4 <= pages && <NavLink to={`/magasinier/${id}/categorie/${5 * q + 4}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 4}</NavLink>}
            {5 * q + 5 <= pages && <NavLink to={`/magasinier/${id}/categorie/${5 * q + 5}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 5}</NavLink>}
            <span onClick={() => {
              if (num < pages) {
                let a = num - 1 + 2
                navig("/magasinier/" + id + "/categorie/" + a)
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
