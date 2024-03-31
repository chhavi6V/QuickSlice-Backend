import { auth } from 'express-oauth2-jwt-bearer';
import User from '../models/user.js';
import jwt from "jsonwebtoken";

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
}); 

export const jwtParse = async(req,res,next) => {
    const {authorization} = req.headers;

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.sendStatus(401);
    }

    //Bearer lshdfIshdjkhvjkshdjkvh34h5k3h54jkh
    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token);
        const auth0Id = decoded.sub;

        const user = await User.findOne({auth0Id});

        if(!user){
            return res.sendStatus(401);
        }

        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}