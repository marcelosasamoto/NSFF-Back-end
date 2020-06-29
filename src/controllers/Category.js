const mongoose = require("mongoose");
const User = mongoose.model("User");
const axios = require('axios');
const UserController = require("./UserController");
require('dotenv/config');

module.exports = {
    
    async dicas (req, res) {
      User.findById(req.params.id)
      .then(u=>{
        if (u.card.length == 1){
          axios.get(process.env.BANK_API.concat(u.card[0].idbank))
          .then(s=>{
            var transacao = {transacoes:s.data.transacao}
            //console.log(JSON.stringify(transacao))
            //console.log(12331321,transacao)
            var spawn = require("child_process").spawn; 
            const Pyprocess = spawn('python',["./src/PyScripts/SistemaEspecialista.py",JSON.stringify(transacao)]); 
          
            Pyprocess.stdout.on('data', function(data) {
                //console.log(data.toString())
                res.send(data.toString())
            })
          })
          .catch(err=>{
            console.log('err server bankapi')
            res.sendStatus(400)
          })
          
        }
        
      })
      
    },
    
    async extrato(req, res){
      
      if (req.params.id){
        User.findById(req.params.id)
        .then(resp =>{
          
          for (i=0;i<resp.card.length;i++){
            axios.get(process.env.BANK_API.concat(resp.card[i].idbank))
            .then(response => {
              let {transacao} = response.data;
              return res.json(transacao)
            })
            .catch(error => {
              console.log('121');
              return res.status(404)
            });
          }
        });
      }
    },
    async analise(req,res){
      
      User.findById(req.params.id)
      .then(u=>{
        if (u.card.length == 1){
          axios.get(process.env.BANK_API.concat(u.card[0].idbank))
          .then(s=>{
            var transacao = {transacoes:s.data.transacao}
            //console.log(JSON.stringify(transacao))
            //console.log(12331321,transacao)
            var spawn = require("child_process").spawn; 
            const Pyprocess = spawn('python',["./src/PyScripts/AnaliseGastos.py",JSON.stringify(transacao)]); 
          
            Pyprocess.stdout.on('data', function(data) {
                //console.log(data.toString())
                res.json({message:data.toString()})
            })
          })
          .catch(err=>{
            console.log('err server bankapi')
            res.sendStatus(400)
          })
          
        }
        
      })
      
    },
    
    async analise_array(req,res){
      var transacoes = req.body
      var total=0
      var status =''
      for(var i=0;i<transacoes.length;i++){
        console.log(transacoes[i].valor)
        total +=transacoes[i].valor
      }
      if (total > 0){
        status ='positivo'
      }else if(total == 0){
        status ='zero'
      }else[
        status = 'negativo'
      ]
      return res.json({performace:total,status:status})


    },
    async saldo(req,res){
      
      
      User.findById(req.params.id)
      .then(resp =>{
        let saldo=0
        for (i in resp.card){
          axios.get(process.env.BANK_API.concat(resp.card[i].idbank))
          .then(response => {
            let {transacao} = response.data
            for (j in transacao){
              saldo+= transacao[j].valor
            }
            return res.json({saldo:saldo})
          })
          .catch(error => {
            console.log('121');
            return res.status(404)
          });
        }
      });
    }
    
    

      
      
      

};




