import React from 'react'
import "../styles/home.css"
import { AccountCircle } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'


export default function Home() {

    const navig = useNavigate()

    const login = ()=>{
        navig("/caissiere/118/facturation")
    }
    const loginMag = ()=>{
        navig("/magasinier/116")
    }

    return (
        <div className='home'>
            <main>
                <div className="box">
                    <div className="header">
                        <AccountCircle className='icon'/>
                        <h3>BAMBINO</h3>
                    </div>
                    <div className="bod">
                        <div className="form">
                            <div className="text-field">
                                <input type="text" placeholder='login' />
                            </div>
                            <div className="text-field">
                                <input type="password" placeholder='Mot de passe'/>
                            </div>
                            <div className="btns">
                                <span className="btn" onClick={login}>Caissière</span>
                                <span className="btn" onClick={loginMag}>Magasinier</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
