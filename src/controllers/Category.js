const mongoose = require("mongoose");
const User = mongoose.model("User");
const axios = require('axios');
require('dotenv/config');

module.exports = {
    
    async category (req, res) {
        
      res.json({message: "Precisa da API do OPENBANK"})
        
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
        .then(resp =>{
          axios.get('http://localhost:3200/api/user/'.concat(resp.card[0].idbank))
          .then(response => {
            var transacoes = response.data.transacao
            console.log(3333,transacoes)

            //inicio da analise
            var totalspent = 0 //Total de gastos
            var totalbadspent = 0 // Total de gastos ruins, entretenimento
            var totalwellspent = 0 // Total de gastos bons, despesas e investimentos
            var totaldeposited = 0 // Total depositado
            var analysisresult = '' // String para armazenar o resultado na análise
            for (transacao in transacoes){ // Depósitos não possuem categoria, e são calculados antes dos saques/transferências
              console.log('tran',transacoes[transacao])
              if (transacoes[transacao].tipo == "Deposito" || transacoes[transacao].tipo == "Transferencia"){
                if (transacoes[transacao].tipo == "saque" && transacoes[transacao].valor <0)  {
                  totaldeposited += transacoes[transacao].valor//transacao['valor']
                }
                else if (transacoes[transacao].tipo == "saque" && transacoes[transacao].valor >=0 || transacoes[transacao].tipo == "Deposito" && transacoes[transacao].valor <0)  {
                  
                }
                else{
                  totaldeposited += transacoes[transacao].valor//transacao['valor']
                }
              } else {
                    if (transacoes[transacao].categoria == "entretenimento"){ // As Categorias são: Entretenimento (gasto ruim), Investimento (gasto bom), Despesa (gasto bom)
                      totalbadspent += transacoes[transacao].valor//transacao['valor']
                    } else if (transacoes[transacao].categoria == "entreterimento"){
                    }
                    else{
                      totalwellspent += transacoes[transacao].valor
                    }
                }
            }
            
            var totalspent = totalbadspent + totalwellspent // Soma total de gastos
            var grandtotal = totaldeposited - totalspent // Valor total movimentado na conta neste período
            
            // Esta parte abaixo é a análise geral de como foi a movimentação total da conta no período atual, se foi positiva, negativa ou neutra(balanceada).
            // Visa dar uma visão de cima do balanço depósito vs gasto para o usuário, procurando guia-lo em direção a movimentação positiva, com mais depósitos que gastos.
            var performace
            if (grandtotal > 0){ 
              analysisresult = 'Suas ações na sua conta tem sido positivas! você depositou R$'+(grandtotal)+' a mais do que gastou!'
              performance = ['positivo',grandtotal]
            } else if ( grandtotal == 0){
              performance = ['neutro',0]
              analysisresult = 'Suas ações na sua conta tem sido neutras, você balanceou os gastos, porém, a ausência de atividade não gera lucro nem avanço. Tente um resultado positivo na próxima análise!'
            }else{
              grandtotal *= -1
              performance = ['negativo',grandtotal]
              analysisresult = 'Suas ações na sua conta tem sido negativas, você sacou R$'+(grandtotal)+' a mais do que depositou! Tente um resultado positivo na próxima análise!'
            }
            
            // A parte a seguir é a análise específica dos gastos realizados da conta no período atual, que procura mostrar se os gastos que o usuário realizou foram bons ou ruins.
            // Gastos bons sendo coisas essenciais ou que podem trazer retorno, como despesas e investimentos, e gastos ruins sendo coisas não-essenciais como entretenimento.
            //Como o entretenimento é algo que está altamente presente, e apesar de não ser essencial, é bom o ter.
            // Por isso, o algoritmo visa alertar o usuário apenas em situações onde o gasto com entretenimento é excessivo, ou seja, apenas caso o total de gastos bons for igual ou menor a 25% dos gastos ruins.
            // Caso não tenha acontecido movimentação na conta, o algoritmo avisará o usuário.
            var status
            if (totalwellspent > totalbadspent*0.25 && grandtotal > 0){
              status = 'Parabéns, você teve bons gastos(despesas e investimentos)! Você teve R$'+(totalwellspent)+' em bons gastos recentemente!'
            } else if (totalwellspent <= totalbadspent*0.25 && grandtotal > 0){
              status = 'Você está em um mau caminho! Mais de 25% dos seus gastos são ruins! Você gastou R$'+((totalspent-totalwellspent))+' a mais com coisas não-importantes do que com coisas importantes/depósitos!'
            }else if (grandtotal == 0) {
              status = 'Você não movimentou sua conta recentemente!'
              
            }
            console.log(status,analysisresult)
            return res.json({message: [status,analysisresult],performace:performance})
            //fim da analise

          })
          .catch(error => {
            console.log('analise err',error);
          });
        });
      
    },
    
    async analise_array(req,res){
      var transacoes = req.body
      var totalspent = 0 //Total de gastos
      var totalbadspent = 0 // Total de gastos ruins, entretenimento
      var totalwellspent = 0 // Total de gastos bons, despesas e investimentos
      var totaldeposited = 0 // Total depositado
      var analysisresult = '' // String para armazenar o resultado na análise
      for (transacao in transacoes){ // Depósitos não possuem categoria, e são calculados antes dos saques/transferências

        if (transacoes[transacao].tipo == "Deposito" || transacoes[transacao].tipo == "Transferencia" || transacoes[transacao].tipo == "saque"){
          if (transacoes[transacao].tipo == "saque" && transacoes[transacao].valor <0)  {
            totaldeposited += transacoes[transacao].valor//transacao['valor']
          }
          else if (transacoes[transacao].tipo == "saque" && transacoes[transacao].valor >=0 || transacoes[transacao].tipo == "Deposito" && transacoes[transacao].valor <0)  {
            
          }
          else{
            totaldeposited += transacoes[transacao].valor//transacao['valor']
          }
        } else {
              if (transacoes[transacao].categoria == "entretenimento"){ // As Categorias são: Entretenimento (gasto ruim), Investimento (gasto bom), Despesa (gasto bom)
                totalbadspent += transacoes[transacao].valor//transacao['valor']
              } else if (transacoes[transacao].categoria == "entreterimento"){
              }
              else{
                totalwellspent += transacoes[transacao].valor
              }
          }
      }
      var totalspent = totalbadspent + totalwellspent // Soma total de gastos
      var grandtotal = totaldeposited - totalspent // Valor total movimentado na conta neste período
      var performace
      if (grandtotal > 0){ 
        analysisresult = 'Suas ações na sua conta tem sido positivas! você depositou R$'+(grandtotal)+' a mais do que gastou!'
        performance = ['positivo',grandtotal]
      } else if ( grandtotal == 0){
        performance = ['neutro',0]
        analysisresult = 'Suas ações na sua conta tem sido neutras, você balanceou os gastos, porém, a ausência de atividade não gera lucro nem avanço. Tente um resultado positivo na próxima análise!'
      }else{
        grandtotal *= -1
        performance = ['negativo',grandtotal]
        analysisresult = 'Suas ações na sua conta tem sido negativas, você sacou R$'+(grandtotal)+' a mais do que depositou! Tente um resultado positivo na próxima análise!'
      }
      var status
      if (totalwellspent > totalbadspent*0.25 && grandtotal > 0){
        status = 'Parabéns, você teve bons gastos(despesas e investimentos)! Você teve R$'+(totalwellspent)+' em bons gastos recentemente!'
      } else if (totalwellspent <= totalbadspent*0.25 && grandtotal > 0){
        status = 'Você está em um mau caminho! Mais de 25% dos seus gastos são ruins! Você gastou R$'+((totalspent-totalwellspent))+' a mais com coisas não-importantes do que com coisas importantes/depósitos!'
      }else if (grandtotal == 0) {
        status = 'Você não movimentou sua conta recentemente!'
        
      }
      return res.json({performace:performance})


    }
    

      
      
      

};




