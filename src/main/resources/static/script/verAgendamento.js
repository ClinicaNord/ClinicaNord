document.addEventListener("DOMContentLoaded", () => {
  const nomeSpan = document.getElementById("nome");
  const servicoSpan = document.getElementById("servico");
  const dataSpan = document.getElementById("data");
  const horaSpan = document.getElementById("hora");

  // Botões
  const btnCancelar = document.getElementById("cancelar");
  const btnEditar = document.getElementById("editar");
  const btnNovo = document.getElementById("novo");

  // Tenta pegar o agendamento selecionado
  const agendamentoSelecionado = JSON.parse(localStorage.getItem("agendamentoSelecionado"));
  
  // Também pega o usuário logado (para controle, se necessário)
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const botaoLogout = document.getElementById("logout"); // ajuste conforme o id no seu HTML
  if (usuarioLogado && usuarioLogado.tipoUsuario === "adm") {
    if (botaoLogout) botaoLogout.style.display = "none";
  }
  if (!agendamentoSelecionado) {
    alert("Nenhum agendamento selecionado.");
    window.location.href = "./index.html";
    return;
  }
  

  // Exibe as informações do agendamento selecionado
  nomeSpan.textContent = agendamentoSelecionado.nomePaciente || "Não informado";
  servicoSpan.textContent = agendamentoSelecionado.servico || "Não informado";
  dataSpan.textContent = agendamentoSelecionado.data || "Não informado";
  horaSpan.textContent = agendamentoSelecionado.hora || "Não informado";

  // Função cancelar agendamento
  btnCancelar.addEventListener("click", async () => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        const resposta = await fetch(`http://localhost:8080/agendamentos/${agendamentoSelecionado.id}`, {
          method: "DELETE",
        });

        if (resposta.ok) {
          alert("Agendamento cancelado com sucesso!");
          localStorage.removeItem("agendamentoSelecionado");
          window.location.href = "./paginaInicial.html";
        } else {
          alert("Erro ao cancelar agendamento.");
        }
      } catch (erro) {
        console.error(erro);
        alert("Erro de conexão com o servidor.");
      }
    }
  });

  // Função editar agendamento
  btnEditar.addEventListener("click", () => {
    localStorage.setItem("agendamentoEditando", JSON.stringify(agendamentoSelecionado));
    window.location.href = "./editarAgendamento.html";
  });

  // Função novo agendamento

  btnNovo.addEventListener("click", () => {
    window.location.href = "./agendamento.html";
  });
});
