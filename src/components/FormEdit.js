import React,{useState} from 'react';

import services from '../services/api'
import FormatNumber from '../utils/FormatNumber';
const FormEdit = (props) => {
    const [editar, setEditar] = useState({
        nome: props.item.nome,
        descricao: props.item.descricao,
        imagem: props.item.imagem,
        preco: props.item.preco.toString()
    });

    function getValue(e){
        const nome = e.target.name
        const valor = e.target.value
        setEditar({...editar, [nome]:valor})
    }

    return (
        <>
            <div id={props.id+'edit'} className="formEdit">
                <h3>Editar</h3>
                <p>({props.item.nome})</p>
                <div className="inline">
                    <p>Nome</p>
                    <input type="text" name="nome" placeholder='Nome' onChange={getValue} value={editar.nome}/>
                </div>
                <div className="inline">
                    <p>Descrição</p>
                    <textarea type="text" name="descricao" onChange={getValue} value={editar.descricao} placeholder='Descricao'></textarea>
                </div>
                <div className="inline">
                    <p>Imagem</p>
                    <input name="imagem" onChange={getValue} type="file" />
                </div>
                <div className="inline">
                <p>Preço</p>
                    <input type="text" name="preco" onChange={getValue} value={FormatNumber.toValue(editar.preco)} placeholder='Preço'/>
                </div>
                <div className="SaveForm">
                    <p onClick={()=>document.getElementById(props.id+'edit').setAttribute('style','display:none;')}>Cancelar</p>
                    <p onClick={async()=>{
                        if(Object.values(editar).find(value=>value === '')!==''){
                            props.item.nome = editar.nome
                            props.item.descricao = editar.descricao
                            props.item.preco = editar.preco
                            props.item.imagem = editar.imagem
                            console.log(editar)
                            await services.Api.put(`/item/${props.id}`,{...editar,['preco']:Number(editar.preco)})
                            document.getElementById(props.id+'edit').setAttribute('style','display:none;')
                        }else
                            alert('Preencha todos os campos!')
                    }}>Salvar</p>
                </div>
            </div>   
        </>
    );
}

export default FormEdit;
