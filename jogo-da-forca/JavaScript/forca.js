let stand = document.getElementById('stand')
let buttonTheme = document.getElementById('buttonTheme')

//Construção do Tema
buttonTheme.addEventListener('click',function(){
    let clue = document.getElementById('idTheme').value
    let random = Math.round(Math.random()*9)+0

    if(clue === 'Animal'){
        animal(random)

    }else if(clue === 'Fruta'){
        fruit(random)

    }else if(clue === 'Nome'){
        nome(random)
    }

    buttonTheme.disabled = true
})

function animal(random){
    let array = new Array()

    array[0] = 'MACACO'
    array[1] = 'CACHORRO'
    array[2] = 'CAVALO'
    array[3] = 'JACARÉ'
    array[4] = 'CROCODILO'
    array[5] = 'RINOCERONTE'
    array[6] = 'CANGURU'
    array[7] = 'ORNITORRINCO'
    array[8] = 'OVELHA'
    array[9] = 'TUBARÃO'

    load(array[random])
}

function fruit(random){
    let array = new Array()

    array[0] = 'BANANA'
    array[1] = 'MELANCIA'
    array[2] = 'MAMÃO'
    array[3] = 'MANGA'
    array[4] = 'PITOMBA'
    array[5] = 'CAJU'
    array[6] = 'ABÓBORA'
    array[7] = 'FRAMBOESA'
    array[8] = 'DAMASCO'
    array[9] = 'MORANGO'

    load(array[random])
}

function nome(random){
    let array = new Array()

    array[0] = 'JOÃO'
    array[1] = 'EDUARDO'
    array[2] = 'GUSTAVO'
    array[3] = 'DANIEL'
    array[4] = 'DANILO'
    array[5] = 'MARIA'
    array[6] = 'VITÓRIA'
    array[7] = 'LÚCIA'
    array[8] = 'FRANCISCA'
    array[9] = 'DANIELA'

    load(array[random])
}

//Array preenchendo os input VAZIOS
let array = new Array()
function arrayTest(wordDrawnNoAccent){
    for(let counter = 0; counter <= wordDrawnNoAccent.length-1; counter++){
        array[counter] = ' '
    }
}

let arrayWordNoRepetition   //Administrar as letras para a vitória
let wordDrawnAccent = ''    //Administrar as letras para palavras com acento
let wordDrawnNoAccent = ''  //Administrar as letras para palavras sem acento e os inputs

function load(wordDrawn){
    wordDrawnAccent = wordDrawn

    let hang = document.createElement('img')
    hang.setAttribute('src','Images/forca.png')
    stand.appendChild(hang)

    hang.style.position = `absolute`
    hang.style.display = `inline`
    hang.style.left = `10%`

    //Remover os acentos
    wordDrawnNoAccent = wordDrawn.replace(/[ÁÀÂÃ]/ig,"A")
    wordDrawnNoAccent = wordDrawnNoAccent.replace(/[ÉÈÊ]/ig,"E")
    wordDrawnNoAccent = wordDrawnNoAccent.replace(/[ÍÌÎ]/ig,"I")
    wordDrawnNoAccent = wordDrawnNoAccent.replace(/[ÓÒÔÕ]/ig,"O")
    wordDrawnNoAccent = wordDrawnNoAccent.replace(/[ÚÙÛ]/ig,"U")

    //Retirar as palavras repetidas
    let arrayWord = wordDrawnNoAccent.match(/[a-z]/ig)
    arrayWordNoRepetition = [... new Set(arrayWord)]

    arrayTest(wordDrawnNoAccent)
    assembleWords(wordDrawnNoAccent, null)
    insertLetters(wordDrawnNoAccent)
}

