const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const authConfig = require('../config/auth');
module.exports = {
    async Login(req, res) {
        const { email, password } = req.body;
        await User.findOne({
            email: email
        }).then (function(user) {
            if(!user) {
                res.json("Email não encontrado");
            }else {
                bcrypt.compare(password,user.password, function(err, result){
                    if (result == true){
                        res.json({
                                _id: user._id,
                                name: user.name,
                                token: jwt.sign({ _id:user._id }, authConfig.secret, {
                                    expiresIn: authConfig.expiresIn
                            })
                        });
                    } else{
                        res.json({message: 'Senha invalida'});
                    }
                });
            }
        });
        
    },
};