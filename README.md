# FullStackWebNodeJS
.Net Old School with Node and Mongo

Algumas considerações do projeto:

1 - Aplicação esta separada em duas pastas Static e App um definição de "UI" e "Backend" respectivamente.
2 - Dentro da pasta "App" criei subpastas para tentar organizar as responsabilidades e evitar acoplamento.
3 - A subpasta DB tem com responsabilidade junto com o padrão "Repository" abstrair o conhecimento da fonte de dados(repositório) da(s) classe(s) de negócio.
4 - criei subpastas para deixar as views, models e contents bem separados.
5 - Criei o conceito de controller para abstrair da classe server.js as necessidades distintas de cada necessidade.
6 - Criei os models como parte do exercicio mas não utilizei.
7 - Temos apenas duas funcionalidades funcionando a de obter todos e listar na grid utilizando o módulo "Mustache" e o cadastro de novas as outras funcinalidades
 é preciso apenas a justar o metodos na classe business.
