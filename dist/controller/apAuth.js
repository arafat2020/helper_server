"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = void 0;
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const spApi = new spotify_web_api_node_1.default({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    redirectUri: process.env.NEXTAUTH_URL
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    // console.log(code);
    if (!code) {
        res.sendStatus(400);
        return;
    }
    spApi.authorizationCodeGrant(code).then(data => {
        res.send({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in * 1000 + Date.now(),
        });
    }).catch(err => {
        res.status(400).send(err);
    });
});
exports.login = login;
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    yield spApi.setRefreshToken(refreshToken);
    spApi.refreshAccessToken().then(data => {
        res.send({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in * 1000 + Date.now(),
            refreshToken: data.body.refresh_token ? data.body.refresh_token : refreshToken
        });
    }).catch(err => {
        res.status(400).send(err);
    });
});
exports.refresh = refresh;
//# sourceMappingURL=apAuth.js.map