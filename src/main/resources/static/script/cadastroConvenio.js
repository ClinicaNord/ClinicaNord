document.addEventListener("DOMContentLoaded", async () => {
  const selectConvenio = document.getElementById("convenio");
  const form = document.getElementById("cadastroCarteirinhaForm");

  // === 1. Buscar convênios ===
  try {
    const response = await fetch("http://localhost:8080/nomeConv");
    if (!response.ok) throw new Error("Erro ao carregar convênios");

    const convenios = await response.json();
    selectConvenio.innerHTML = `
      <option value="" disabled selected>Selecione um convênio</option>
      ${convenios.map(c => `<option value="${c.idNomeConv}">${c.nome}</option>`).join("")}
    `;
  } catch (error) {
    console.error("Erro ao carregar convênios:", error);
    alert("Erro ao carregar convênios.");
  }

  // === 2. Submeter o formulário ===
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const numero = document.getElementById("numero").value;
    const validade = document.getElementById("validade").value;
    const idConvenio = document.getElementById("convenio").value;

    // Recupera usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado || !usuarioLogado.idUsuario) {
      alert("Erro: usuário não logado.");
      return;
    }

    // Corpo da requisição
    const carteirinha = {
      numero: numero,
      validade: validade,
      nomeConvenio: { idNomeConv: idConvenio },
      usuario: { idUsuario: usuarioLogado.idUsuario }
    };

    console.log("Enviando carteirinha:", carteirinha);

    try {
      const res = await fetch("http://localhost:8080/carteirinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carteirinha)
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error("Erro ao cadastrar carteirinha: " + errorData);
      }

      alert("Carteirinha cadastrada com sucesso!");
      window.location.href = "./sucessoConvenio.html";
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(error.message);
    }
  });
});
