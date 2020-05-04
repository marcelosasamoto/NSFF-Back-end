const mongoose = require("mongoose");
const User = mongoose.model("User");


let apizinha = {
    "resultado": {
    "saldo": 1000,
    "transacoes": [
      {
        "tipo": "DEBITO",
        "valor": 960,
        "data": "2020-04-27T08:01:53.676Z",
        "dataLote": "2020-04-27",
        "descricao": "string",
        "numeroDocumento": "string",
        "cpfCnpj": "string"
      }
    ]
  },
    "category": "Investimento"
    
}
module.exports = {
    
    async category (req, res) {
        
        res.json({message: "Precisa da API do OPENBANK"})
        
    }
    
    

};




