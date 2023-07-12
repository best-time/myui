import {createApp} from 'vue'
import Message from './functional.vue'


const messageIntance = createApp(Message)
const messageNode = document.createElement('div')
document.body.appendChild(messageNode)
messageIntance.mount(messageNode)


// export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message, type, timeout= 2) => {

    const inst = messageIntance._instance
    if (inst.proxy) {
        inst.proxy.show(message, type)
    }
    setTimeout(() => {
        if (inst.proxy) {
            inst.proxy.hide()
        }
    }, timeout * 1000)

}

export default createMessage
