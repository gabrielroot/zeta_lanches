import React, {useState, useEffect} from 'react';


import services from '../services/api'
import FormatNumber from '../utils/FormatNumber';


const Cards = (props)=>{
    const [data, setData] = useState([])
    const [pedidos, setPedidos] = useState({})

    useEffect(() => {
        async function getData(){
            const response = await services.Api.get(`/menu`)
            setData(response.data.data)
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
                    if(item.sabor)
                        obj.sabor = new Array(item.sabor.length)

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
        obj.itens[idx_itens].sabor[idx_sabor] = {...obj.itens[idx_itens].sabor[idx_sabor],[data[idx_itens].sabor[idx_sabor]]: Number(qtde)}   //O SABOR DELE SERÁ INCREMENTADO COM O NOVO SABOR DO INPUT
        obj.itens[idx_itens].qtde = obj.itens[idx_itens].sabor.reduce((acc,cur)=> acc+Number(Object.values(cur)), 0)
        obj.itens[idx_itens].subtotal = obj.itens[idx_itens].qtde * Number(data[idx_itens].preco) //O SUBTOTAL DELE SERÁ IGUAL A MUTIPLICAÇÃO DA SOMA DE TODOS OS SABORES DO ITEM ATUAL
        
        setPedidos({...pedidos, ...obj})    //MESCLAGEM DE PEDIDOS
        props.pedidos(pedidos)  //PASSO OS DADOS PARA A FUNÇÃO EXISTENTE NA ROTA

        document.getElementById(`${obj.itens[idx_itens].id}arrow`).setAttribute('style','display:flex; animation-play-state: running')
    }

    function showInput(id,index){
        return (<>
        {/* Se existir o campo sabor: Esconda QTDE e exiba os SABORES */}

            <p className='operadores'>x</p>
            {data[index].sabor?
                <div className="inline_sabor">
                    {data[index].sabor.map((sabor,i)=>
                        <div key={i}>
                            <p className="sabor">{sabor}</p>
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

    return(
        <>
            <div className="cards">
                {data.map((item,i)=>
                    <div id={i} key={item.id} className="item">
                        <img src={item.imagem} alt={item.nome} />
                        <h3>{item.nome}</h3>
                        <p className="descricao">{item.descricao}</p>
                        <div className="inline_items">
                            <p><small>Preço:</small></p>
                            <p className="preco">{FormatNumber.toREAL(Number(item.preco))}</p>
                        </div>
                        {props.showInput?showInput(item.id,i):null}
                        <input type="hidden" name="nome" value="{item.nome}" />
                    </div>
                )}
            </div>
        </>
    )
}

export default Cards