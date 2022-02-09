import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const autoToken = req.headers.authorization

    if (!autoToken) {
        return res.status(401).json({
            errorCode: "Token.Invalid",
        })
    }
    // [0] Bearer
    // [1] 123123sdasd1d1
    const [, token] = autoToken.split(" ")

    try {
        // Pegar Id do usuário 
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
        
        req.user_id = sub
        // Repassar o Middleware pra Frente
        return next()

    } catch (err) {
        return res.status(401).json({ errorCode: "token.expired" })
    }
}