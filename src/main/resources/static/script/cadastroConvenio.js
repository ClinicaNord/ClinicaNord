document.addEventListener("DOMContentLoaded", async () => {
  const selectConvenio = document.getElementById("convenio");
  const form = document.getElementById("cadastroCarteirinhaForm");

  // atualiza os convenios a partir dos convenios cadastrados no backend
  try {
    const response = await fetch("http://localhost:8080/nomeConv");

    if (!response.ok) throw new Error("Erro ao buscar convênios");

    const convenios = await response.json();
    console.log("Convênios recebidos:", convenios);

    selectConvenio.innerHTML = '<option value="" disabled selected>Selecione o convênio</option>';

    convenios.forEach(conv => {
      const option = document.createElement("option");
      option.value = conv.idNomeConv; // Certifique-se de que este é o campo correto
      option.textContent = conv.nomeConv;
      selectConvenio.appendChild(option);
    });

  } catch (error) {
    console.error("Erro ao carregar convênios:", error);
    selectConvenio.innerHTML = '<option value="">Erro ao carregar convênios</option>';
  }

  // envia as informações do formulário para o backend
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const numero = document.getElementById("numero").value.trim();
    const validade = document.getElementById("validade").value; 
    const nomeConvenioId = Number(document.getElementById("convenio").value);
    const usuarioId = Number(localStorage.getItem("usuarioId"));


    if (!nomeConvenioId) return alert("Por favor, selecione um convênio.");
    if (!numero || !validade) return alert("Preencha todos os campos.");

    try {
      const response = await fetch("http://localhost:8080/carteirinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: numero,
          validade: validade,
          usuario: { id: usuarioId },
          nomeConvenio: { idNomeConv: nomeConvenioId }
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Erro ao cadastrar carteirinha: ${err}`);
      }

      alert("Carteirinha cadastrada com sucesso!");
      window.location.href = "./login.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar carteirinha. Verifique os dados e tente novamente.");
    }
  });
});
