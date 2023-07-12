import React from 'react'
import {useParams} from 'react-router-dom'
import "./../../styles/produit.css"
import "./../../styles/index.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'

export default function MagAccueil() {
  const {id} = useParams()
  return (
    <div className='body page maga'>
      <Header/>
      <main>
        <Nav mag={id} />
        <div className="content">
          <span>
            Dashboard Magasinier
          </span>
        </div>
      </main>
    </div>
  )
}
