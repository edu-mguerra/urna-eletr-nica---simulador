let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''
let votoBranco = false
let  votos = []


function começarEtapa(){
    let etapa = etapas[etapaAtual]
    numero = ''
    let votoBranco = false
    let numeroHTML = ''
  

    for( let i = 0; i < etapa.numeros; i++){
        if(i == 0){
            numeroHTML += ' <div class="numero pisca"></div>'
        }else{
        numeroHTML += ' <div class="numero"></div>'
        }
    }


    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
    
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) =>{ // a variavel candidato é um filtro que pega os  candidatos 
        if(item.numero === numero){
            return true
            
        }else{
            return false // poderia ser colocado 'return 0'
        }
        
    })
    if(candidato.length > 0){ // por qual motivo é 'candidato.length > 0' por causa que se o item.numero não for igual ao numero, ele vai voltar 0
        candidato = candidato[0] // se  colocar assim na outra pasta de script "console.log(etapas[0].candidatos)" vai se referiri aos candidatos de vereadores, como la  emm cima a variavel candidatos ja entou em etapas e candidatos, basta colocar o 0  
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`

        fotosHTML = ''
        for(let i in candidato.fotos){
            fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            
            
            lateral.innerHTML = fotosHTML
        }
    }else{
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso--grande">VOTO NULO</div>'
    }


}

começarEtapa()

function clicou(n){
    let elnumero = document.querySelector('.numero.pisca')
    if(elnumero !== null){
        elnumero.innerHTML = n
        numero = numero + n // a variavel numero é para aparecer o numero que eu digitei completo, com 'numero' la em cima é uma variavel varia, é basicamente a variavel vazia + o numero que eu estou digitanto, ela basicamnete guarda os 'n' que eu  digitei

        elnumero.classList.remove('pisca') // dps que adiciona um numero, ele remove o pisca
        if( elnumero.nextElementSibling !== null){ //  dps que removeu a class, o if vai verificar se o proximo elnumero vai está vazio, se estiver, ele adiciona a class .pisca
            elnumero.nextElementSibling.classList.add('pisca') // e com a proxima class, foi add o .pisca, ela conreesponde ao elnumero, e preenche com o N
        }else{
            atualizaInterface()
        } 
    }
}
function branco(){
     votoBranco = true
        numero = ''
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande">VOTO EM BRANCO</div>'
        lateral.innerHTML = ''
}

function corrige(){
    começarEtapa()
}

function confirma(){
    let etapa = etapas[etapaAtual]
    
    let votoConfirmado = false


    if(votoBranco == true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    
    if(votoConfirmado){
        etapaAtual++ //  fiz isso pra ir de 0 pra 1
        if(etapas[etapaAtual] !== undefined){
            começarEtapa()
        } else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIIM</div>'
            console.log(votos)
        }
    }
}

