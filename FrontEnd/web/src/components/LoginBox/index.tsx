import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'

function LoginBox() {

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=84ce38dfe481c5543a89`

    return (
        <div className={styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.singInWithGithub}>
                <VscGithubInverted size='24'/>
                Entrar com GitHub
            </a>
        </div>
    )
}

export { LoginBox }