import React,{useState} from 'react';

import services from '../services/api'
import FormatNumber from '../utils/FormatNumber';
const FormEdit = (props) => {
    const [criar, setCriar] = useState({
        id:-1,
        nome: props.item.nome,
        descricao: props.item.descricao,
        imagem: props.item.imagem,
        preco: props.item.preco.toString()
    });

    function getValue(e){
        const nome = e.target.name
        const valor = e.target.value
        setCriar({...criar, [nome]:valor})
    }

    return (
        <>
            <div className="formEdit">
                <h3>Editar</h3>
                <p>({props.item.nome})</p>
                <div className="inline">
                    <p>Nome</p>
                    <input type="text" name="nome" placeholder='Nome' onChange={getValue} value={criar.nome}/>
                </div>
                <div className="inline">
                    <p>Descrição</p>
                    <input type="text" name="descricao" onChange={getValue} value={criar.descricao} placeholder='Descricao'/>
                </div>
                <div className="inline">
                    <p>Imagem</p>
                    <input name="imagem" onChange={getValue} type="file" />
                </div>
                <div className="inline">
                <p>Preço</p>
                    <input type="text" name="preco" onChange={getValue} value={FormatNumber.toValue(criar.preco)} placeholder='Preço'/>
                </div>
                <div className="SaveForm">
                    <p onClick={()=>props.setBool(false)}>Cancelar</p>
                    <p onClick={async()=>{
                        if(Object.values(criar).find(value=>value == '')!==''){
                            setCriar({...criar,['id']:props.id})
                            props.item.nome = criar.nome
                            props.item.descricao = criar.descricao
                            props.item.preco = criar.preco
                            props.item.imagem = criar.imagem
                            console.log(criar)
                            await services.Api.put(`/item/${props.id}`,{...criar,['id']:props.id,['preco']:Number(criar.preco)})
                            props.setBool(false)
                        }else
                            alert('Preencha todos os campos!')
                    }}>Salvar</p>
                </div>
            </div>   
        </>
    );
}

export default FormEdit;
