const produtos = [
    { id: 1, nome: "Produto A", quantidade: 10 },
    { id: 2, nome: "Produto B", quantidade: 5 },
    { id: 3, nome: "Produto C", quantidade: 0 }
];

const tabelaProdutos = document.querySelector('tbody');
const formProduto = document.getElementById('formProduto');

formProduto.addEventListener('submit', adicionarNovoProduto);

function renderizarProdutos() {
    tabelaProdutos.innerHTML = '';

    for (const produto of produtos) {
        if (produto.quantidade > 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>
                    <button onclick="adicionarQuantidade(${produto.id})">+</button>
                    <button onclick="removerQuantidade(${produto.id})">-</button>
                </td>
            `;
            tabelaProdutos.appendChild(tr);
        } else {
            const index = produtos.indexOf(produto);
            if (index !== -1) {
                produtos.splice(index, 1);
            }
        }
    }
}

function adicionarQuantidade(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        produto.quantidade++;
        renderizarProdutos();
    }
}

function removerQuantidade(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto && produto.quantidade > 0) {
        produto.quantidade--;
        renderizarProdutos();
    }
}

function adicionarNovoProduto(event) {
    event.preventDefault();

    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidadeProduto = parseInt(document.getElementById('quantidadeProduto').value, 10);

    if (nomeProduto && quantidadeProduto >= 0) {
        const novoId = produtos.length + 1;
        const novoProduto = { id: novoId, nome: nomeProduto, quantidade: quantidadeProduto };
        produtos.push(novoProduto);
        renderizarProdutos();
    }

    // Limpar os campos do formulário
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidadeProduto').value = '';
}

renderizarProdutos();
