//Importar a biblioteca json-server
const jsonServer = require('json-server');

// Criar um instancia do servidor JsonServer 
//Essa instancia é usada para criar e configurar o servidor
const server = jsonServer.create();

//Criar um roteador com o arquivo db.json 
//O roteador define as rotas do servidor. Ele utiliza um arquivo JSON para gerar a rota.
const router = jsonServer.router('db.json');

//Funções que são executadas em cada requisição feita com o servidor
//Importa os padrões JsonServer
const middlewares = jsonServer.defaults();
//Importar o módulo express
const express = require('express')();

//Importar o módulo HTTP e atribuindo a constante do express e criando um servidor
const http = require('http').createServer(express);

//Importar o socket.io e colocando o http como parâmetro
const io = require('socket.io')(http);

//Importa o módulo express
const app = require('express');
//Criando variavel instancia do express

express.use(app.static('public'));


//Rota para página inicial
express.get('/', (req, res) => res.sendFile(__dirname + '/public/chatOnline.html'));

//Evento para o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log("Usuário conectado")
    socket.on('preenche id', (infos) => {
        infos.id = socket.id
        io.emit('preenche id', infos)
    });
    //Evento para quando o usuario enviar uma mensagem via socket.io
    socket.on('chat message', (dados) => io.emit('chat message', dados));
    socket.on('enviaFoto', (pessoa) => {
        io.emit('enviaFoto', pessoa)});
    //aqui é onde o socket.emit verifica o que deve fazer com a função que foi chamada e com o parâmetro (dados) que foi emitido
    socket.on('card', (dados) => {
        dados.id = socket.id;
        io.emit('card', dados)
    });

    //Evento para quando o usuário se desconectar
    socket.on('disconnect', () => console.log("Usuário desconectado"));
})

//Iniciar o servidor na porta 3000
http.listen(3000, () => {
    console.log("Servidor iniciado: http://localhost:3000");
})
//Funções que são executadas em cada requisição feita com o servidor
server.use(middlewares);

//Define a porta em que o servidor irá rodar
const porta = 3000;

//Usa o roteador criado
server.use(router);

//Importa o módulo express
const express = require('express');

//Criando variavel instancia do express
const app = express();

//Configura o servidor para usar
app.use(express.static('public'));

//Defini a rota principal
//Enviando o arquivo index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
})

//Inicia o servidor na porta definida e exibe uma mensagem no console
server.listen(porta, () => {
    console.log(`JSON SERVER está rodando em http://localhost:${porta}`);
})
