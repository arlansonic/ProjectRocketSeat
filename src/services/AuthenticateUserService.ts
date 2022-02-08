import axios from "axios"

/**
 * Receber o Code(String) * 
 * Recuperar informações no GitHub
 * Recuperar o Acces_Token no Github
 * Verificar se o usuario existe no DB
 * ----- SIM = Gera um Token
 * ----- NÃO = Cria no DB, gera um Token
 * Retornar o Token com as informações do user logado
 */

interface IAccessTokenResponse {
    access_token: string
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token"

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                Accept: "application/json"
            }
        })

        const res = await axios.get("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })
        return res.data
    }
}

export { AuthenticateUserService }