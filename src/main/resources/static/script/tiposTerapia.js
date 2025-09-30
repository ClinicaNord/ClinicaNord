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
      if (terapiaSelecionada) {
        // redireciona para a página escolhida
        window.location.href = `agendamento.html?terapia=${terapiaSelecionada}`;
      }
    });