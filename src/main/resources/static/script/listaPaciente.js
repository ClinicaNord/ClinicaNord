document.addEventListener("DOMContentLoaded", () => {
  const inputNome = document.getElementById("nomeUsuario");
  const btnPesquisar = document.getElementById("btnPesquisar");
  const tabelaUsuarios = document.querySelector("#tabelaUsuarios tbody");

  async function buscarUsuarios() {
    const nome = inputNome.value.trim();

    if (!nome) {
      alert("Digite um nome para pesquisar.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/cadastrocliente/buscar?nome=${encodeURIComponent(nome)}`);
      if (!response.ok) throw new Error("Erro na busca");

      const usuarios = await response.json();

      // Limpa resultados anteriores
      tabelaUsuarios.innerHTML = "";

      if (usuarios.length === 0) {
        tabelaUsuarios.innerHTML = "<tr><td colspan='4'>Nenhum usuário encontrado.</td></tr>";
        return;
      }

      // Preenche a tabela
      usuarios.forEach(usuario => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${usuario.idUsuario}</td>
          <td>${usuario.nomeUsuario}</td>
          <td>${usuario.email}</td>
          <td><button class="btn-ver" data-id="${usuario.idUsuario}">Ver perfil</button></td>
        `;

        tabelaUsuarios.appendChild(tr);
      });

      // Evento nos botões "Ver perfil"
      document.querySelectorAll(".btn-ver").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = e.target.dataset.id;
          // Redireciona para a página de perfil com o id na URL
          window.location.href = `perfilCliente.html?id=${id}`;
        });
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      alert("Ocorreu um erro ao buscar os usuários.");
    }
  }

  // Botão de pesquisa
  btnPesquisar.addEventListener("click", buscarUsuarios);

  // Pesquisa automática (opcional)
  inputNome.addEventListener("input", () => {
    if (inputNome.value.length >= 2) buscarUsuarios();
  });
});
