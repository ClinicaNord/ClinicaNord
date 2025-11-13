document.addEventListener('DOMContentLoaded', () => {
  const usuarioJson = localStorage.getItem('usuarioLogado');

  const usuario = JSON.parse(usuarioJson);

  // --- Cria menu de navegação dinâmico ---
  const nav = document.querySelector('nav');
  if (!nav) return;

  let linkPerfil = './perfilCliente.html';
  if (usuario.tipo === 1) {
    // tipo 1 = Administrador (por exemplo)
    linkPerfil = './perfilAdm.html';
  }

  nav.innerHTML = `
    <a href="./sobreNos.html"><button>Sobre nós</button></a>
    <div class="perfil-menu">
      <button id="perfilBtn">
        <i class="fa fa-user-circle"></i> ${usuario.nomeUsuario} ▾
      </button>
      <div class="dropdown-menu">
        <button id="inicioBtn">Início</button>
        <a href="${linkPerfil}" id="perfilLink">Perfil</a>
        <button id="logoutBtn">Sair</button>
      </div>
    </div>
  `;

  // Mostra/oculta o menu suspenso ao clicar
  const perfilBtn = document.getElementById('perfilBtn');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  perfilBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  // Fecha o menu se clicar fora
  document.addEventListener('click', (e) => {
    if (!perfilBtn.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  document.getElementById('inicioBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Você saiu da conta.');
    window.location.href = 'index.html';
  });
});

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
    }
  }
  // Botão de pesquisa
  btnPesquisar.addEventListener("click", buscarUsuarios);
  // Pesquisa automática
  inputNome.addEventListener("input", () => {
    if (inputNome.value.length >= 2) buscarUsuarios();
  });
});
