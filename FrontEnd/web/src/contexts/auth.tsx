import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
    id: string
    name: string
    login: string
    avatar_url: string
}

type AuthContextData = {
    user: User | null
    signInUrl: string
    singOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
    children: ReactNode
}

type AuthRes = {
    token: string
    user: {
        id: string
        avatar_url: string
        name: string
        login: string
    }
}

export function AuthProvider(props: AuthProvider) {

    const [user, setUser] = useState<User | null>(null)

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=84ce38dfe481c5543a89`

    async function singIn(githubCode: string) {
        const res = await api.post<AuthRes>('authenticate', {
            code: githubCode
        })

        const { token, user } = res.data

        localStorage.setItem('@dowhile:token', token)

        setUser(user)
    }

    function singOut(){
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@downline:token')

        if(token){

            api.defaults.headers.common.authorization = `Bearer ${token}`
            api.get<User>('profile').then(res => {
                setUser(res.data)
            })
        }
    })

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
        <AuthContext.Provider value={{ signInUrl, user, singOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}

