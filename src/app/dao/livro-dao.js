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
}

module.exports = LivrosDAO;