//Montar os input
function assembleWords(wordDrawnNoAccent, get, position){
    let increase = 0

    for(let counter = 0; counter <= wordDrawnNoAccent.length-1; counter++){
        let word = document.createElement('input')

        if(get != null && counter == position){
            array[counter] = get
        }

        word.setAttribute('type','text')
        word.setAttribute('size','1')
        word.setAttribute('maxlength','0')
        word.setAttribute('minlength','0')
        word.setAttribute('value',`${array[counter]}`)
        stand.appendChild(word)

        word.style.position = `absolute`
        word.style.display = `inline`
        word.style.left = `${30 + increase}%`
        word.style.top = `25%`

        word.style.height = `6%`
        word.style.width = `3%`

        word.style.fontSize = `2em`
        word.style.fontWeight = `bold`

        word.style.textAlign = `center`
        word.style.textTransform = `uppercase`

        increase += 5
    }
}

//Inserir as letras
function insertLetters(wordDrawnNoAccent){
    let label = document.createElement('label')
    label.setAttribute('for','inputText')
    stand.appendChild(label)

    label.innerHTML = `Digite uma letra: `
    label.style.position = `absolute`
    label.style.display = `inline`
    label.style.left = `30%`
    label.style.top = `56%`

    label.style.color = `blue`
    label.style.fontSize = `1.7em`
    label.style.fontWeight = `bold`

    let inputText = document.createElement('input')
    inputText.setAttribute('name','inputText')
    inputText.setAttribute('type','text')
    inputText.setAttribute('maxlength','1')
    inputText.setAttribute('minlength','1')
    inputText.setAttribute('size','1')
    inputText.style.height = `25px`
    inputText.style.width = `50px`
    stand.appendChild(inputText)

    inputText.style.position = `absolute`
    inputText.style.display = `inline`
    inputText.style.left = `46%`
    inputText.style.top = `55%`

    inputText.style.fontSize = `2em`
    inputText.style.fontWeight = `bold`

    inputText.style.padding = `5px`
    inputText.style.textAlign = `center`
    inputText.style.textTransform = `uppercase`

    enter(wordDrawnNoAccent, inputText)
}

let letterRepeated = new Array()

//Configurando o Enter
function enter(wordDrawnNoAccent,inputText){
    let get = ''
    document.addEventListener('keydown',function(){
        let status = true
        let key = event.keyCode
        if(key === 13){
            get = inputText.value.toUpperCase()

            //Restrição: Caracter não identificado
            switch(get){
                case '':
                case ' ':
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    window.alert(`Caracter NÃO identificado!`)
                    status = false
                    break
            }

            //Restrição: Letra repetida
            for(let counter = 0; counter <= letterRepeated.length; counter++){
                if(get == letterRepeated[counter]){
                    status = false
                    continue
                }
            }

            if(!status){
                window.alert(`Essa letra já foi digitada!`)

            }else{
                letterRepeated.push(get)
                compare(wordDrawnNoAccent, get)
            }

            inputText.focus()
            inputText.value = ''
        }
    })
}

let wrongWord = new Array()
let span = document.createElement('span')

//Comparação COM e SEM acentos
function compare(wordDrawnNoAccent, get){
    let key = false
    for(let counter = 0; counter <= wordDrawnNoAccent.length-1; counter++){
        if(get === 'A' && wordDrawnAccent.charAt(counter) === 'Ã'){
            get = 'Ã'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'A' && wordDrawnAccent.charAt(counter) === 'Á'){
            get = 'Á'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'A' && wordDrawnAccent.charAt(counter) === 'À'){
            get = 'À'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'A' && wordDrawnAccent.charAt(counter) === 'Â'){
            get = 'Â'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'E' && wordDrawnAccent.charAt(counter) === 'É'){
            get = 'É'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }
        
        if(get === 'E' && wordDrawnAccent.charAt(counter) === 'È'){
            get = 'È'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'E' && wordDrawnAccent.charAt(counter) === 'Ê'){
            get = 'Ê'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'I' && wordDrawnAccent.charAt(counter) === 'Í'){
            get = 'Í'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'I' && wordDrawnAccent.charAt(counter) === 'Ì'){
            get = 'Ì'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'I' && wordDrawnAccent.charAt(counter) === 'Î'){
            get = 'Î'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'O' && wordDrawnAccent.charAt(counter) === 'Õ'){
            get = 'Õ'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'O' && wordDrawnAccent.charAt(counter) === 'Ó'){
            get = 'Ó'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'O' && wordDrawnAccent.charAt(counter) === 'Ò'){
            get = 'Ò'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'O' && wordDrawnAccent.charAt(counter) === 'Ô'){
            get = 'Ô'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'U' && wordDrawnAccent.charAt(counter) === 'Ú'){
            get = 'Ú'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'U' && wordDrawnAccent.charAt(counter) === 'Ù'){
            get = 'Ù'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === 'U' && wordDrawnAccent.charAt(counter) === 'Û'){
            get = 'Û'
            key = true
            assembleWords(wordDrawnAccent, get, counter)
        }

        if(get === wordDrawnNoAccent[counter]){
            key = true
            assembleWords(wordDrawnNoAccent, get, counter)
        }
    }

    if(!key){
        members(wordDrawnNoAccent)

    }else{
        hits()
    }
    
    wrongWord.push(get)

    span.innerHTML = 'Palavras Digitadas: '
    span.innerHTML += `${wrongWord}`
    
    span.style.position = 'absolute'
    span.style.left = '11%'
    span.style.top = '77%'
        
    span.style.color = `red`
    span.style.fontSize = `1.5em`
    span.style.fontWeight = `bold`

    stand.appendChild(span)
}

