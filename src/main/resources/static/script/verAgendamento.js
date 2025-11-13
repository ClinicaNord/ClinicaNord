document.addEventListener("DOMContentLoaded", async () => {
  const nomeSpan = document.getElementById("nome");
  const servicoSpan = document.getElementById("servico");
  const dataSpan = document.getElementById("data");
  const horaSpan = document.getElementById("hora");

  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!usuarioLogado) {
    alert("Usuário não logado!");
    window.location.href = "./login.html";
    return;
  }

  // 🔹 Busca os agendamentos do usuário no backend
  try {
    const resposta = await fetch(`http://localhost:8080/agendamento/usuario/${usuarioLogado.id}`);
    if (!resposta.ok) throw new Error("Erro ao buscar agendamentos.");

    const agendamentos = await resposta.json();

    if (agendamentos.length > 0) {
      const agendamento = agendamentos[0]; // mostra o mais recente, por exemplo
      nomeSpan.textContent = agendamento.nomeUsuario;
      servicoSpan.textContent = agendamento.servico;
      dataSpan.textContent = agendamento.data;
      horaSpan.textContent = agendamento.hora;
    } else {
      nomeSpan.textContent = "Nenhum agendamento encontrado.";
      servicoSpan.textContent = "-";
      dataSpan.textContent = "-";
      horaSpan.textContent = "-";
    }

  } catch (erro) {
    console.error(erro);
    alert("Erro ao carregar agendamentos.");
  }
});
