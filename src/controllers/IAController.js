const mongoose = require('mongoose');
const User = mongoose.model('User');

const mes = ["Jan", "Fev", "Mar", "Abr", "Mai","Jun", "Jul", "Ago", "Set","Out", "Nov", "Dez"]
const mensal = ['Sem 1','Sem 2','Sem 3','Sem 4']
module.exports = {
    
    async graph (req, res) {
        //console.log(req.body)
        if (req.body.select === 'Anual'){
            let ChartDATA= mes.map(function (w) { return  {x:w,y:Math.floor(Math.random()*10000) }  });
            
            return res.json(ChartDATA);
        }else if (req.body.select === 'Mensal'){
            let ChartDATA= mensal.map(function (w) { return  {x:w,y:Math.floor(Math.random()*1000) }  });
            return res.json(ChartDATA)
        }
        else {
            let ChartDATA= mes.map(function (w) { return  {x:w,y:Math.floor(Math.random()*1000) }  });
            
            return res.json(ChartDATA);
        }
    }
            

    

};
