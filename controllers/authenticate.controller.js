const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const RefreshToken = require('../models/authenticate.model');

// TODO move to class folder
class Credential {
    constructor(token) {
        this.token = token;
        this.username = this.username();
        this.expires = this.expires();
    }

    username() {
        return this.decodeToken(this.token).username;
    }

    expires() {
        return this.decodeToken(this.token).exp;
    }

    decodeToken(token) {
        return jwt.decode(token);
    }
}

const authenticate = async (req, res) => {
    const { password } = req.body;
    const user = await res.user;

    if (!user) res.status(400).send('bad request');

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = new Credential(generateAccessToken({ username: user.username }));
            const refreshToken = generateRefreshToken({ username : user.username });
            res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
            res.json(accessToken);
        } else {
            res.status(400).send('Invalid Password');
        }
    } catch(ex) {
        res.status(500).send(ex);
    }
};

const removeAuthentication = async (req, res) => {    
    try {
        const { refreshToken } = res;
        if (!refreshToken) res.status(404).send();
        
        await refreshToken.remove();
        res.status(204).send();
    }
    catch (ex) {
        res.status(500).send('Can not log user out');
    }
}

const newAuthTokenFromRefreshToken = async (req, res) => {
        const { refreshToken } = res;
        if (!refreshToken) return res.sendStatus(403);
        
        try {
            jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
              if (err) return res.sendStatus(403);
              const accessToken = new Credential(generateAccessToken({ username: user.username }));
              res.json(accessToken);
            });
        }

        catch(ex) {
            res.status(500).send(ex);
        }
}

const getRefreshTokenFromDb = async (req, res, next) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) res.sendStatus(403);

    try {
        const token = await RefreshToken.findOne({ token: refreshToken });
        res.refreshToken = token;
        next();
    }
    catch (ex) {
        res.send(500).send(ex);
    } 
} 

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (ex) {
        res.status(500).json({message: ex});
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s'}); // TODO: set expire time in env
}

const generateRefreshToken = (user) => {
    const newToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    try {
        let newRefresh = new RefreshToken({ username: user.username, token: newToken });
        newRefresh.save();
        return newToken;
    }     
    catch (ex) {
        
    }
}

module.exports = {
    authenticate,
    authenticateToken,
    getRefreshTokenFromDb,
    newAuthTokenFromRefreshToken,
    removeAuthentication
}