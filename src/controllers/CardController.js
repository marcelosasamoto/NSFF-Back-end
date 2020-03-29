const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {


    async addCard(req, res) {
        const { card } = await User.findOne();
        for (i in card){
            if (card[i].number == req.body.card.number){
                return res.json({message:"Cartão já está em uso"})
            }   //TALVEZ SENHA NECESSARIO COMPARAR O card.name PARA VERIFICAR SE PODE SER DE OUTRO BANCO
        }       //Somente um cartao pode ser utilizado, ou seja nenhum outro usuario pode vincular
        
        const user = await User.findByIdAndUpdate(req.params.id,  
            { $push: { card: req.body.card } } , { new: true});
        return res.json(user );
        
    },
    async updateCard(req,res){
        const { card } = await User.findOne();
        for (i in card){
            if (card[i].number == req.body.card.number){
                return res.json({message:"Cartão já está em uso"})
            }   //TALVEZ SENHA NECESSARIO COMPARAR O card.name PARA VERIFICAR SE PODE SER DE OUTRO BANCO
        }       //Somente um cartao pode ser utilizado, ou seja nenhum outro usuario pode vincular
        

        const user = await User.updateOne({'card._id': req.body.card._id}, {'$set': {
            'card.$.name': req.body.card.name,
            'card.$.number': req.body.card.number
        }}, { new: true});
        return res.json(req.body);
    
    },
    async deletecard(req, res) {
        const card = User.findOne({'card.number':req.body.card.number},{'card.$':1}, 
            function (err,data) {
                if(data){
                    console.log('exist');
                    return res.json({message:"Cartão já está em uso"})
                }else {
                    return res.json(req.body)
                    console.log('no exist')
                }
            })
    },
    
    async showcard (req, res) {

        const { card } = await User.findOne();
        return res.json(card);
    }

};
