var socket = io()

const $display = document.getElementById('messages')
const $input = document.getElementById('entertext')
const $btn = document.getElementById('enterbtn')

$btn.addEventListener('click', (e) => {

    e.preventDefault()
    if($input.value == 0) {
        alert('Digite uma mensagem!')
        return
    }

    const message = $input.value

    createNewMessage(message, true)

    socket.emit('chat message', message)
    $input.value = ''
    return false
})

//Socket methods

socket.on('chat message', (msg) => {
    createNewMessage(msg, false)
})

socket.on('user connected', (msg) => catchEventUser(msg))
socket.on('user disconnect', (msg) => catchEventUser(msg))

//Functions

function createNewMessage(msg, mymsg = false) {
    if(mymsg) {
        const p = document.createElement('p')
        p.classList = 'my'
        p.textContent = msg
        $display.appendChild(p)
        return
    }
    const message = document.createElement('p')
    message.textContent = msg
    $display.appendChild(message)
}

function catchEventUser(msg) {

    const $userlog = document.getElementById('userslog')
    const $event = document.getElementById('event')
    $event.innerHTML = `<i style="color: #3498db;" class="fa fa-info-circle" aria-hidden="true"></i> ${msg}`
    $userlog.style.display = 'block'

    window.setTimeout(() => {
        $event.textContent = ''
        $userlog.style.display = 'none'
    }, 5000)
}