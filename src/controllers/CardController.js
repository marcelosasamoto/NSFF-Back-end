const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {


    async addCard(req, res) {
        const { card } = await User.findById(req.params.id);
        for (i in card){
            if (card[i].number == req.body.card.number){
                return res.json({message:"Cartão já está em uso"})
            }   //TALVEZ SENHA NECESSARIO COMPARAR O card.name PARA VERIFICAR SE PODE SER DE OUTRO BANCO
        }       
        const user = await User.findByIdAndUpdate(req.params.id,  
            { $push: { card: req.body.card } } , { new: true});
        return res.json(user );
    
        
        
        
    },
    async updateCard(req,res){
            try {
                await User.findOne({_id: req.params.id})
                .then (async function(usr){
                    for (i in usr.card){
                        if (usr.card[i].number == req.body.card.number){
                            return res.json({message:"Cartão já está em uso"})
                        }   //TALVEZ SENHA NECESSARIO COMPARAR O card.name PARA VERIFICAR SE PODE SER DE OUTRO BANCO
                    }  
                    await User.findOneAndUpdate({'_id': req.params.id,"card._id":req.body.card._id}, 
                        {'$set': {
                            'card.$': req.body.card
                        }},{ new: true})
                        .then (function(user){
                            return res.json(user.card)
                        })
                })
            } catch (err){
                console.log("erro update")
                res.json({error: 'erro updateCard'})
            }
    },
    async deletecard(req, res) {

        try {
            await User.findOne({_id: req.params.id})
                .then (async function(usr){
                    for (i in usr.card){
                        if (usr.card[i].number == req.body.card.number){
                            return res.json({message:"Cartão já está em uso"})
                        }   //TALVEZ SENHA NECESSARIO COMPARAR O card.name PARA VERIFICAR SE PODE SER DE OUTRO BANCO
                    }  
                    await User.findOneAndUpdate(
                        {'_id': req.params.id}, 
                        {'$pull': { 'card': {'_id':req.body.card._id}
                        }},{ new: true})
                        .then (function(card){
                            res.json(card)
                            
                        })
                        .catch (function(err){
                            res.json({error: "error"})
                        })
                })
        } catch (err){
            console.log(err)
            res.json({error: "error deleteCard"})
        }
        

    },
    
    async showcard (req, res) {
        await User.findById(req.params.id)
        .then (function(user){
            return res.json(user.card);
        })
        .catch (function(err){
            res.json({erro: "Sem cartao"})
        })
    }

};
