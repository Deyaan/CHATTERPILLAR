const socket = io()

let name;

let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message__area')


do {
    name = prompt('Enter Your Name: ')
} while (!name)


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    //append
    appendmessage(msg, 'outgoing')
    textarea.value = ''
    scrolltobottom()

    //send to server
    socket.emit('message', msg)

}
function appendmessage(msg, type) {

    let mainDiv = document.createElement('div')

    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


socket.on('message', (msg) => {
    appendmessage(msg, 'incoming')
    scrolltobottom()
  

})


function scrolltobottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


