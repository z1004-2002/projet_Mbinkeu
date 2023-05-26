import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavCaissiere'
import Box from '../../components/Box'
import search from "./../../assets/img/search.png"


export default function Produit() {
    const { id, num } = useParams()
    const [pages, setPages] = useState(1)
    const [data, setData] = useState([])
    const navig = useNavigate()

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:4500/produit/nombre", requestOptions)
            .then(response => response.text())
            .then(result => setPages(parseInt(result / 8) + 1))
            .catch(error => console.log('error', error));

        fetch("http://localhost:4500/produit", requestOptions)
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
            <Header name={'Sambo'} />
            <main>
                <Nav caiss="118" />
                <div class="sam">
                    <div>
                        <span className='chemin'>Acceuil</span>
                        <span className='chemin'>Produits</span>
                    </div>
                    <div class="toutcat"><span>Toutes les catégories</span></div>
                </div>
                <div className='searchs'>
                    <containt>
                        <button class="imprim">Imprimer</button>
                        <button class="refresh">Rafraichir</button>
                    </containt>
                    <div className="formu">
                        <input type="text" id="code" maxLength={7} placeholder="Qte" />
                        <input type="text" id="code" maxLength={7} placeholder="Code Fournisseur" />
                        <input type="text" id="code" maxLength={7} placeholder="Code du produit" />
                        <button class="search"><img class="loupe" src={search} /></button>
                    </div>
                </div>
                <div class="pBox">

                    {data.map((d, idx) => (<Box key={idx} number={d.codePro} quantity={d.qte} />))}

                </div>
                <div class="pagination">
                    <div className="nume">
                        <span onClick={() => {
                            if (num > 1) {
                                navig("/caissiere/" + id + "/produit/" + (num - 1))
                            }
                        }} href="#">&laquo;</span>
                        <span class="active" href="#">{num}</span>
                        <span onClick={() => {
                            if (num < pages) {
                                let a = num - 1 + 2
                                navig("/caissiere/" + id + "/produit/" + a)
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
