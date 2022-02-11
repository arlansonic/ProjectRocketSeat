import styles from './styles.module.scss'
import { api } from '../../services/api'
import logoImg from '../../assets/logo.svg'
import { useEffect, useState } from 'react'

type Message = {
    id: string
    text: string
    user: {
        name: string
        avatar_url: string
    }
}

function MessageList() {
    const [messages, setMessages] = useState<Message[]>([])
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