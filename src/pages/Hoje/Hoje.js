import React from 'react';

import Cards from '../../components/Cards'
import Footer from '../Footer'


import './Hoje.css'
const Hoje = () => {
    return (
        <>
          <h1>O que teremos para hoje?</h1>
          <Cards  showAdmin={true}/>
          <Footer />
        </>
    );
}

export default Hoje;
