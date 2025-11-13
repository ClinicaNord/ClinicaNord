document.addEventListener("DOMContentLoaded", async () => {
  // elementos
  const nomeSpan = document.getElementById("nomeUsuario");
  const servicoSpan = document.getElementById("servico");
  const dataSpan = document.getElementById("data");
  const horaSpan = document.getElementById("hora");

  // pega usuário logado
  const usuarioJson = localStorage.getItem("usuarioLogado");
  if (!usuarioJson) {
    console.warn("usuarioLogado não encontrado no localStorage");
    if (nomeSpan) nomeSpan.textContent = "Usuário não logado";
    return;
  }
  const usuario = JSON.parse(usuarioJson);
  console.log("usuario do localStorage:", usuario);

  // montar menu (mantive só o essencial)
  const nav = document.querySelector("nav");
  if (nav) {
    let linkPerfil = "./perfilCliente.html";
    if (usuario.tipo === 1) linkPerfil = "./perfilAdm.html";
    nav.innerHTML = `<a href="./sobreNos.html"><button>Sobre nós</button></a>
      <div class="perfil-menu"><button id="perfilBtn">${usuario.nomeUsuario} ▾</button>
      <div class="dropdown-menu"><button id="inicioBtn">Início</button><a href="${linkPerfil}">Perfil</a><button id="logoutBtn">Sair</button></div></div>`;
    document.getElementById("logoutBtn")?.addEventListener("click", () => { localStorage.removeItem("usuarioLogado"); window.location.href = "index.html"; });
  }

  // função utilitária para mostrar erro na UI e no console
  function mostrarErro(mensagem, extra) {
    console.error(mensagem, extra ?? "");
    if (nomeSpan) nomeSpan.textContent = "Erro ao carregar agendamento";
  }

  // --------------- FETCH ---------------
  const base = "http://localhost:8080";
  // 1) Rota esperada
  const url1 = `${base}/agendamento/usuario/${usuario.idUsuario}`;
  // 2) alternativa caso backend retorne diferente
  const url2 = `${base}/agendamentos?usuarioId=${usuario.idUsuario}`;
  // 3) buscar todos e filtrar cliente-side
  const url3 = `${base}/agendamento`;

  let agendamentos = null;
  let resposta = null;

  async function tenta(url) {
    console.log("Tentando GET:", url);
    try {
      const res = await fetch(url, { method: "GET" });
      console.log("Status:", res.status, res.statusText);
      const text = await res.text();
      // tenta parsear JSON, se falhar mostra texto
      try {
        const json = JSON.parse(text);
        console.log("Resposta JSON:", json);
        return { ok: res.ok, status: res.status, json };
      } catch (err) {
        console.warn("Resposta não é JSON:", text);
        return { ok: res.ok, status: res.status, text };
      }
    } catch (err) {
      console.error("Erro de fetch:", err);
      return { error: err };
    }
  }

  // tenta na ordem
  let tentativa = await tenta(url1);
  if (tentativa.error || !tentativa.ok || !tentativa.json) {
    // tenta url2
    let t2 = await tenta(url2);
    if (!t2.error && t2.ok && t2.json) tentativa = t2;
    else {
      // tenta url3 (buscar todos)
      let t3 = await tenta(url3);
      if (!t3.error && t3.ok && t3.json) tentativa = t3;
    }
  }

  if (tentativa && tentativa.json) {
    // possível formatos:
    // a) um array diretamente -> [ {...}, {...} ]
    // b) um objeto com campo data: { data: [ ... ] }
    // c) um único objeto -> { ... }
    const payload = tentativa.json;
    if (Array.isArray(payload)) {
      agendamentos = payload;
    } else if (payload.data && Array.isArray(payload.data)) {
      agendamentos = payload.data;
    } else if (payload.agendamento && Array.isArray(payload.agendamento)) {
      agendamentos = payload.agendamento;
    } else if (payload && typeof payload === "object") {
      // pode ser um único agendamento
      agendamentos = [payload];
    }

    console.log("Agendamentos detectados:", agendamentos);

    if (!agendamentos || agendamentos.length === 0) {
      // se retornou lista vazia, avisar
      mostrarErro("Nenhum agendamento encontrado para este usuário.", tentativa.json);
      return;
    }

    // usa primeiro agendamento (ou você pode escolher outro)
    const ag = agendamentos[0];
    console.log("Usando agendamento:", ag);

    // tenta acessar propriedades comuns, com proteção contra undefined
    const nomeUsuario = ag.usuario?.nomeUsuario ?? ag.usuario?.nome ?? "Nome não disponível";
    const servico = ag.servicos?.servicos ?? ag.servicos?.nomeServicos ?? ag.servico ?? "Serviço não disponível";

    // agenda pode vir como objeto (agenda.data/hora) ou direto no agendamento
    const dataRaw = ag.agenda?.data ?? ag.dataAgendamento ?? ag.data ?? ag.data_agendamento;
    const horaRaw = ag.agenda?.hora ?? ag.horaAgendamento ?? ag.hora ?? ag.hora_agendamento;

    if (nomeSpan) nomeSpan.textContent = nomeUsuario;
    if (servicoSpan) servicoSpan.textContent = servico;
    if (dataSpan) {
      try {
        dataSpan.textContent = dataRaw ? new Date(dataRaw).toLocaleDateString("pt-BR") : "Data não disponível";
      } catch {
        dataSpan.textContent = String(dataRaw);
      }
    }
    if (horaSpan) horaSpan.textContent = horaRaw ?? "Hora não disponível";

    // expõe objeto usado para ações (editar/cancelar)
    window.__agendamentoAtual = ag;

  } else {
    mostrarErro("Não foi possível obter agendamentos (ver console/network).", tentativa);
    return;
  }

  // ---------------- Botões -------------
  const btnCancelar = document.getElementById("cancelar");
  const btnEditar = document.getElementById("editar");
  const btnNovo = document.getElementById("novo");

  btnCancelar?.addEventListener("click", async () => {
    const ag = window.__agendamentoAtual;
    if (!ag) return alert("Nenhum agendamento carregado.");
    if (!confirm("Deseja cancelar?")) return;
    const id = ag.idAgendamento ?? ag.id ?? ag.id_agendamento ?? ag.idAg;
    console.log("Cancelando id:", id);
    try {
      const res = await fetch(`${base}/agendamento/${id}`, { method: "DELETE" });
      console.log("DELETE status", res.status);
      if (res.ok) { alert("Cancelado!"); window.location.href = "./index.html"; }
      else { alert("Erro ao cancelar, ver console."); console.error(await res.text()); }
    } catch (e) { console.error(e); alert("Erro de conexão."); }
  });

  btnEditar?.addEventListener("click", () => {
    const ag = window.__agendamentoAtual;
    if (!ag) return alert("Nenhum agendamento carregado.");
    localStorage.setItem("agendamentoEditando", JSON.stringify(ag));
    window.location.href = "./editarAgendamento.html";
  });

  btnNovo?.addEventListener("click", () => window.location.href = "./agendamento.html");

});
