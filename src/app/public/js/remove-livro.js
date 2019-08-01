const tabelaLivros = document.querySelector('#livros');
document.addEventListener('click', event => {
    const element = event.target;
    
    if (element.dataset.type != 'remocao') {
        return false;
    }

    const id = element.dataset.ref;
    fetch(`http://localhost:3000/livros/${id}`, {'method': 'DELETE'})
        .then(resp => {
            console.log(resp);
            let tr = element.closest(`#livro_${id}`);
            tr.remove();
        })
        .catch(error => console.error(error));
});