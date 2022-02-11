import styles from './styles.module.scss'

function LoginBox() {
    return (
        <div className={styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href="$" className={styles.singInWithGithub}>
                Entrar com GitHub
            </a>
        </div>
    )
}

export { LoginBox }