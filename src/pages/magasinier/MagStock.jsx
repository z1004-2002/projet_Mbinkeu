import React, { useEffect } from 'react'
import "./../../styles/facture.css"
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavMag'
import { useParams } from 'react-router-dom'

export default function MagStock() {
  const { id } = useParams()
  useEffect(() => {
    console.log(id);
  }, [])
  return (
    <div className='body page'>
      <Header name={'Abel'} />
      <main>
        <Nav mag="116" />
      </main>
    </div>
  )
}
