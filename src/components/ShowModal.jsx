import React from 'react'
import { Clear, Person } from '@mui/icons-material'

export default function ShowModal({ produit, photo, close}) {
    const codeToString = (code) => {
        let chaine = code.toString()
        let a = ''
        if (chaine.length == 6) {
            a = chaine[0] + "" + chaine[1] + "" + chaine[2] + "-" + chaine[3] + "" + chaine[4] + "" + chaine[5]
        }
        return a
    }

    return (
        <div className="modal">
            <div className="contenu_modal">
                <Clear onClick={() => close()} className='close' />
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
                            <span>{produit.size1 + '-' + produit.size2 + (produit.typeSize == 0 ? " Mois " : (produit.typeSize == 1 ? " Ans " : ""))}</span>
                        </div>
                    </div>
                    <div className="descript">
                        <p>Description :</p>
                        <p>{produit.description}</p>
                    </div>

                    <div className="images">
                        <div className="image">
                            {photo.map((im, idx) => <img alt='te' key={idx} src={im} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
