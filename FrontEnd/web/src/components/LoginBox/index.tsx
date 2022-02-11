import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useEffect } from 'react'
import { api } from '../../services/api'

type AuthRes = {
    token: string
    user: {
        id: string
        avatar_url: string
        name: string
        login: string
    }
}

function LoginBox() {

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=84ce38dfe481c5543a89`

    async function singIn(githubCode: string) {
        const res = await api.post<AuthRes>('authenticate', {
            code: githubCode
        })

        const { token, user } = res.data

        localStorage.setItem('@dowhile:token', token)

        console.log(user)
    }

    useEffect(() => {
        const url = window.location.href
        const hasGithubCode = url.includes('?code=')

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')

            window.history.pushState({}, '', urlWithoutCode)
            singIn(githubCode)
        }
    }, [])
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