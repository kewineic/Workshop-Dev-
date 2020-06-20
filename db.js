const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db')

db.serialize(function() {


 //Criando tabela no SQLITE
 
    db.run(`CREATE TABLE IF NOT EXISTS ideas(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        image TEXT, 
        title TEXT,
        category TEXT,
        description TEXT,
        link TEXT
    );

    `)

//Inserindo dados na tabela do SQLITE
 
    /*const query = `INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    
    ) VALUES (?,?,?,?,?);`
    
    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        "Cursos de Programaçao 3",
        "Estudo",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt quidem cupiditate dolor esse ad sint deserunt doloremque itaque dolore amet nulla in, sapiente totam culpa laborum deleniti dolores nisi ipsum?",
        "https://rocketseat.com.br/comunidade"
    ]
    
    db.run(query, values, function(err){
        if (err) return console.log(err)
    
        console.log(this)
    
    })
   
    // Deletar um dado da tabela SQLITE*/

    db.run(`DELETE FROM ideas WHERE id = ?`, [6], function(err){
        if(err) return consologe.log(err)

        
    })

    //Consultar dados na tabela SQLITE

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

})

module.exports = db