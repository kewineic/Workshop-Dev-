/**
 * importando pacote express para a api
 */

const express = require('express')

/**
 * atribuindo funcionalidade ao pacote express dentro de uma variavel
 */

const server = express()

const db = require('./db.js')

/* 
*configurando a renderizaçao de arquivos estaticos com a funçao use() do express
*/ 

server.use(express.static('public'))

/**
 * habilitar a funçao do express require.body(body do SQL)
 */

 server.use(express.urlencoded({ extended: true }))

/**
 * configurando o nunjucks (template enginer) renderizador de html 
 * especificando o diretório dos arquivos que irao ser renderizados em cada rota
 */

 const nunjucks = require('nunjucks')
 nunjucks.configure('views', {
    express: server, 
    noCache: true,
 })

/**
 ** usando a funçao get() para definir as rotas
 ** definindo o envio de uma respostao, response, pra requisiçao, require, do cliente
 ** utlizando a funçao render() do template unjucks para renderizar arquivos na rota
 ** definindo dentro da resposta o arquivo especifico que será renderizado 
 * na rota solicitada, e definindo a regra de negócio para a aplicaçao de ideas
 * na página inicial 
 */

server.get('/', function(require, response){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []
        for(let idea of reverseIdeas) {
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
        
        return response.render("index.html", { ideas: lastIdeas })
    })
})

server.get('/ideias', function(require, response){
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = [...rows].reverse()

        return response.render("ideias.html", { ideas: reverseIdeas })

    })

 })

/**
 * Definindo a rota de envio para o formulario com o metodo post()
 */

server.post('/', function(require, response){
    
    //Inserindo dados na tabela do SQLITE
 
    const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    
    ) VALUES (?,?,?,?,?);`
    
    const values = [
        require.body.image,
        require.body.title,
        require.body.category,
        require.body.description,
        require.body.link,
    ]
    
    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return console.log(err)
        }
    
        return response.redirect('/ideias')
    
    })
    // ------------------------------------------------------------
})

/**
 * atribuindo a porta do servidor com a funçao listen()
 */

server.listen(3000)