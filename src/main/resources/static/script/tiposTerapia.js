document.addEventListener("DOMContentLoaded", () => {
  // Verifica se há um usuário logado no localStorage
  const usuarioJson = localStorage.getItem("usuarioLogado");

  if (!usuarioJson) {
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "login.html";
    return;
  }

  // Converte o JSON em objeto
  const usuario = JSON.parse(usuarioJson);

  // Verifica se o tipo de usuário é Cliente
  if (!usuario.tipoUsuario || usuario.tipoUsuario.nome !== "Cliente") {
    alert("Acesso restrito! Somente clientes podem acessar esta página.");
    window.location.href = "index.html"; // ou outra página adequada
    return;
  }

  const cards = document.querySelectorAll(".card");
  const btnSelecionar = document.getElementById("btnSelecionar");
  let servicoSelecionado = null;

  // Mapeia os tipos com base no banco de dados
  const mapaServicos = {
    "Audiometria Clínica": 1,
    "Fonoterapia (TDAH, TEA, TPAC)": 2,
    "Reabilitação Auditiva": 3
  };

  // Selecionar o card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      const nomeServico = card.dataset.tipo;
      const idServico = mapaServicos[nomeServico];

      // Armazena o serviço selecionado
      servicoSelecionado = {
        idServicos: idServico,
        nomeServico: nomeServico
      };

      btnSelecionar.disabled = false;
    });
  });

  // Botão “Selecionar” salva no localStorage e redireciona
  btnSelecionar.addEventListener("click", () => {
    if (!servicoSelecionado) {
      alert("Selecione um tipo de terapia antes de continuar!");
      return;
    }

    // Salva no localStorage (para a página agenda usar)
    localStorage.setItem("servicoSelecionado", JSON.stringify(servicoSelecionado));

    // Redireciona para a página de agendamento
    window.location.href = "./agenda.html";
  });
});
