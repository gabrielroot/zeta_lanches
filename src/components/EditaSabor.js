import React,{useState,useEffect} from 'react';

import services from '../services/api'
const EditaSabor = (props) => {
    const [saboresAvailable, setSaboresAvailable] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await services.Api.get(`/sabor`)
            setSaboresAvailable(response.data.sabores)
        }
        getData()
        //O retorno é para definir o que acontecerá caso o componente for desmontado
    },[]); //Se colocar uma variável nos colchetes, o useeffct irá executar sempre que ela for alterada
    return (
        <>
            <div id={props.id+'sabor'} className="formEdit">
                <h3>Editar sabores</h3>
                {/* <div className='kkkk'> */}
                    {saboresAvailable.map((item)=>
                        <div key={props.id+item.nome} id={item.nome+item.id} className="sabores">
                            <p>{item.nome}</p>
                            <div>
                                { //Associar/Desassociar sabor ao item
                                    props.sabores.find((sabor)=>sabor.sabor.nome===item.nome)?
                                    <p className='saborAction' onClick={async()=>{
                                        await services.Api.delete(`/item/${props.id}/sabor/${item.id}`)
                                    }}>-</p>
                                    :
                                    <p className='saborAction' onClick={async()=>{
                                        const status = await services.Api.post(`/item/${props.id}/sabor`,{saborId:item.id})
                                        if(status.data.status){
                                            console.log(status.data.status)
                                            setSaboresAvailable(saboresAvailable)
                                        }
                                    }}>+</p>
                                }
                                <i className='material-icons' onClick={async()=>{
                                    if(window.confirm('Deseja remover o sabor?')){
                                        const status = await services.Api.delete(`/sabor/${item.id}`) 
                                        if(status.data.status){
                                            const index = saboresAvailable.indexOf(saboresAvailable.find(search=>item.id===search.id))
                                            let aux = saboresAvailable
                                            aux.splice(index,1)
                                            setSaboresAvailable(aux)
                                            document.getElementById(item.nome+item.id).setAttribute('style','display:none;')
                                        }
                                    }
                                }}>delete</i>
                            </div>
                        </div>
                    )}
                    <p className='addSabor' onClick={async()=>{
                            let sabor = window.prompt('Insira o nome do sabor', '')
                            if (sabor !== null && sabor !== ""){
                                const status = await services.Api.post(`/sabor`,{nome:sabor})
                                sabor = {id:status.data.sabor.id,nome:sabor}
                                setSaboresAvailable([...saboresAvailable, sabor])
                            }
                        }}>Novo Sabor</p>
                {/* </div> */}
                    <p className='close' onClick={()=>document.getElementById(props.id+'sabor').setAttribute('style','display:none;')}>Fechar</p>
            </div>   
        </>
    );
}

export default EditaSabor;
