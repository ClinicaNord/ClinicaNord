const calendar = document.getElementById("calendar");
    const schedule = document.getElementById("schedule");
    const selectedDayEl = document.getElementById("selected-day");
    const timeSlotsEl = document.getElementById("time-slots");
    const toggleDayBtn = document.getElementById("toggle-day-btn");

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const blockedDays = JSON.parse(localStorage.getItem("blockedDays")) || [];
    const blockedTimes = JSON.parse(localStorage.getItem("blockedTimes")) || {};

    let currentDateStr = null;
    let currentDayEl = null;

    // Gera calendário sem domingos
    function generateCalendar(year, month) {
      calendar.innerHTML = "";

      const lastDate = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= lastDate; day++) {
        const date = new Date(year, month, day);
        const weekday = date.getDay(); // 0 = domingo, 1 = segunda ...

        if (weekday === 0) continue; // pula domingo

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");
        dayEl.textContent = day;

        const dateStr = `${year}-${month + 1}-${day}`;

        if (blockedDays.includes(dateStr)) {
          dayEl.classList.add("blocked");
        }

        dayEl.addEventListener("click", () => showSchedule(dateStr, dayEl));
        calendar.appendChild(dayEl);
      }
    }

    // Mostra horários do dia
    function showSchedule(dateStr, el) {
      currentDateStr = dateStr;
      currentDayEl = el;

      selectedDayEl.textContent = `Horários de ${dateStr}`;
      schedule.style.display = "block";
      timeSlotsEl.innerHTML = "";

      if (blockedDays.includes(dateStr)) {
        toggleDayBtn.textContent = "Desbloquear dia inteiro";
      } else {
        toggleDayBtn.textContent = "Bloquear dia inteiro";
      }

      for (let hour = 7; hour < 18; hour++) {
        for (let min = 0; min < 60; min += 30) {
          const time = `${hour.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")}`;

          const slotEl = document.createElement("div");
          slotEl.classList.add("time-slot");
          slotEl.textContent = time;

          if (
            blockedTimes[dateStr] &&
            blockedTimes[dateStr].includes(time)
          ) {
            slotEl.classList.add("time-blocked");
          }

          slotEl.addEventListener("click", () =>
            toggleTime(dateStr, time, slotEl)
          );

          timeSlotsEl.appendChild(slotEl);
        }
      }
    }

    // Bloqueia/Desbloqueia horários
    function toggleTime(dateStr, time, el) {
      if (!blockedTimes[dateStr]) {
        blockedTimes[dateStr] = [];
      }

      if (blockedTimes[dateStr].includes(time)) {
        blockedTimes[dateStr] = blockedTimes[dateStr].filter(t => t !== time);
        el.classList.remove("time-blocked");
      } else {
        blockedTimes[dateStr].push(time);
        el.classList.add("time-blocked");
      }

      localStorage.setItem("blockedTimes", JSON.stringify(blockedTimes));
    }

    // Bloqueia/Desbloqueia dia inteiro
    toggleDayBtn.addEventListener("click", () => {
      if (!currentDateStr || !currentDayEl) return;

      if (blockedDays.includes(currentDateStr)) {
        const index = blockedDays.indexOf(currentDateStr);
        blockedDays.splice(index, 1);
        currentDayEl.classList.remove("blocked");
        toggleDayBtn.textContent = "Bloquear dia inteiro";
      } else {
        blockedDays.push(currentDateStr);
        currentDayEl.classList.add("blocked");
        toggleDayBtn.textContent = "Desbloquear dia inteiro";
      }

      localStorage.setItem("blockedDays", JSON.stringify(blockedDays));
    });

    generateCalendar(year, month);