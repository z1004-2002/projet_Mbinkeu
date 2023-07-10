import React, { useEffect, useState } from 'react'
import "./../../styles/facture.css"
import "./../../styles/produit.css"
import Header from '../../components/Header'
import Nav from '../../components/NavCaissiere'
import { useParams } from 'react-router-dom'
import PhoneIcon from '@mui/icons-material/Phone';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



export default function CaissiereFacturation() {
  const { id } = useParams()
  const [facture, setFacture] = useState({
    remise: 0,
    montant: 0,
    tel: "string",
    typeFac: "string",
    idCaissiere: 0,
    capital: 0,
    tva: 0,
    produits: []
  })
  const [produit, setProduit] = useState([])
  const [code, setCode] = useState("")
  const [photos, setPhotos] = useState([])
  const [qte, setQte] = useState("1")
  const [stock,setStock] = useState('ND')

  const ChangeCode = () => {
    if (code.length === 7) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:4500/produit/" + code[0] + code[1] + code[2] + code[4] + code[5] + code[6], requestOptions)
        .then(response => response.text())
        .then(result => {
          let a = JSON.parse(result)
          fetch("http://localhost:4500/photo/" + a.codePro, requestOptions)
            .then(response => response.text())
            .then(result => {
              let b = JSON.parse(result)
              console.log(b);
              let c = []
              for (let i = 0; i < b.length; i++) {
                c.push('http://boutiquebambino.shop/eshop/productImages/'+a.codePro+'/'+b[i].lienPhoto)
              }
              setPhotos(c)
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
    }
  }

  useEffect(() => {
    console.log(id);
  }, [id])

  return (
    <div className='body page facturation'>
      <Header />
      <main>
        <Nav caiss={id} />
        <div className="head">
          <div className="left">
            <div className="textfield">
              <span>
                <PhoneIcon />
              </span>
              <input type="text" placeholder='Téléphone Client' />
            </div>
            <div className="textfield0">
              Mode de Payement:
            </div>
            <div className="textfield">
              <span>
                <ModeEditOutlineIcon />
              </span>
              <input type="text" value={code} onKeyDown={()=>ChangeCode()} onChange={(e) => setCode(e.target.value)} placeholder='Code Produit' />
            </div>
            <div className="textfield0">
              Quantité
              <input type="text" value={qte} onChange={(e)=>setQte(e.target.value)}/>
            </div>
            <div className="textfield">
              <span>
                <RemoveIcon />
              </span>
              <p>
                <input type="text" placeholder='Remise Max=40.0' /> %
              </p>
            </div>
            <div className="textfield01">
              Quantité en Stock:
              <span>ND</span>
              <AddIcon className='icon'/>
            </div>
          </div>
          <div className="right">
            <div className="images">
                {photos.map((lien,idx)=><img src={lien} key={idx} alt='r'/>)}
            </div>
          </div>
        </div>
        <hr />
        <div className="body"></div>
      </main>
    </div>
  )
}
