import React, { useState,useEffect } from 'react';

import Cards from '../../components/Cards';
import FormatNumber from '../../utils/FormatNumber'
import { Link } from 'react-router-dom';

import '../default.css'
import Footer from '../Footer'
import './Menu.css'

const Menu = (props) => {
    const [pedidos, setPedidos] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        window.scrollTo(0,0)
    }, []);

    function getQPedidos(pedd) {
        setPedidos(pedd)
        const total = pedd.itens.reduce((acc, cur) => acc + cur.subtotal, 0)
        setTotal(total)
        document.querySelector('.total').setAttribute('style', 'display:flex;')
    }

    function submitForm(e) {
        if (total <= 0) {
            e.preventDefault()
            alert('Peça ao menos um item ;)')
        }
        else {
            props.setParams({ ...pedidos, total })
        }
    }

    return (
        <>
            <div className="content">
                <div className="text">
                    <p>Por aqui, tudo é feito na hora! A disponibilidade dos produtos irá depender dos ingredientes em estoque</p>
                    <p>Para hoje, temos...</p>
                </div>

                <Cards showInput={true} pedidos={getQPedidos} />

                <Link to='/confirm' className='confirm button' onClick={submitForm} >Informar dados para entrega</Link>
            </div>
            <div className="total">
                <p>Total:</p>
                <p>{FormatNumber.toREAL(total)}</p>
            </div>
            <Footer />
        </>
    )
}

export default Menu;
