const valores = document.querySelectorAll('.valor')
const confirma = document.querySelector('.confirm')
const total = document.querySelector('.total')
let isEmpt = true
let valores_array = new Array(valores.length)

function updateTotal(valores_produtos){
    valores.forEach((valor,i)=>{
        if(valor.value>=0)
            valores_array[i]=Number(valor.value)*Number(valores_produtos[i])
    })

    let all = new Number
    
    for(val of valores_array)
        if(val>0)
            all+=val
    document.querySelector('input[name="total"]').value = all
    total.lastElementChild.innerText = ' R$ ' + all
}
for(valor of valores){
    function alterSubtotal(el){
        //SOMA EM TEMPO REAL
        let array_valores_produtos = []
        const valores_produtos =  document.querySelectorAll('.preco')
        for(valor of valores_produtos){
            array_valores_produtos.push(Number(valor.innerText
            .slice(3)
            .replace(',','.')))
        }
        let subTotal = Number(el.target.previousElementSibling.previousElementSibling.lastElementChild.innerText
        .slice(3)
        .replace(',','.'))
        
        el.target.value = el.target.value.replace(/\D/g,'')
 
        const valor_inpt = el.target.value
        subTotal *= valor_inpt.toLocaleString('pt-BR')
        
        if(subTotal<0){
            subTotal=0
        }

        
        el.target.nextElementSibling.nextElementSibling.lastElementChild.innerText = 'R$ ' +subTotal
        
        //MUDA TOTAL
        updateTotal(array_valores_produtos)

        //MOSTRA TOTAL
        total.setAttribute('style','display:flex;')
    }

    valor.addEventListener('input', alterSubtotal)
}
confirma.addEventListener('click',(evt)=>{
    valores.forEach((valor)=>{
        if(valor.value > 0){    //SE AO MENOS UM INPUT FOI PREENCHIDO
            isEmpt = false
        } 
    })
    if(isEmpt){
        evt.preventDefault()
        alert('Peça ao menos um item ;)')
    }
})
