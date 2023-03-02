import { Request, Response } from "express";
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv'

dotenv.config()


const spApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.NEXTAUTH_URL
})



export const login = async (req: Request, res: Response) => {
    const { code } = req.body
    // console.log(code);

    if (!code) {
        res.sendStatus(400)
        return
    }
    spApi.authorizationCodeGrant(code).then(data => {
        res.send({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(err => {
        res.status(400).send(err)
    })
}

export const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body
    await spApi.setRefreshToken(refreshToken)
    spApi.refreshAccessToken().then(data => {
        res.send({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
            refreshToken: data.body.refresh_token ? data.body.refresh_token : refreshToken
        })
    }).catch(err => {
        res.status(400).send(err)
    })
}