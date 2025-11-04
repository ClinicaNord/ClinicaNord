document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");

  // Preenche endereço pelo CEP
  cepInput.addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao buscar o CEP");

        const dados = await response.json();
        if (dados.erro) {
          alert("CEP não encontrado.");
          return;
        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

      } catch (error) {
        console.error(error);
        alert("Erro ao buscar o endereço: " + error.message);
      }
    }
  });

  const form = document.getElementById("formEndereco");

  // Recupera usuário cadastrado
  const usuario = JSON.parse(localStorage.getItem("usuarioCadastrado"));
  if (!usuario || !usuario.idUsuario) {
    alert("Usuário não encontrado. Cadastre-se primeiro.");
    window.location.href = "./cadastrocliente.html";
    return;
  }

  // Submissão do endereço
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const endereco = {
      estado: document.getElementById("estado").value,
      cidade: document.getElementById("cidade").value,
      bairro: document.getElementById("bairro").value,
      rua: document.getElementById("rua").value,
      cep: document.getElementById("cep").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
      usuario: { idUsuario: usuario.idUsuario }
    };

    try {
      const response = await fetch("http://localhost:8080/cadastroendereco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar endereço");

      await response.json();
      window.location.href = "./cadastroConvenio.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar endereço. Tente novamente.");
    }
  });
});
