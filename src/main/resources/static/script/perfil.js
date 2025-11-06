document.addEventListener('DOMContentLoaded', () => {
  const usuarioJson = localStorage.getItem('usuarioLogado');

  if (!usuarioJson) {
    alert('Usuário não está logado! Redirecionando para o login...');
    window.location.href = 'login.html';
    return;
  }

  const usuario = JSON.parse(usuarioJson);

  document.getElementById('nomeUsuario').textContent = usuario.nomeUsuario || '';
  document.getElementById('email').textContent = usuario.email || '';
  document.getElementById('telefone').textContent = usuario.telefone || '';
  document.getElementById('dataNascimento').textContent = usuario.dataNascimento || '';

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Logout efetuado!');
    window.location.href = 'index.html';
  });

 // --- Personalização do menu se estiver logado ---
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const nav = document.querySelector("nav");

  if (usuarioLogado && usuarioLogado.tipo === 2) {
    // Substitui os botões de login e cadastro por um menu de perfil
    nav.innerHTML = `
      <a href="./sobreNos.html"><button>Sobre nós</button></a>
      <div class="perfil-menu">
        <button id="perfilBtn">
          <i class="fa fa-user-circle"></i> ${usuarioLogado.nomeUsuario} ▾
        </button>
        <div class="dropdown-menu">
          <a href="./perfilCliente.html">Perfil</a>
          <button id="logoutBtn">Sair</button>
        </div>
      </div>
    `;

    // Mostra/oculta o menu suspenso ao clicar
    const perfilBtn = document.getElementById("perfilBtn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    perfilBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });

    // Fecha o menu se clicar fora
    document.addEventListener("click", (e) => {
      if (!perfilBtn.contains(e.target)) {
        dropdownMenu.classList.remove("show");
      }
    });

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da conta.");
      window.location.reload();
    });
  }
});
