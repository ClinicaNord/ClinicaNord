const daysContainer = document.querySelector(".days");
    const hoursContainer = document.querySelector(".hours");
    const actionBtn = document.querySelector(".action-btn");
    let selectedDay = null;
    let selectedHour = null;

    // Carrega configuração salva pelo admin
    const config = JSON.parse(localStorage.getItem("agendaConfig")) || { dias: [], horarios: [] };

    // Cria botões de dias
    config.dias.forEach(d => {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = d;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".days .btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedDay = d;
      });
      daysContainer.appendChild(btn);
    });

    // Cria botões de horários
    config.horarios.forEach(h => {
      const btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = h;
      btn.addEventListener("click", () => {
        document.querySelectorAll(".hours .btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedHour = h;
      });
      hoursContainer.appendChild(btn);
    });

    // Agendar
    actionBtn.addEventListener("click", () => {
      if (selectedDay && selectedHour) {
        alert(`Agendamento marcado para dia ${selectedDay} às ${selectedHour}`);
      } else {
        alert("Selecione um dia e um horário!");
      }
    });