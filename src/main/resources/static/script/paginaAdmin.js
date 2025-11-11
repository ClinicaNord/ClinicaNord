    if(!usuarioLogado || usuarioLogado.tipo === 2) {
        alert("Acesso negado. Você não esta logado");
        window.location.href = "index.html";
    } 
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
