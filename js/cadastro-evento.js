// URL da API
const URL_API = "https://soundgarden-api.vercel.app";

//selecionando os campos do formulário
const inputNome = document.querySelector("#nome");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputPoster = document.querySelector("#poster");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

// identificando envio do formulário
form.onsubmit = async (evento) => {
  // utilize preventDefault para impedir o recarregamento da página
  evento.preventDefault();

  // montando o objeto para enviar para a API
  const novoEvento = {
    name: inputNome.value,
    poster: inputPoster.value,
    attractions: inputAtracoes.value.split(","),
    description: inputDescricao.value,
    scheduled: inputData.value.slice(0, 16),
    number_tickets: inputLotacao.value,
  };

  // requisição com método POST, e JSON.stringify para converter os dados em JSON
  const resposta = await fetch(URL_API + "/events", {
    method: "POST",
    body: JSON.stringify(novoEvento),
    headers: { "Content-Type": "application/json" },
  });

  // convertendo resposta em JSON para objeto javascript
  const conteudoResposta = await resposta.json();
  // exibindo resposta no console
  console.log(conteudoResposta);

  if (resposta.status == 201) {
    alert("Evento cadastrado com sucesso!");
    // redireciona para página inicial
    window.location.href = "admin.html";
  }
};