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

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form.marko'), { livro: {}})
    });

    app.get('/livros/form/:id', (req, resp) => {
        const livroDAO = new LivrosDAO(db);
        livroDAO.buscaPorId(req.params.id)
            .then(livro => resp.marko(require('../views/livros/form.marko'), { livro }))
            .catch(error => console.error(error));
        
    });

    app.post('/livros', (req, resp) => {
        const livrosDAO = new LivrosDAO(db);
        livrosDAO.adiciona(req.body)
                .then(() => resp.redirect('/livros'))
                .catch((msg) => {
                    console.log('msg');
                    resp.redirect('/livros/form');
                });
    });

    app.put('/livros', (req, resp) => {
        const livrosDAO = new LivrosDAO(db);
        livrosDAO.edita(req.body)
                .then(() => resp.redirect('/livros'))
                .catch((msg) => {
                    console.log('msg');
                    resp.redirect('/livros/form');
                });
    });

    app.delete('/livros/:id', (req, resp) => {
        const livrosDAO = new LivrosDAO(db);
        livrosDAO.remove(req.params.id);

        resp.status(200).end();
    });
};
