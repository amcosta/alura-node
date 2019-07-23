const db = require('../../config/database');
const LivrosDAO = require('../dao/livro-dao');

module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
        `);
    });
    
    app.get('/livros', (req, resp) => {
        const livrosDAO = new LivrosDAO(db);
        livrosDAO.lista()
            .then(livros => resp.marko(require('../views/livros/lista.marko'), { livros }))
            .catch(err => console.error(err));
    });
};
