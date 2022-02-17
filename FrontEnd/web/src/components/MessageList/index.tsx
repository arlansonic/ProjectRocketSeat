import styles from './styles.module.scss'
import { api } from '../../services/api'
import logoImg from '../../assets/logo.svg'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'

type Message = {
    id: string
    text: string
    user: {
        name: string
        avatar_url: string
    }
}

const messagesQueue: Message[] = []

// Recebendo as mensagens instantâneas
const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage: Message) => {
    messagesQueue.push(newMessage)
})

function MessageList() {
    const [messages, setMessages] = useState<Message[]>([])

    // Colocando mensagens em Fila

    useEffect(() => {
        const timer = setInterval(()=>{
            if(messagesQueue.length > 0){
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1],
                ].filter(Boolean))

                messagesQueue.shift()
            }
        },3000)
    }, [])

    useEffect(() => {
        // Chamada para API
        api.get('messages/last3').then(res => {
            setMessages(res.data)
        })
    }, [])

    return (
        <div className={styles.MessageListWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {messages.map(messages => {
                    return (
                        <li key={messages.id} className={styles.message}>
                            <p className={styles.messageContent}>{messages.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={messages.user.avatar_url} alt={messages.user.name} />
                                </div>
                                <span>{messages.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export { MessageList }