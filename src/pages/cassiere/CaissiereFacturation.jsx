import React,{useEffect} from 'react'
import "./../../styles/facture.css"
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavCaissiere'
import {useParams } from 'react-router-dom'



export default function CaissiereFacturation() {
    const {id} = useParams()
    useEffect(()=>{
        console.log(id);
    },[])
  return (
    <div className='body page'>
            <Header name={'Sambo'} />
            <main>
                <Nav caiss="118"/>
                
            </main>
        </div>
  )
}
