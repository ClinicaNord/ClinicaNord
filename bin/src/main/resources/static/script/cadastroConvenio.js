window.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("convenio");

  try {
    const response = await fetch("http://localhost:8080/nomeConv");
    const convenios = await response.json();

    // Limpa opções antigas
    select.innerHTML = '<option value="" disabled selected>Selecione o convênio</option>';

    // Adiciona cada convênio no <select>
    convenios.forEach(conv => {
      const option = document.createElement("option");
      option.value = conv.idNomeConv;     // ID que o backend espera
      option.textContent = conv.nomeConv; // Nome exibido ao usuário
      select.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar convênios:", error);
    select.innerHTML = '<option value="">Erro ao carregar convênios</option>';
  }
});

// Enviar formulário de carteirinha

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroCarteirinhaForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const numero = document.getElementById("numero").value;
    const validade = document.getElementById("validade").value;
    const nomeConvenioId = document.getElementById("convenio").value;

    // ID do usuário logado — precisa estar salvo após o login
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
      alert("Erro: usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/carteirinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero,
          convenio: nomeConvenioId, // campo String no banco (pode ser nomeConv)
          validade,
          usuario: { id: usuarioId },
          nomeConvenio: { idNomeConv: nomeConvenioId }
        })
      });

      if (!response.ok) throw new Error("Erro ao cadastrar carteirinha");

      alert("Carteirinha cadastrada com sucesso!");
      window.location.href = "./perfilCliente.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar carteirinha. Tente novamente.");
    }
  });
});
