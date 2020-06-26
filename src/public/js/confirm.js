var isMobile = {
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

const numero = '38998988064'
const wpp_send = document.querySelector('.wpp_send')

const nome_el = document.querySelector('input[name="nome"]')
const local_el = document.querySelector('input[name="local"]')
const obs_el = document.querySelector('textarea[name="obs"]')


let nome = ''
let local = ''
let obs = ''
const total = document.querySelector('.total').innerText.slice(3)
let item_nomes = []
let item_valores = []
document.querySelectorAll('.item_nome').forEach((el)=>item_nomes.push(el.innerText))
document.querySelectorAll('.item_valor').forEach((el)=>item_valores.push(el.innerText))

console.log(item_nomes)
console.log(item_valores)
let items = ''
for(let i=0; i<item_nomes.length; i++)
    items += `  ▪️ _${item_valores[i]} ${item_nomes[i]};_\n`

function atualizaWppSend(){
    let url = ''
    if(isMobile.any())
        url = 'https://api.whatsapp.com/send?phone=+55'+numero+'&text='
    else
        url = 'https://web.whatsapp.com/send?phone=+55'+numero+'&text='

    let message = window.encodeURIComponent(`Olá dona Elizete!
Meu nome é *${nome}*!
Gostaria que me preparasse esses itens:

${items}
🛵 E que me entregasse aqui:
*${local}.*
${obs}
Deu um total de *R$ ${total}*`)

    wpp_send.setAttribute('href', url + message)
}


nome_el.addEventListener('input',(el)=>{
    nome = el.target.value
    atualizaWppSend()
})

local_el.addEventListener('input',(el)=>{
    local = el.target.value
    atualizaWppSend()
})

obs_el.addEventListener('input',(el)=>{
    obs = '\n('+el.target.value+')\n'
    atualizaWppSend()
})

wpp_send.addEventListener('click',(el)=>{
    if(nome == '' || local == ''){
        el.preventDefault()
        nome_el.focus()
        alert('Diga-me ao menos seu nome e aonde receberá a entrega!')
    }else
        setTimeout(()=>
            window.location = window.location.origin
        ,2)
})