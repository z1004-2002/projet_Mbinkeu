import React, { useState } from 'react'
import "../styles/home.css"
import { AccountCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


const endPoint = 'http://localhost:4500'
export default function Home() {
    const [gest, setGest] = useState({
        login: "",
        password: ""
    });
    
    const navig = useNavigate()

    const login = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(endPoint + "/gestionnaire/?login=" + gest.login, requestOptions)
            .then(response => response.text())
            .then(result => {
                let a = result
                if (!a) {
                    alert("Erreur de login")
                }else{
                    let b = JSON.parse(result);
                    if (b.pwd !== gest.password) {
                        alert("Erreur de mot de passe")
                    } else {
                        if(b.actif===0){
                            alert("vous n'êtes plus autorisé à accéder à l'application")
                        }else{
                            if (b.typeGest===0) {
                                navig(`/caissiere/${b.idGest}/facturation`)
                            } else if(b.typeGest===1) {
                                navig(`/magasinier/${b.idGest}`)
                            }
                        }
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='home'>
            <main>
                <div className="box">
                    <div className="header">
                        <AccountCircle className='icon' />
                        <h3>BAMBINO</h3>
                    </div>
                    <div className="bod">
                        <div className="form">
                            <div className="text-field">
                                <input type="text" value={gest.login} onChange={(e) => setGest({ ...gest, login: e.target.value })} placeholder='login' />
                            </div>
                            <div className="text-field">
                                <input type="password" value={gest.password} onChange={(e) => setGest({ ...gest, password: e.target.value })} placeholder='Mot de passe' />
                            </div>
                            <div className="btns">
                                <span className="btn" onClick={login}>Se Connecter</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
