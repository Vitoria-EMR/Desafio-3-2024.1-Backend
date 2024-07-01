let listaPokemon = [];
let indiceAtual = 0;

async function buscarListaPokemon() {
    try {
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292');
        const dados = await resposta.json();
        listaPokemon = dados.results;
        exibirPokemon(indiceAtual);
    } catch (erro) {
        console.error("Erro ao buscar a lista de Pokémons:", erro);
    }
}

async function buscarDetalhesPokemon(nome) {
    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Erro ao buscar os detalhes do Pokémon:", erro);
    }
}

function exibirPokemon(indice) {
    const pokemon = listaPokemon[indice];
    buscarDetalhesPokemon(pokemon.name).then(dados => {
        alterarTexto('name', capitalizarPrimeiraLetra(dados.name));
        alterarImagem('img_sprite_front_default', dados.sprites.front_default);
    });
}

function pokemonAnterior() {
    indiceAtual = (indiceAtual - 1 + listaPokemon.length) % listaPokemon.length;
    exibirPokemon(indiceAtual);
}

function proximoPokemon() {
    indiceAtual = (indiceAtual + 1) % listaPokemon.length;
    exibirPokemon(indiceAtual);
}

function capitalizarPrimeiraLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function alterarImagem(id, url) {
    document.getElementById(id).src = url;
}

function alterarTexto(id, texto) {
    document.getElementById(id).innerText = texto;
}

window.onload = buscarListaPokemon;

