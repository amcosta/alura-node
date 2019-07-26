class LivrosDAO {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', (err, livros) => {
                if (err) {
                    return reject(err);
                }

                return resolve(livros);
            })
        })
    }

    adiciona({titulo, preco, descricao}) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)`,
                [titulo, preco, descricao],
                err => {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível salvar o livro!');
                    }

                    resolve()
                }
            );
        });
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM livros WHERE id = ?`, 
                [id], 
                (err, response) => {
                    if (err) {
                        console.error(err);
                        return reject('Nenhum registro encontrado!')
                    }

                    resolve(response);
                }
            )
        });
    }

    edita({id, titulo, preco, descricao}) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
                [titulo, preco, descricao, id],
                err => {
                    if (err) {
                        console.error(err);
                        return reject('Não foi possível atualizar as informações do livro!');
                    }

                    resolve();
                }
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE FROM livros WHERE id = ?`,
                [id],
                err => {
                    if (err) {
                        console.error(err);
                        return reject('Não foi possível remover o livro');
                    }

                    resolve();
                }
            );
        });
    }
}

module.exports = LivrosDAO;