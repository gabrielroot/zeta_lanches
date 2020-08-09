import React, {useState, useEffect} from 'react';

import FormEdit from '../components/FormEdit'

import services from '../services/api'
import FormatNumber from '../utils/FormatNumber';

const Cards = (props)=>{
    const [data, setData] = useState([])
    const [pedidos, setPedidos] = useState({})


    useEffect(() => {
        async function getData(){
            const response = await services.Api.get(`/item`)
            setData(response.data.itens)
        }
        getData()
        //O retorno é para definir o que acontecerá caso o componente for desmontado
    },[]); //Se colocar uma variável nos colchetes, o useeffct irá executar sempre que ela for alterada

    useEffect(() => {
        const arr = data.map((item)=>{

                    const obj = {
                        id: Number(item.id),
                        nome:'',
                        qtde: 0,
                        subtotal:0,
                    }
                    if(item.item_sabor)
                        obj.item_sabor = new Array(item.item_sabor.length)

                return obj
            })
                setPedidos({itens: arr})
    }, [data]);

    function calcSubtotal(e,id){
            e.target.value = FormatNumber.toQtde(e.target.value)
            const qtde = e.target.value

            let index

            for(let i=0; i<data.length;i++){
                if(Number(data[i].id) === Number(id)){
                    index = i
                    break
                }
            }
            let aux = pedidos
            aux.itens[index].subtotal = Number(data[index].preco)*qtde
            aux.itens[index].nome = data[index].nome
            aux.itens[index].qtde =Number(qtde)

            setPedidos({...pedidos,...aux}) //Preservo o que já existia, e adiciono o novo array
            props.pedidos(pedidos)

            document.getElementById(`${id}arrow`).setAttribute('style','display:flex; animation-play-state: running')
    }
    
    function getSabores(e,idx_itens,idx_sabor){
        e.target.value = FormatNumber.toQtde(e.target.value)
        const qtde = e.target.value
        // let found
        // a.data.forEach((item)=>{if(item.id == "2") console.log(true)})
        // a.data.find(item => item.id == "2")

        let obj = pedidos
        obj.itens[idx_itens].nome = data[idx_itens].nome
        obj.itens[idx_itens].item_sabor[idx_sabor] = {...obj.itens[idx_itens].item_sabor[idx_sabor],[data[idx_itens].item_sabor[idx_sabor].sabor.nome]: Number(qtde)}   //O SABOR DELE SERÁ INCREMENTADO COM O NOVO SABOR DO INPUT
        obj.itens[idx_itens].qtde = obj.itens[idx_itens].item_sabor.reduce((acc,cur)=> acc+Number(Object.values(cur)), 0)
        obj.itens[idx_itens].subtotal = obj.itens[idx_itens].qtde * Number(data[idx_itens].preco) //O SUBTOTAL DELE SERÁ IGUAL A MUTIPLICAÇÃO DA SOMA DE TODOS OS SABORES DO ITEM ATUAL
        
        setPedidos({...pedidos, ...obj})    //MESCLAGEM DE PEDIDOS
        props.pedidos(pedidos)  //PASSO OS DADOS PARA A FUNÇÃO EXISTENTE NA ROTA

        document.getElementById(`${obj.itens[idx_itens].id}arrow`).setAttribute('style','display:flex; animation-play-state: running')
    }


    function showInput(id,index){
        return (<>
        {/* Se existir o campo sabor: Esconda QTDE e exiba os SABORES */}

            <p className='operadores'>x</p>
            {data[index].item_sabor.length?
                <div className="inline_sabor">
                    {data[index].item_sabor.map((sabor,i)=>
                        <div key={i}>
                            <p className="sabor">{sabor.sabor.nome}</p>
                            <input type='number' onChange={(e)=>getSabores(e,index,i)} placeholder='QTDE'/>
                        </div>
                    
                    )}
                </div>
            :
            <>
                <input id={id} onChange={(e)=>calcSubtotal(e,id)} className='valor' min={0} max={50} step={1} type='number' name='show' placeholder='Quantidade' />
            </>}
            <p className='operadores'>=</p>
            <div className='inline_items'>
                <p><small>Subtotal:</small></p>
                <i className='material-icons subToTop' id={id+'arrow'}>arrow_upward</i>
                <p>{pedidos.itens[index]?FormatNumber.toREAL(pedidos.itens[index].subtotal):null}</p>
            </div>

        </>)
    }

    function showAdmin(id, index){
        return(<>
            <FormEdit id={id} item={data[index]} editar={true} />
            <div className="inline">
                <p>Disponível?</p>
                <p className={data[index].disponivel?"focused sim":"sim"} onClick={async(e)=>{
                    e.target.classList = 'focused sim'
                    e.target.parentNode.getElementsByClassName('nao')[0].classList = 'nao'
                    await services.Api.put(`/item/${id}`,{disponivel:true})
                }}>Sim</p>
                <p className={!data[index].disponivel?"focused nao":"nao"} onClick={async(e)=>{
                    e.target.classList = 'focused nao'
                    e.target.parentNode.getElementsByClassName('sim')[0].classList = 'sim'
                    await services.Api.put(`/item/${id}`,{disponivel:false})
                }}>Não</p>
            </div>
            <div className="inline controls"> 
                <i className='material-icons' onClick={async()=>{
                    let index = data.indexOf(data.find(item=>id===item.id))
                    console.log('id:',id,'index:',index)
                    if(index!==undefined){
                        console.log('kkkkkkkkk',data[index].id)
                        document.getElementById(id+'edit').setAttribute('style','display:grid;')
                    }
                }}>edit</i>
                <i className='material-icons' onClick={async()=>{
                    if(window.confirm('Deseja remover o item?')){
                        document.getElementById(index).remove()
                        console.log('Acessando o index: ',index)
                        await services.Api.delete(`/item/${id}`)
                        .then(()=>{
                            let index = data.indexOf(data.find(item=>id===item.id))
                            if(index){
                                console.table(data[index])
                                let aux = data
                                console.table(aux.splice(index,1))
                                setData(aux)
                                console.table(data)
                            }
                        })
                    }
                        
                }}>delete</i>
            </div>
        </>)
    }

    return(
        <>
            <div className="cards">
                {data.map((item,i)=>
                    <div id={i} key={item.id} className="item">
                        {props.showUnavailable && item.disponivel === false?
                            <div className="unavailable">
                                <p>INDISPONíVEL</p>
                            </div>
                        :null}
                            <img src={item.imagem} alt={item.nome} />
                            <h3>{item.nome}</h3>
                            <p className="descricao">{item.descricao}</p>
                            <div className="inline_items">
                                <p><small>Preço:</small></p>
                                <p className="preco">{FormatNumber.toREAL(Number(item.preco))}</p>
                            </div>
                            {props.showInput?showInput(item.id,i):null}
                            {props.showAdmin?showAdmin(item.id,i):null}
                        </div>
                )}
            </div>
        </>
    )
}

export default Cards