import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

function LoginBox() {   
    const { signInUrl, user } = useContext(AuthContext)
    console.log(user)
    return (
        <div className={styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.singInWithGithub}>
                <VscGithubInverted size='24' />
                Entrar com GitHub
            </a>
        </div>
    )
}

export { LoginBox }