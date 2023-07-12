import React, { useEffect, useState } from 'react'
import litsearch from './../assets/img/litsearch.png'

export default function BoxCat({ idCat, nomCat }) {
  const [nombre, setNombre] = useState(0)


  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:4500/produit/nombre/" + idCat, requestOptions)
      .then(response => response.text())
      .then(result => setNombre(result))
      .catch(error => console.log('error', error));

  }, [idCat])
  return (
    <div className="ppBox">
      <div className="num"><span>{nomCat}</span></div>
      <hr />
      <div className="qte"><span>{nombre}</span>

        <img className="ploupe" src={litsearch} alt='tes' />
      </div>
    </div>
  )
}
