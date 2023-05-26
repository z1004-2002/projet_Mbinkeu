import React from 'react'
import "./../../styles/produit.css"
import "./../../styles/index.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'

export default function MagAccueil() {
  return (
    <div className='body page maga'>
      <Header name={'Abel'} />
      <main>
        <Nav mag="116" />
        <div className="content">
          <span>Dashboard Magasinier</span>
        </div>
      </main>
    </div>
  )
}
