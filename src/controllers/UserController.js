const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

const saltRounds = 8;


module.exports = {
    async index(req, res) {
        const user = await User.find();
        return res.json(user);
    },
    async show (req, res) {
        const user = await User.findById(req.params.id);
        //console.log(100, req.params.id,1111,user)
        return res.json(user);
    },

    async store(req, res) {

        const userExist = await User.findOne({email: req.body.email }) //retorna email se existir
        if (userExist){
            return res.status(400).json( {error: 'E-mail já está em uso'}); //retorna que o usuario ja existe
        }
        const { name, email, password } = req.body;
        
        bcrypt.hash(password, saltRounds, function (err,hash){
            const user = User.create({
                name: name,
                email: email,
                password: hash
            }).then(function(data){
                if (data){
                    res.json(data)
                }
            });
        });

    
    },
    async update(req, res) {
        const emailExist = await User.findOne({email: req.body.email }) //retorna email se existir
        if (emailExist){
            console.log(emailExist);
            return res.status(400).json( {error: 'E-mail já está em uso'}); //retorna que o usuario ja existe
        }
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true});
                                                               //req.body atualiza todo o conteudo que estiver no body
        return res.json(user );
    },

    async destroy(req, res) {
        //await User.findByIdAndRemove(req.params.id);
        return res.send()
    },

};
