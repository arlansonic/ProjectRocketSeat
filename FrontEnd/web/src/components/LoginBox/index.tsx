import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'

function LoginBox() {
    return (
        <div className={styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href="$" className={styles.singInWithGithub}>
                <VscGithubInverted size='24'/>
                Entrar com GitHub
            </a>
        </div>
    )
}

export { LoginBox }