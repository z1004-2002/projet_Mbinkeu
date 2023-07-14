import React, { useEffect, useState } from 'react'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavCaissiere'
import Box from '../../components/Box'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import box from './../../assets/img/box.jpeg'
import search from "./../../assets/img/search.png"
import { Clear, Person } from '@mui/icons-material'


export default function CassiereCatPro() {
    const { id, idCat, num } = useParams()
    const [pages, setPages] = useState(1)
    const [nom, setNom] = useState("")
    const [q,setQ] = useState(1)
    const [modal, setModal] = useState(false)
    const [data, setData] = useState([])
    const [produit, setProduit] = useState({
        codePro: 977665,
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
        dateInsertion: "2023-07-14T13:43:26.313Z",
        prixAchat: 0,
        pourcentage: 0,
        promo: 0,
        size1: 0,
        size2: 0,
        typeSize: 0
    })
    let [photo, setPhoto] = useState([box])
    const navig = useNavigate()


    const codeToString = (code) => {
        let chaine = code.toString()
        let a = ''
        if (chaine.length == 6) {
            a = chaine[0] + "" + chaine[1] + "" + chaine[2] + "-" + chaine[3] + "" + chaine[4] + "" + chaine[5]
        }
        return a
    }

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
        let a = num-1
        let r = a%5
        setQ((a-r)/5)

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:4500/produit/nombre/" + idCat, requestOptions)
            .then(response => response.text())
            .then(result => {
                setPages(parseInt(result / 8) + 1)
            })
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



    }, [num,idCat])
    return (
        <div className='body page'>
            {modal && <div className="modal">
                <div className="contenu_modal">
                    <Clear onClick={() => setModal(false)} className='close' />
                    <div className="tet">
                        <Person className='pers' />
                        <span>Info Produit</span>
                    </div>
                    <div className="corps">
                        <div className="information">

                            <div className="text-fie">
                                <span>code pro : </span>
                                <span> {codeToString(produit.codePro)} </span>
                            </div>
                            <div className="text-fie">
                                <span>Nom produit : </span>
                                <span>{' ' + produit.nomPro}</span>
                            </div>
                            <div className="text-fie">
                                <span>prix : </span>
                                <span>{' ' + produit.prix}</span>
                            </div>
                            <div className="text-fie">
                                <span>Quantité : </span>
                                <span>{' ' + produit.qte}</span>
                            </div>
                            <div className="text-fie">
                                <span>Code d'arrivage : </span>
                                <span>{' ' + produit.codeArrivage}</span>
                            </div>
                            <div className="text-fie">
                                <span>Pourcentage : </span>
                                <span>{' ' + produit.pourcentage + ' % '}</span>
                            </div>
                            <div className="text-fie">
                                <span>promo : </span>
                                <span>{produit.promo}</span>
                            </div>
                            <div className="text-fie">
                                <span>Size : </span>
                                <span>{produit.size1 + '-' + produit.size2 + (produit.typeSize === 0 ? " Mois " : (produit.typeSize === 1 ? " Ans " : ""))}</span>
                            </div>
                        </div>
                        <div className="descript">
                            <p>Description :</p>
                            <p>{produit.description}</p>
                        </div>

                        <div className="images">
                            <div className="image">
                                {photo.map((im,idx)=> <img alt='te' key={idx} src={im}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            <Header />
            <main>
                <Nav caiss={id} />
                <div className="sam">
                    <div>
                        <span className='chemin'>Acceuil</span>
                        <span className='chemin'>
                            <NavLink className="ae" to={"/caissiere/" + id + "/categorie/1"}>
                                Categorie
                            </NavLink>
                        </span>
                        <span className='chemin'>Produits</span>
                    </div>
                    <div className="toutcat"><span>Catégories {nom}</span></div>
                </div>
                <div className='searchs'>
                    <div>
                        <button className="imprim">Imprimer</button>
                        <button className="refresh">Rafraichir</button>
                    </div>
                    <div className="formu">
                        <input type="text" id="code" maxLength={7} placeholder="Qte" />
                        <input type="text" id="code" maxLength={7} placeholder="Code Fournisseur" />
                        <input type="text" id="code" maxLength={7} placeholder="Code du produit" />
                        <button className="search"><img className="loupe" src={search} alt='test'/></button>
                    </div>
                </div>
                <div className="pBox">

                    {data.map((d, idx) => (<Box key={idx}
                        handle={() => {
                            setProduit(d)
                            setModal(true)
                            getPhoto(d.codePro)
                        }}
                    number={d.codePro} quantity={d.qte} />))}

                </div>
                <div className="pagination">
                    <div className="nume">
                        <span onClick={() => {
                            if (num > 1) {
                                navig("/caissiere/" + id + "/produit/" + idCat + "/" + (num - 1))
                            }
                        }} href="#">&laquo;</span>
                        {5*q+1<=pages && <NavLink to={`/caissiere/${id}/produit/${idCat}/${5*q+1}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+1}</NavLink>}
                        {5*q+2<=pages && <NavLink to={`/caissiere/${id}/produit/${idCat}/${5*q+2}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+2}</NavLink>}
                        {5*q+3<=pages && <NavLink to={`/caissiere/${id}/produit/${idCat}/${5*q+3}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+3}</NavLink>}
                        {5*q+4<=pages && <NavLink to={`/caissiere/${id}/produit/${idCat}/${5*q+4}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+4}</NavLink>}
                        {5*q+5<=pages && <NavLink to={`/caissiere/${id}/produit/${idCat}/${5*q+5}`} className={({ isActive }) => isActive ? "active" : ""}>{5*q+5}</NavLink>}
                        <span onClick={() => {
                            if (num < pages) {
                                let a = num - 1 + 2
                                navig("/caissiere/" + id + "/produit/" + idCat + "/" + a)
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
