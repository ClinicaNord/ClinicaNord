document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroClienteForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nomeUsuario = document.getElementById("nomeUsuario").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const dataNascimento = document.getElementById("data_nascimento").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:8080/cadastrocliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeUsuario,
          cpf,
          email,
          telefone,
          senha,
          dataNascimento,
          tipoUsuario: { idTipoUsuario: 2 }
        })
      });

      if (!response.ok) throw new Error("Erro ao cadastrar cliente");

      const data = await response.json();

      // Salva o objeto do usuário inteiro
      localStorage.setItem("usuarioCadastrado", JSON.stringify(data));

      // Vai para cadastro de endereço
      window.location.href = "./cadastroendereco.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Falha ao cadastrar cliente. Tente novamente.");
    }
  });
});
