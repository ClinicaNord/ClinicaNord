// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {

  const cepInput = document.getElementById("cep");

  // Evento ao sair do campo CEP
  cepInput.addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error("Erro ao buscar o CEP");

        const dados = await response.json();

        if (dados.erro) {
          alert("CEP não encontrado.");
          return;
        }

        // Preenche os campos com os dados do ViaCEP
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
  const pessoaId = localStorage.getItem('pessoaId');

  if (!pessoaId) {
    alert("Pessoa não encontrada. Por favor, cadastre uma pessoa primeiro.");
    window.location.href = "cadastrocliente.html";
    return;
  }

  // Evento de envio do formulário
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
      usuario: { idUsuario: pessoaId }
    };

    try {
      const response = await fetch("http://localhost:8080/cadastroendereco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco)
      });

      if (!response.ok) throw new Error("Erro ao cadastrar endereço");

      await response.json();
      alert("Cadastro de endereço realizado com sucesso!");
      localStorage.removeItem("pessoaId");
      window.location.href = "./cadastroConvenio.html";
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar endereço. Tente novamente.");
    }
  });
});
