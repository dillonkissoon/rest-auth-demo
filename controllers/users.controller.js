const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const authUtil = require('../common/auth.util');

const register = async (req, res) => {
    const { username, password } = req.body;
    const user = await res.user;

    if (user)  res.status(400).send('Bad Request');

    try {
        const hashPassword = await authUtil.hashPassword(password, 10);
        let newUser = new User({username: username, password: hashPassword});
        await newUser.save();
        res.status(201).send('User Created');
    } catch (ex) {
        res.status(500).send({message: ex});
    }
}

const getUser = async (req, res, next) => {    
    const { username } = req.body;

    try {
        const user = await User.findOne({ username: username });        
        res.user = user ? user : null;
        next();
    } 
    
    catch (ex) {
        res.status(500).send({message: ex})
    }
};

const findUserById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({message: 'user not found'})
        } 

        res.json({ username: user.username });
    } 
    catch (ex) {
        res.status(500).json({message: ex});
    }
};

module.exports = {
    register, 
    getUser,
    findUserById
}