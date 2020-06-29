import json, random, sys

jsonparse = json.loads(sys.argv[1])

transacoes = {}
totalempresas = {}

totaldepositado = 0
ndepositos = 0

totalentretenimento = 0
nentretenimento = 0

totalinvestimento = 0
ninvestimento = 0

totaldespesas = 0
ndespesas = 0

for transacao in jsonparse['transacoes']:
  transacoes[transacao['descricao']] = {"valor" : transacao['valor'], "categoria" : transacao['categoria'], "tipo" : transacao['tipo']}
  
  if transacao['tipo'] != 'deposito':
    if transacao['descricao'] in totalempresas:
      if transacao['valor'] < 0:
        totalempresas[transacao['descricao']]["valor"] += transacao['valor']*-1
        totalempresas[transacao['descricao']]["pagamentos"] += 1
    else:
      totalempresas[transacao['descricao']] = {"valor" : (transacao['valor']*-1), "pagamentos" : 1}

  if transacao['tipo'] == "deposito":
    ndepositos += 1
    totaldepositado += transacao['valor']
  else:
    if transacao['categoria'] == "entretenimento":
      nentretenimento += 1
      totalentretenimento -= transacao['valor']

    elif transacao['categoria'] == "investimento":
      ninvestimento += 1
      totalinvestimento -= transacao['valor']

    elif transacao['categoria'] == "despesas":
      ndespesas += 1
      totaldespesas -= transacao['valor']

grandtotal = totalentretenimento + totalinvestimento + totaldespesas
ntotal = nentretenimento + ninvestimento + ndespesas

depositado = ''
divisao = ''
dica = ''

if totaldepositado == 0:
  depositado = 'Você não depositou nada neste período!'
else:
  depositado = 'Você depositou '+str(ndepositos)+' vezes neste período! tendo depositado um total de '+str(totaldepositado)+' com média de R$'+str(totaldepositado/ndepositos)+' por depósito!'

if grandtotal == 0:
  divisao = 'Você não gastou nada neste período!'
else:
  divisao = 'Você gastou um total de R$'+str(grandtotal)+' neste período! Com um total de '+str(ntotal)+' transações, '
  divisao += 'sendo:\n'+str(nentretenimento)+' em entretenimento, compondo '+str(round(totalentretenimento/grandtotal*100))+'% do total gasto, com um total de R$'
  if nentretenimento != 0:
    divisao += str(totalentretenimento)+'\n'
  else:
    divisao += "0\n"
  divisao += str(ninvestimento)+' em investimentos, compondo '+str(round(totalinvestimento/grandtotal*100))+'% do total gasto, total de R$'
  if ninvestimento != 0:
    divisao += str(totalinvestimento)+'\n'
  else:
    divisao += "0\n"
  divisao += str(ndespesas)+' em despesas, compondo '+str(round(totaldespesas/grandtotal*100))+'% do total gasto, total de R$'
  if ndespesas != 0:
    divisao += str(totaldespesas)+'\n\n'
  else:
    divisao += "0\n"
  divisao += 'Suas transações foram centradas nas seguintes empresas/despesas:\n'
  for name in totalempresas:
    divisao += name+' - '+str(totalempresas[name]["pagamentos"])+' Pagamento(s) total de R$'+str(totalempresas[name]["valor"])+'\n'

flags = {}

if grandtotal > totaldepositado:
  flags["1"] = {"status" : True, "comment" : "none"}

if totalentretenimento > (totalinvestimento + totaldespesas):
  flags["2"] = {"status" : True, "comment" : "none"}

for ts in transacoes:
  if transacoes[ts]["categoria"] == "entretenimento" and transacoes[ts]["valor"] > 5000:
    flags["3"] = {"status" : True, "comment" : transacoes[ts]["valor"]}
    break
  if transacoes[ts]["categoria"] == "investimento" and transacoes[ts]["valor"] > 50000:
    flags["4"] = {"status" : True, "comment" : ts}
    break

for name in totalempresas:
  if totalempresas[name]["valor"] > 5000:
    flags["5"] = {"status" : True, "comment" : name}
    break

choice = random.randint(1, 5)
if choice == 1:
    if "1" in flags:
        dica1 = 'Uma dica para lhe guiar melhor seria: Você gastou mais do que depositou! Evite este tipo de prática ou poderá acabar endividado/com saldo negativo!'
        dica = dica1
        choose = False
elif choice == 2:
    if "2" in flags:
        dica2 = 'Uma dica para lhe guiar melhor seria: Você gastou mais com entretenimento do que com investimentos e despesas! Maus hábitos levam a más situações!'
        dica = dica2
        choose = False
elif choice == 3:
    if "3" in flags:
        dica3 = 'Uma dica para lhe guiar melhor seria:  Você gastou demais com entretenimento! com um total de R$'+str(flags["3"]["comment"])+' gastos! Tente gastar menos no próximo período!'
        dica = dica3
        choose = False
elif choice == 4:
    if "4" in flags:
        dica4 = 'Uma dica para lhe guiar melhor seria:  Você investiu demais no '+flags["4"]["comment"]+', tente distribuir mais seus investimentos, para evitar perder muito de uma vez caso falhe!'
        dica = dica4
        choose = False
elif choice == 5:
    if "5" in flags:
        dica5 = 'Uma dica para lhe guiar melhor seria:  Você gastou demais com '+flags["5"]["comment"]+'! tente diminuir seus gastos neste estabelecimento!'
        dica = dica5
        choose = False

if dica == '':
  dica = 'Você parece estar indo bem! caso continuar assim não precisará de dicas!'

resultado = 'Visão geral:\n\n'+depositado+'\n'+divisao+'\n\n'+dica


print('Depositado: {}\n'.format(depositado))
print('Visão geral: {}\n'.format(divisao))
print('Dica: {}\n'.format(dica))