document.addEventListener("DOMContentLoaded", async () => {

  // === ELEMENTOS DO CARD ===
  const nomeSpan = document.getElementById("nomeUsuario");
  const servicoSpan = document.getElementById("servicos");
  const dataSpan = document.getElementById("data_agenda");
  const horaSpan = document.getElementById("hora");

  // === USUÁRIO LOGADO ===
  const usuarioJson = localStorage.getItem("usuarioLogado");
  if (!usuarioJson) {
    console.warn("usuarioLogado não encontrado no localStorage");
    if (nomeSpan) nomeSpan.textContent = "Usuário não logado";
    return;
  }

  const usuario = JSON.parse(usuarioJson);
  console.log("Usuário logado:", usuario);

  // === MENU ===
  const nav = document.querySelector("nav");
  if (nav) {
    let linkPerfil = "./perfilCliente.html";
    if (usuario.tipo === 1) linkPerfil = "./perfilAdm.html";

    nav.innerHTML = `
      <a href="./sobreNos.html"><button>Sobre nós</button></a>
      <div class="perfil-menu">
        <button id="perfilBtn">${usuario.nomeUsuario} ▾</button>
        <div class="dropdown-menu">
          <button id="inicioBtn">Início</button>
          <a href="${linkPerfil}">Perfil</a>
          <button id="logoutBtn">Sair</button>
        </div>
      </div>`;
  }

  document.getElementById("logoutBtn")?.addEventListener("click", () => { 
    localStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
  });

  // === BUSCAR AGENDAMENTO DO USUÁRIO ===
  try {
    const response = await fetch(`http://localhost:8080/agendamento/usuario/${usuario.idUsuario}`);
    if (!response.ok) throw new Error("Erro ao buscar agendamentos");

    const lista = await response.json();
    console.log("Agendamentos do usuário:", lista);

    if (lista.length === 0) {
      nomeSpan.textContent = "Nenhum agendamento encontrado";
      return;
    }

    const ag = lista[0]; // pega o primeiro agendamento do usuário

    // === PREENCHER O CARD ===
      nomeSpan.textContent = ag.usuario?.nomeUsuario ?? "Nome não disponível";
      servicoSpan.textContent = 
      ag.servicos?.servicos ??
      ag.servicos?.nomeServicos ??
      "Serviço não disponível";

    const dataRaw = ag.agenda?.data_agenda ?? null;
    dataSpan.textContent = dataRaw
      ? new Date(dataRaw).toLocaleDateString("pt-BR")
      : "";

    horaSpan.textContent = ag.agenda?.hora ?? " ";

  } catch (error) {
    console.error("Erro:", error);
    nomeSpan.textContent = "Erro ao carregar dados";
  }

});
