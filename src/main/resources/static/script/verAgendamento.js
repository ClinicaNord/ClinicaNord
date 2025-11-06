document.addEventListener("DOMContentLoaded", async () => {
  // Recupera o usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) {
    alert("Você precisa estar logado para ver seus agendamentos!");
    window.location.href = "./login.html";
    return;
  }

  const usuarioId = usuarioLogado.idUsuario;
  const main = document.querySelector("main.card");

  try {
    // Busca os agendamentos do usuário
    const response = await fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`);
    if (!response.ok) throw new Error("Erro ao buscar agendamentos");

    const agendamentos = await response.json();

    if (agendamentos.length === 0) {
      main.innerHTML = "<h2>Você ainda não possui agendamentos.</h2>";
      return;
    }

    const ag = agendamentos[0]; // Exibe o primeiro agendamento (ou o mais recente)

    // Preenche as informações na página
    document.getElementById("nome").textContent = usuarioLogado.nome;
    document.getElementById("servico").textContent = ag.servicos?.nome || "Serviço não informado";
    document.getElementById("data").textContent = new Date(ag.agenda?.data).toLocaleDateString("pt-BR");
    document.getElementById("hora").textContent = ag.agenda?.hora || "Hora não informada";

    // Botão: cancelar agendamento
    document.getElementById("cancelar").addEventListener("click", async () => {
      const confirma = confirm("Deseja realmente cancelar este agendamento?");
      if (!confirma) return;

      const res = await fetch(`http://localhost:8080/agendamento/${ag.idAgendamento}`, { method: "DELETE" });
      if (res.ok) {
        alert("Agendamento cancelado com sucesso!");
        location.reload();
      } else {
        alert("Erro ao cancelar agendamento.");
      }
    });

    // Botão: editar agendamento
    document.getElementById("editar").addEventListener("click", () => {
      alert("Função de edição ainda em desenvolvimento!");
      // Aqui no futuro você pode redirecionar para uma página de edição:
      // window.location.href = `editarAgendamento.html?id=${ag.idAgendamento}`;
    });

    // Botão: novo agendamento
    document.getElementById("novo").addEventListener("click", () => {
      window.location.href = "./agenda.html";
    });

  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err);
    main.innerHTML = "<h2>Erro ao carregar seus agendamentos.</h2>";
  }
});
