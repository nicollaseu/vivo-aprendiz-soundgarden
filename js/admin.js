console.log("executando admin.js");

// URL da API
const URL_API = "https://soundgarden-api.vercel.app";

// Método GET: Listar eventos

// utilizando aync/await para que a função espere o retorno da requisição
const listarEventos = async () => {
  // requisição ao servidor, no endpoint /events
  let eventos = await fetch(URL_API + "/events").then((resposta) => {
    // recebendo resposta do servidor em JSON e transformar em array
    return resposta.json();
  });

  // verificando se trouxe a lista de eventos
  console.log(eventos);

  // criando o html para exibir os eventos
  let tbody = document.querySelector("table.eventos tbody");

  let htmlEventos = "";

  eventos.forEach((evento) => {
    // separando a string de data em dia, mês e ano
    let dia = evento.scheduled.slice(8, 10);
    let mes = evento.scheduled.slice(5, 7);
    let ano = evento.scheduled.slice(0, 4);

    //montando o html dinâmico
    htmlEventos += `<tr>
        <th scope="row">#</th>
        <td>${dia}/${mes}/${ano}</td>
        <td>${evento.name}</td>
        <td>${evento.attractions.join(",")}</td>
        <td>
            <a href="reservas.html?id=${evento._id}" class="btn btn-dark">
            ver reservas
            </a>
            <a href="editar-evento.html?id=${
              evento._id
            }" class="btn btn-secondary">
            editar
            </a>
            <a href="excluir-evento.html?id=${
              evento._id
            }" class="btn btn-danger">
            excluir
            </a>
        </td>
    </tr>`;
  });

  // adicionando ao DOM
  tbody.innerHTML = htmlEventos;
};

listarEventos();