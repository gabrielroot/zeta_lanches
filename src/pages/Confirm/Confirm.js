import React,{useState, useEffect} from 'react';
import FormatNumber from '../../utils/FormatNumber';
import Footer from '../Footer'

import '../default.css';
import './Confirm.css';

const Confirm = (props) => { 
    if(!props.data.itens)
        window.location = '/menu'
    
    
    const [inpts, setInpts] = useState({});
    const [radio, setRadio] = useState({"nao":true})  
    const [troco, setTroco] = useState('')
    
    useEffect(() => {
        window.scrollTo(0,0)
    }, []);

    
    
    const itens = props.data.itens
    const total = props.data.total
    // console.log(props.data.itens)

    function getValue(e){
        const nome = e.target.name
        const valor = e.target.value
        setInpts({...inpts, [nome]:valor})
    }

    function sendWpp(){
        const isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        const removeEspaco = str =>{
            if(str.slice(str.length-1,str.length) === ' ') //VERIFICA SE O ÚLTIMO INDEX DA STRING É UM ESPAÇO, ASSIM, REMOVA-O (ALGUMAS AUTOCOMPLETAÇÕES DE TEXTO MOBILE COLOCAM 1 ESPAÇO EXTRA NO TEXTO)
               return str.slice(0,str.length - 1)
            else
                return str
        }
        const numero = '38991434956'
        
        let listaItens = ''
        for(let i=0; i<itens.length; i++)
            if(itens[i].qtde > 0){
                if(itens[i].item_sabor.length){
                    listaItens += `  ◼️ ${itens[i].nome}`
                    listaItens += `:\n`
                    itens[i].item_sabor.forEach((arry) => {
                        listaItens += `        ▪️ _${Object.values(arry)} de ${Object.keys(arry)};_\n`
                    })
                }else
                    listaItens += `  ◼️ ${itens[i].qtde} ${itens[i].nome};\n`
            }

        const nome = removeEspaco(inpts.nome)
        const local= removeEspaco(inpts.local)
        const obs = inpts.obs?'( _'+removeEspaco(inpts.obs)+'_ )':''
        
        let url = ''
        if(isMobile.any())
            url = 'https://wa.me/+55'+numero+'?text='
        else
            url = 'https://web.whatsapp.com/send?phone=+55'+numero+'&text='

        let message = window.encodeURIComponent(`Olá dona Elizete!
Meu nome é *${nome}*!
Gostaria que me preparasse esses itens:

${listaItens}
🛵 E que me entregasse aqui:
*${local}*\n
${obs}
Deu um total de *${FormatNumber.toREAL(total)}*
(${troco?`Troco para ${FormatNumber.toREAL(Number(troco))}`:'Não precisa de troco'})`)
        return url+message
    } 

    function validaForm(e){

        if(!inpts['nome'] || inpts['nome'] === '' || !inpts['local'] || inpts['local'] === ''){
            alert('Me diga seu nome e local para entrega!')
            e.preventDefault()
        }
        else
            window.open(sendWpp(),'_blank')
        // console.log(itens,total)
    }

    return (
        <>
            <h1>Confirme o pedido</h1>
            <div className="conteudo">
                <table>
                    <thead>
                        <tr><td>Item</td><td>Quantidade</td></tr>
                    </thead>
                    <tbody>
                        {itens.map((item,i)=>{
                            return(
                                item.qtde > 0?<tr key={i}><td className="item_nome">{item.nome}</td><td className="item_valor">{item.qtde}</td></tr>:null
                                )
                            })}
                    </tbody>
                    <tfoot>
                        <tr><td>Total</td><td className="wtotal">{FormatNumber.toREAL(total)}</td></tr>
                    </tfoot>
                </table>

                <div className="troco">
                    <p>Precisarei levar troco?</p>
                    <p className={radio.sim?"focused sim":"sim"} onClick={()=>setRadio({"sim":true, "nao":false})}>Sim</p>
                    <p className={radio.nao?"focused nao":"nao"} onClick={()=>{setTroco('');setRadio({"sim":false, "nao":true})}}>Não</p>
                </div>
                {radio.sim?
                    <div className="trocoFor">
                        <p>Troco para quanto?</p>
                        <input type="number" min={1} max={100} onChange={(e)=>{setTroco(e.target.value)}} value={FormatNumber.isOverHundred(troco)} placeholder={"R$"}/>
                    </div>
                    :null}

                <input className='inpt_confirm' type="text" name="nome" onChange={getValue} placeholder="Seu nome/apelido"/>
                <input className='inpt_confirm' type="text" name="local" onChange={getValue} placeholder="Local para entrega"/>
                <textarea className='inpt_confirm' name="obs" onChange={getValue} placeholder="Observação (Opcional)"></textarea>
            </div>



            <p className="label_wpp">Ao enviar, seu WhatsApp será aberto em uma conversa comigo!</p>
            <a className=' wpp_send' onClick={validaForm}>
            <p>ENVIAR</p>
                <div className="material-icons">
                    send
                </div>
            </a>
            <Footer />
        </>
    );
}

export default Confirm;
