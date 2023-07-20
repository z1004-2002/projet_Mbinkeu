import React, { useEffect, useState } from 'react'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'
import Box from '../../components/BoxMag'
import shop from '../../assets/img/box.jpeg'
import { Add, Person, BorderColorSharp, Storage, Clear, CalendarMonth } from '@mui/icons-material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import search from "./../../assets/img/search.png"
import ShowModal from '../../components/ShowModal'
import box from '../../assets/img/box.jpeg'


export default function MagCatPro() {

  const { id, idCat, num } = useParams()
  const [pages, setPages] = useState(1)
  const [nom, setNom] = useState("")
  const [modal, setModal] = useState(false)
  const [q, setQ] = useState(1)
  const [data, setData] = useState([])
  const [modal0, setModal0] = useState(false)

  const [produit, setProduit] = useState({
    codePro: 0,
    nomPro: "string",
    prix: 0,
    qte: 0,
    description: "string",
    codeArrivage: "string",
    actif: 0,
    categorie: {
      idCat: 0,
      nomCat: "string"
    },
    dateInsertion: "2023-07-20T11:27:43.992Z",
    prixAchat: 0,
    pourcentage: 0,
    promo: 0,
    size1: 0,
    size2: 0,
    typeSize: 0
  })
  let [photo, setPhoto] = useState([box])
  const navig = useNavigate()

  const getPhoto = (code) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4500/photo/" + code, requestOptions)
      .then(response => response.text())
      .then(result => {
        let images = []
        let a = JSON.parse(result)
        console.log(a);
        for (let i = 0; i < a.length; i++) {
          images.push('http://boutiquebambino.shop/eshop/productImages/' + code + '/' + a[i].lienPhoto)
        }
        setPhoto(images)
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

    fetch("http://localhost:4500/produit/nombre/" + idCat, requestOptions)
      .then(response => response.text())
      .then(result => setPages(parseInt(result / 8) + 1))
      .catch(error => console.log('error', error));

    fetch("http://localhost:4500/categorie/" + idCat, requestOptions)
      .then(response => response.text())
      .then(result => setNom(JSON.parse(result).nomCat))
      .catch(error => console.log('error', error));

    fetch("http://localhost:4500/produit/categorie/" + idCat, requestOptions)
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



  }, [num, idCat])


  return (
    <div className='body page'>
      {modal && <div className="modal">
        <div className="contenu_modal">
          <Clear onClick={() => setModal(false)} className='close' />
          <div className="tet">
            <Person className='pers' />
            <span>Ajouter Produit</span>
          </div>
          <div className="corps">
            <div className="form">
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder='Nom du produit' />
              </div>
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder="Code Arrivage" />
              </div>
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder="Prix Achat" />
              </div>
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder="Prix Vente" />
              </div>
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder='Type size' />
              </div>
              <div className="text-field">
                <BorderColorSharp className='iform' />
                <input type="text" className='input' placeholder='Size 1' />
              </div>
            </div>
            <div className="description">
              <span>Description : </span>
              <textarea rows="3" cols="50" name="maDescription" id="description"></textarea>
            </div>
            <div className="images">
              <span onClick={() => {
                document.getElementById("img").click()
              }}>Parcourir</span>
              <input type="file" name="img" id="img" accept='image' />
              <div className="image">
                <img src={shop} alt="test" />
                <img src={shop} alt="test" />
                <img src={shop} alt="test" />
                <img src={shop} alt="test" />
                <img src={shop} alt="test" />
                <img src={shop} alt="test" />
              </div>
            </div>
            <div className="btns">
              <span className="ajouter" onClick={() => setModal(false)}>Annuler</span>
              <span className="ajouter" >Ajouter</span>
            </div>
          </div>
        </div>
      </div>}
      {modal0 && <ShowModal produit={produit} photo={photo} close={() => setModal0(false)} />}

      <Header />
      <main>
        <Nav mag={id} />
        <div className="sam">
          <div>
            <span className='chemin'>Acceuil</span>
            <span className='chemin'>
              <NavLink className="ae" to={"/magasinier/" + id + "/categorie/1"}>
                Categorie
              </NavLink>
            </span>
            <span className='chemin'>Produits</span>
          </div>
          <div className="toutcat"><span>Catégories {nom}</span></div>
        </div>
        <div className='searchs'>
          <containt>
            <button className="imprim">Imprimer</button>
            <button className="refresh">Rafraichir</button>
            <span className='creer' onClick={() => {
              setModal(true)
            }}><Add className='add' />Créer Produit</span>
          </containt>
          <div className="formu">
            <input type="text" id="code" maxLength={7} placeholder="Qte" />
            <input type="text" id="code" maxLength={7} placeholder="Code Fournisseur" />
            <input type="text" id="code" maxLength={7} placeholder="Code du produit" />
            <button className="search"><img className="loupe" alt="te" src={search} /></button>
          </div>
        </div>
        <div className="pBox">

          {data.map((d, idx) => (<Box key={idx} number={d.codePro} quantity={d.qte}
            handle={() => {
              setProduit(d)
              setModal0(true)
              getPhoto(d.codePro)
            }} />))}

        </div>
        <div className="pagination">
          <div className="nume">
            <span onClick={() => {
              if (num > 1) {
                navig("/magasinier/" + id + "/produit/" + idCat + "/" + (num - 1))
              }
            }} href="#">&laquo;</span>
            {5 * q + 1 <= pages && <NavLink to={`/magasinier/${id}/produit/${idCat}/${5 * q + 1}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 1}</NavLink>}
            {5 * q + 2 <= pages && <NavLink to={`/magasinier/${id}/produit/${idCat}/${5 * q + 2}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 2}</NavLink>}
            {5 * q + 3 <= pages && <NavLink to={`/magasinier/${id}/produit/${idCat}/${5 * q + 3}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 3}</NavLink>}
            {5 * q + 4 <= pages && <NavLink to={`/magasinier/${id}/produit/${idCat}/${5 * q + 4}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 4}</NavLink>}
            {5 * q + 5 <= pages && <NavLink to={`/magasinier/${id}/produit/${idCat}/${5 * q + 5}`} className={({ isActive }) => isActive ? "active" : ""}>{5 * q + 5}</NavLink>}
            <span onClick={() => {
              if (num < pages) {
                let a = num - 1 + 2
                navig("/magasinier/" + id + "/produit/" + idCat + "/" + a)
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
