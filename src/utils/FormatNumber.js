const FormatNumber = {
    toREAL(value){//Para valor COM o cifrão
        return `R$ ${value.toFixed(2).replace('.',',')}`
    },
    toValue(value){//Para valor SEM o cifrão
        return `${value.replace(',','.').replace(/^(\d+)(\.\d+\.)|[@-~]/,'')}`
    },
    toQtde(value){//Para validar se o número tem '.', ',' , 'e', é < 50, tem 3 dígitos ou é negativo
        return  `${value.toString().replace(/([5-9]\d|[1-9]\d{2,})|(50)|\D/g,'')}`
    },
    isOverHundred(value){//Verifica se é menor que 100
        return `${value.toString().replace(/([1-9][1-9]\d)|([1-9]\d[1-9])|(\d{4})/g,'')}`
    }
}

export default FormatNumber