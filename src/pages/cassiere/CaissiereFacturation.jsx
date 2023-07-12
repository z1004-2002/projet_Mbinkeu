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
    tel: "",
    typeFac: "",
    idCaissiere: 0,
    capital: 0,
    tva: 0,
    produits: []
  })
  const [produits, setProduits] = useState([])
  const [code, setCode] = useState("")
  const [photos, setPhotos] = useState([])
  const [qte, setQte] = useState(1)
  const [stock, setStock] = useState('ND')
  const [produit, setProduit] = useState({
    codePro: 0,
    prix: 0,
    qte: 1,
  })
  const [net, setNet] = useState(0)
  const [total, setTotal] = useState(0)
  const [relicat, setRelicat] = useState(0)
  const [donne, setDonne] = useState(0)

  const calcul = () => {
    let tot = 0
    for (let i = 0; i < produits.length; i++) {
      tot = tot + parseInt(produits[i].qte) * parseInt(produits[i].prix)
    }
    setTotal(tot)
    let a = total - facture.remise * total / 100
    setNet(a)
  }

  const test = (item) => {
    console.log(item)
  }
  const chargeCode = () => {
    if (code.length === 7) {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("http://localhost:4500/produit/" + code[0] + code[1] + code[2] + code[4] + code[5] + code[6], requestOptions)
        .then(response => response.text())
        .then(result => {
          let a = JSON.parse(result)
          setProduit({
            codePro: a.codePro,
            prix: a.prix,
            qte: 1,
          })
          setStock(a.qte)
          fetch("http://localhost:4500/photo/" + a.codePro, requestOptions)
            .then(response => response.text())
            .then(result => {
              let b = JSON.parse(result)
              let c = []
              for (let i = 0; i < b.length; i++) {
                c.push('http://boutiquebambino.shop/eshop/productImages/' + a.codePro + '/' + b[i].lienPhoto)
              }
              setPhotos(c)
            })
            .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
    }
  }

  const addToFact = () => {
    let pr = produit
    let test = false;
    let index = 0;
    for (let i = 0; i < produits.length; i++) {
      if (produits[i].codePro === produit.codePro) {
        test = true;
        index = i;
      }
    }
    if (test) {
      let te = produits
      setProduits([])
      let aux = parseInt(te[index].qte) + parseInt(qte)
      te[index].qte = aux
      setProduits(te)
      let aux2 = []
      for (let i = 0; i < te.length; i++) {
        aux2.push(te[i])
      }
      setProduits(aux2)
    } else {
      let te = produits
      let aux2 = []
      pr.qte = qte
      for (let i = 0; i < te.length; i++) {
        aux2.push(te[i])
      }
      aux2.push(pr)
      setProduits(aux2)
    }
    calcul()
  }
  function separateur(nombre) {
    nombre = nombre.toString();
    var partie1 = nombre.slice(0, 3);
    var partie2 = nombre.slice(3)
    return partie1 + '-' + partie2;
  }


  useEffect(() => {
    setRelicat(parseInt(donne) - parseInt(net))
    let te = produits
    setProduits(te)
    calcul()
    chargeCode()
  }, [id, produits, donne, total, facture.remise, code,qte,net])

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
              <input type="text" value={facture.tel}
               onChange={(e)=>{setFacture({...facture,tel:e.target.value})}}
              placeholder='Téléphone Client' />
            </div>
            <div className="textfield0">
              Mode de Payement:
            </div>
            <div className="textfield">
              <span>
                <ModeEditOutlineIcon />
              </span>
              <input type="text" value={code} onKeyDown={() => chargeCode()} onChange={(e) => setCode(e.target.value)} placeholder='Code Produit' />
            </div>
            <div className="textfield0">
              Quantité
              <input type="number" value={qte} onChange={(e) => setQte(e.target.value)} />
            </div>
            <div className="textfield">
              <span>
                <RemoveIcon />
              </span>
              <p>
                <input type="number"
                  onKeyUp={() => {
                    let a = total - facture.remise * total / 100
                    setNet(a)
                  }}
                  value={facture.remise}
                  onChange={(e) => {
                    setFacture({ ...facture, remise: e.target.value })
                  }} placeholder='Remise Max=40.0' /> %
              </p>
            </div>
            <div className="textfield01">
              Quantité en Stock:
              <span>{stock}</span>
              <AddIcon className='icon' onClick={() => addToFact()} />
            </div>
          </div>
          <div className="right">
            <div className="images">
              {photos.map((lien, idx) => <img src={lien} key={idx} alt='r' />)}
            </div>
          </div>
        </div>
        <hr />
        <div className="body">
          <div className="top">
            <div className="total">Total (Fcfa): <span className='green'>{total}</span></div>
            <div className="net">Net A Payer (Fcfa): <span className='green'>{net}</span></div>
            <div className="reliq">
              <input type="text" name="reliq" id="reliq"
                onChange={(e) => {
                  setDonne(e.target.value)
                }}
                value={donne} />
              <span>
                Reliquat : <span className='green'>{relicat}</span>
              </span>
            </div>
          </div>
          <div className="bottom">
            <table>
              <thead>
                <tr>
                  <th>Code Produit</th>
                  <th>Prix Unitaire</th>
                  <th>Quantité</th>
                  <th>Sous-Total</th>
                </tr>
              </thead>
              <tbody>
                {produits.map((prod, idx) => {
                  return <tr key={idx} onClick={()=>test(prod)}>
                    <td>{separateur(prod.codePro)} </td>
                    <td>{prod.prix} FCFA</td>
                    <td>{prod.qte}</td>
                    <td>{prod.prix * prod.qte} FCFA</td>
                  </tr>
                })
                }
              </tbody>
            </table>
          </div>
          <div className="end">
            <span className="rec">Recette Journalière</span>
            <div className="after">
              <span className="sup">Supprimer</span>
              <span className="annu">Annuler</span>
              <span className='aper'>Aperçu</span>
              <span className='val'>Valider</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
