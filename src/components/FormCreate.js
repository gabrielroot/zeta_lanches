import React,{useState} from 'react';

import services from '../services/api'
import FormatNumber from '../utils/FormatNumber';
const FormEdit = (props) => {
    const [criar, setCriar] = useState({
        nome: '',
        descricao: '',
        imagem: '',
        preco: ''
    });

    function getValue(e){
        const nome = e.target.name
        const valor = e.target.value
        setCriar({...criar, [nome]:valor})
    }

    return (
        <>
            <div id={props.create===true?'create':'null'} className="formEdit">
                <h3>criar</h3>
                <div className="inline">
                    <p>Nome</p>
                    <input tabIndex={1} type="text" name="nome" placeholder='Nome' onChange={getValue} value={criar.nome}/>
                </div>
                <div className="inline">
                    <p>Descrição</p>
                    <textarea tabIndex={2} type="text" name="descricao" onChange={getValue} value={criar.descricao} placeholder='Descricao'></textarea>
                </div>
                <div className="inline">
                    <p>Imagem</p>
                    <input tabIndex={3} name="imagem" onChange={getValue} type="file" />
                </div>
                <div className="inline">
                <p>Preço</p>
                    <input tabIndex={4} type="text" name="preco" onChange={getValue} value={FormatNumber.toValue(criar.preco)} placeholder='Preço'/>
                </div>
                <div className="SaveForm">
                    <p onClick={()=>props.setCriar(!props.create)}>Cancelar</p>
                    <p tabIndex={5} onClick={async()=>{
                        console.table(criar)
                        if(Object.values(criar).find(value=>value === '')!==''){
                            props.setCriar(!props.create)
                            await services.Api.post(`/item`,{...criar,['preco']:Number(criar.preco)})
                            .then(()=>window.location.reload())
                        }else
                            alert('Preencha todos os campos!')
                    }}>Salvar</p>
                </div>
            </div>   
        </>
    );
}

export default FormEdit;
