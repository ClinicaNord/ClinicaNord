document.addEventListener("DOMContentLoaded", async () => {
  const selectConvenio = document.getElementById("convenio");
  const form = document.getElementById("cadastroCarteirinhaForm");

  // Carrega convênios
  try {
    const response = await fetch("http://localhost:8080/nomeConv");
    const convenios = await response.json();
    selectConvenio.innerHTML = `
      <option value="" disabled selected>Selecione um convênio</option>
      ${convenios.map(c => `<option value="${c.idNomeConv}">${c.nomeConv}</option>`).join("")}
    `;
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar convênios.");
  }

  // Recupera usuário cadastrado
  const usuario = JSON.parse(localStorage.getItem("usuarioCadastrado"));
  if (!usuario || !usuario.idUsuario) {
    alert("Usuário não encontrado. Cadastre-se novamente.");
    window.location.href = './cadastrocliente.html';
    return;
  }

  // Submissão do convênio
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const carteirinha = {
      numero: document.getElementById("numero").value,
      validade: document.getElementById("validade").value,
      nomeConvenio: { idNomeConv: selectConvenio.value },
      usuario: { idUsuario: usuario.idUsuario }
    };

    try {
      const res = await fetch("http://localhost:8080/carteirinha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carteirinha)
      });

      if (!res.ok) throw new Error("Erro ao cadastrar carteirinha");

      localStorage.removeItem("usuarioCadastrado"); // limpa fluxo
      window.location.href = "./sucesso.html";

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
});
