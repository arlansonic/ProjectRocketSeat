import axios from "axios"
import prismaClient from '../prisma/index'

/**
 * Receber o Code(String) * (x)
 * Recuperar informações no GitHub (x)
 * Recuperar o Acces_Token no Github (x)
 * Verificar se o usuario existe no DB (x)
 * ----- SIM = Gera um Token (x)
 * ----- NÃO = Cria no DB, gera um Token (x)
 * Retornar o Token com as informações do user logado
 */

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
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

        const res = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })
        // Checar se tem usuarios no Banco de Dados
        const { login, id, avatar_url, name } = res.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })
        // Se não existir criar o usuário
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        return res.data
    }
}

export { AuthenticateUserService }