document.addEventListener("DOMContentLoaded", async () => {
  const selectConvenio = document.getElementById("convenio");

  try {
    const response = await fetch("http://localhost:8080/nomeConv");

    if (!response.ok) {
      throw new Error("Erro ao buscar convênios");
    }

    const convenios = await response.json();
    console.log("Convênios recebidos:", convenios);

    // Limpa opções anteriores
    selectConvenio.innerHTML = '<option value="" disabled selected>Selecione o convênio</option>';

    // Preenche com os dados vindos do backend
    convenios.forEach(conv => {
      const option = document.createElement("option");
      option.value = conv.idNomeConv;
      option.textContent = conv.nomeConv; 
      selectConvenio.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar convênios:", error);
    selectConvenio.innerHTML = '<option value="">Erro ao carregar convênios</option>';
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroCarteirinhaForm");
  if (!form) return; // Sai se o formulário não existir

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const numero = document.getElementById("numero").value.trim();
    const validade = document.getElementById("validade").value;
    const nomeConvenioId = document.getElementById("convenio").value;
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
      alert("Erro: usuário não encontrado. Faça login novamente.");
      return;
    }

    if (!nomeConvenioId) {
      alert("Por favor, selecione um convênio.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/carteirinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero,
          validade,
          usuario: { id: usuarioId },
          nomeConvenio: { idNomeConv: nomeConvenioId }
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Erro ao cadastrar carteirinha: ${err}`);
      }

      alert("Carteirinha cadastrada com sucesso!");
      window.location.href = "./perfilCliente.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar carteirinha. Verifique os dados e tente novamente.");
    }
  });
});