//Contagem de letras para vencer
let scoreHit = 0
function hits(){
    if(scoreHit < arrayWordNoRepetition.length-1){
        scoreHit++

    }else{
        window.alert(`PARABÉNS! \nVOCÊ GANHOU!`)
        document.location.reload(true)
    }
}

//Contagem de letras para perder
let scoreError = 0
function members(wordDrawnNoAccent){
    switch(scoreError){
        case 0:
            head()
            break

        case 1:
            body()
            break

        case 2:
            rightArm()
            break

        case 3:
            leftArm()
            break

        case 4:
            rightLeg()
            break

        case 5:
            leftLeg()
            window.alert(`VOCÊ PERDEU! \nA palavra era ${wordDrawnAccent}`)
            
            document.location.reload(true)
            break
    }

    scoreError++
}

function head(){
    let head = document.createElement('img')
    head.setAttribute('src','Images/cabeca.png')
    head.style.width = `3%`
    stand.appendChild(head)

    head.style.position = `absolute`
    head.style.display = `inline`
    head.style.left = `15%`
    head.style.top = `32%`
}

function body(){
    let body = document.createElement('img')
    body.setAttribute('src','Images/tronco.png')
    body.style.width = `1%`
    stand.appendChild(body)

    body.style.position = `absolute`
    body.style.display = `inline`
    body.style.left = `16.1%`
    body.style.top = `37%`
}

function rightArm(){
    let rightArm = document.createElement('img')
    rightArm.setAttribute('src','Images/braco_direito.png')
    rightArm.style.width = `1.8%`
    stand.appendChild(rightArm)

    rightArm.style.position = `absolute`
    rightArm.style.display = `inline`
    rightArm.style.left = `16.4%`
    rightArm.style.top = `39%`
}

function leftArm(){
    let leftArm = document.createElement('img')
    leftArm.setAttribute('src','Images/braco_esquerdo.png')
    leftArm.style.width = `1.8%`
    stand.appendChild(leftArm)

    leftArm.style.position = `absolute`
    leftArm.style.display = `inline`
    leftArm.style.left = `15%`
    leftArm.style.top = `39%`
}

function rightLeg(){
    let rightLeg = document.createElement('img')
    rightLeg.setAttribute('src','Images/perna_direita.png')
    rightLeg.style.width = `1.5%`
    stand.appendChild(rightLeg)

    rightLeg.style.position = `absolute`
    rightLeg.style.display = `inline`
    rightLeg.style.left = `16.5%`
    rightLeg.style.top = `47%`
}

function leftLeg(){
    let leftLeg = document.createElement('img')
    leftLeg.setAttribute('src','Images/perna_esquerda.png')
    leftLeg.style.width = `1.5%`
    stand.appendChild(leftLeg)

    leftLeg.style.position = `absolute`
    leftLeg.style.display = `inline`
    leftLeg.style.left = `15.2%`
    leftLeg.style.top = `47%`
}