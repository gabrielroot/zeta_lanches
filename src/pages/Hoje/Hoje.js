import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import Cards from '../../components/Cards'
import FormCreate from '../../components/FormCreate'
import EditaSabor from '../../components/EditaSabor'
import Footer from '../Footer'


import './Hoje.css'
const Hoje = () => {
  const [criar, setCriar] = useState(false);

    return (
        <>
          <h1>O que teremos para hoje?</h1>
          <Cards  showAdmin={true}/>
          <div className='addItem' onClick={()=>setCriar(!criar)}>
            ADICIONAR ITEM
          </div>
            <FormCreate create={criar} setCriar={setCriar}/>
          <Link to='/menu' className='button btn_create' >Ver menu</Link>
          <Footer />
        </>
    );
}

export default Hoje;
