const label_cbx = document.querySelectorAll('.sim, .nao')
const cbx = document.querySelectorAll('input[type="radio"]')

function labelCheckbox(){
    label_cbx.forEach((el,i)=>{
        if(cbx[i].checked)
            el.setAttribute('class','focused')
        else
            el.setAttribute('class','')
    })
}

labelCheckbox()

label_cbx.forEach((label, i)=>{
    label.addEventListener('click',(el)=>{
        
        if(!cbx[i].checked)
            cbx[i].checked = true
            
        labelCheckbox()

    })
})