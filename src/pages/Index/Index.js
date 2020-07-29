import React from 'react';
import {Link} from 'react-router-dom';

import '../default.css'
import '../Footer'
import './Index.css'
import Footer from '../Footer';

const Main = () => {
    return (
        <>
            <div className="contentt">
                <div className="card">
                {/* <Link to='/hoje' className='linkImg' > ATIVAR QUANDO EXISTIR AUTENTICAÇÃO DE USUÁRIO*/}
                    <img src="/images/logo192.png" alt="Elizete" />
                {/* </Link> */}
                    <h1>Zeta-Lanches</h1>
                    <div className="about">
                        <p>Olá! Meu nome é Elizete [Zeta]. Sou artesã, boleira e em momentos vagos, faço lanches. Neste período de pandemia venho trabalhando com a prática do delivery, então basta fazer o pedido e esperar no conforto de sua casa <span role="img" aria-label="sheep">😊</span></p>
                        <p>Delivery somente para a comunidade quilombola de Alegre!</p>
                    </div>
                    <Link to='/menu' className='button' >Ver cardápio</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Main;
