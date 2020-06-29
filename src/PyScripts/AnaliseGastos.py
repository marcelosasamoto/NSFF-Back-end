import json, sys

jsonparse = json.loads(sys.argv[1])

totalspent = 0 # Total de gastos
totalbadspent = 0 # Total de gastos ruins, entretenimento
totalwellspent = 0 # Total de gastos bons, despesas e investimentos
totaldeposited = 0 # Total depositado
analysisresult = '' # String para armazenar o resultado na análise

for transacao in jsonparse['transacoes']: # Depósitos não possuem categoria, e são calculados antes dos saques/transferências
  if transacao['tipo'] == "deposito":
    totaldeposited -= transacao['valor']
  else:
    if transacao['categoria'] == "entretenimento": # As Categorias são: Entretenimento (gasto ruim), Investimento (gasto bom), Despesa (gasto bom)
      totalbadspent -= transacao['valor']
    elif transacao['categoria'] == "none":
      pass
    else:
      totalwellspent -= transacao['valor']
    
totalspent = totalbadspent + totalwellspent # Soma total de gastos
grandtotal = totaldeposited - totalspent # Valor total movimentado na conta neste período

# Esta parte abaixo é a análise geral de como foi a movimentação total da conta no período atual, se foi positiva, negativa ou neutra(balanceada).
# Visa dar uma visão de cima do balanço depósito vs gasto para o usuário, procurando guia-lo em direção a movimentação positiva, com mais depósitos que gastos.

if grandtotal > 0: 
  analysisresult = 'Suas ações na sua conta tem sido positivas! você depositou R$'+str(grandtotal)+' a mais do que gastou!'
elif grandtotal == 0:
  analysisresult = 'Suas ações na sua conta tem sido neutras, você balanceou os gastos, porém, a ausência de atividade não gera lucro nem avanço. Tente um resultado positivo na próxima análise!'
else:
  grandtotal *= -1
  analysisresult = 'Suas ações na sua conta tem sido negativas, você gastou R$'+str(grandtotal)+' a mais do que depositou! Tente um resultado positivo na próxima análise!'

# A parte a seguir é a análise específica dos gastos realizados da conta no período atual, que procura mostrar se os gastos que o usuário realizou foram bons ou ruins.
# Gastos bons sendo coisas essenciais ou que podem trazer retorno, como despesas e investimentos, e gastos ruins sendo coisas não-essenciais como entretenimento.
# Como o entretenimento é algo que está altamente presente, e apesar de não ser essencial, é bom o ter.
# Por isso, o algoritmo visa alertar o usuário apenas em situações onde o gasto com entretenimento é excessivo, ou seja, apenas caso o total de gastos bons for igual ou menor a 25% dos gastos ruins.
# Caso não tenha acontecido movimentação na conta, o algoritmo avisará o usuário.
print(analysisresult+'\n')
if totalwellspent > totalbadspent*0.75 and grandtotal > 0:
  print('Você teve bons gastos(despesas e investimentos)! Você teve R$'+str(totalwellspent)+' em bons gastos recentemente!')
elif totalwellspent <= totalbadspent*0.75 and grandtotal > 0:
  print('Você está em um mau caminho! Mais de 25% dos seus gastos são ruins! Você gastou R$'+str((totalspent-totalwellspent))+' a mais com coisas não-importantes do que com coisas importantes/depósitos!')
elif grandtotal == 0:
  print('Você não movimentou sua conta recentemente!')

