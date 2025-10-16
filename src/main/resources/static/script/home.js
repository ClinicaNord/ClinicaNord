document.addEventListener("DOMContentLoaded", () => {
  // --- Controle do botão "Agendar" ---
  const btnAgendar = document.querySelector(".hero button");
  btnAgendar.addEventListener("click", () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      window.location.href = "./cadastroCliente.html";
    } else {
      window.location.href = "./tiposTerapia.html";
    }
  });
});
