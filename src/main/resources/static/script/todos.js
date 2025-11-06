document.addEventListener("DOMContentLoaded", () => {
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
  } else if (usuarioLogado && usuarioLogado.tipo === 1) {
    // Substitui os botões de login e cadastro por um menu de perfil
    nav.innerHTML = `
      <a href="./sobreNos.html"><button>Sobre nós</button></a>
      <div class="perfil-menu">
        <button id="perfilBtn">
          <i class="fa fa-user-circle"></i> ${usuarioLogado.nomeUsuario} ▾
        </button>
        <div class="dropdown-menu">
          <a href="./perfilAdm.html">Perfil</a>
          <button id="logoutBtn">Sair</button>
        </div>
      </div>
    `;
  }

  // --- Se o usuário estiver logado, adiciona os eventos ---
   if (usuarioLogado) {
    const perfilBtn = document.getElementById("perfilBtn");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    perfilBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!perfilBtn.contains(e.target)) {
        dropdownMenu.classList.remove("show");
      }
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      alert("Você saiu da conta.");
      window.location.reload();
    });
  }
});
