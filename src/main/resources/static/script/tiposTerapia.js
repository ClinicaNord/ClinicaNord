  document.addEventListener("DOMContentLoaded", () => {
      const usuarioLogado = localStorage.getItem("usuarioLogado");

      if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar esta página!");
        window.location.href = "./login.html";
      }
    });
const cards = document.querySelectorAll(".card");
    const btnSelecionar = document.getElementById("btnSelecionar");
    let terapiaSelecionada = null;

    cards.forEach(card => {
      card.addEventListener("click", () => {
        // remove seleção dos outros
        cards.forEach(c => c.classList.remove("selected"));

        // marca o clicado
        card.classList.add("selected");
        terapiaSelecionada = card.getAttribute("data-tipo");

        // habilita botão
        btnSelecionar.disabled = false;
        btnSelecionar.classList.add("enabled");
      });
    });

    btnSelecionar.addEventListener("click", () => {
      if (terapiaSelecionada == null) {
        // redireciona para a página escolhida
        alert("Por favor, selecione um tipo de terapia.");
        return;
      } else {
        window.location.href = `./agendamento.html?tipo=${terapiaSelecionada}`;
      }
          });