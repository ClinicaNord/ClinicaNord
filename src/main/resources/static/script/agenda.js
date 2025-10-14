const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const blockedDays = JSON.parse(localStorage.getItem("blockedDays")) || [];
const blockedTimes = JSON.parse(localStorage.getItem("blockedTimes")) || {};

let currentDateStr = null;

// Gera o calendário (sem domingos e sem dias bloqueados)
function generateCalendar(year, month) {
  calendar.innerHTML = "";

  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    if (weekday === 0) continue; // pula domingo

    const dateStr = `${year}-${month + 1}-${day}`;

    // pula dias bloqueados pelo admin
    if (blockedDays.includes(dateStr)) continue;

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    dayEl.addEventListener("click", () => showSchedule(dateStr));
    calendar.appendChild(dayEl);
  }
}

function showSchedule(dateStr) {
  currentDateStr = dateStr;
  selectedDayEl.textContent = `Horários disponíveis em ${dateStr}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  for (let hour = 7; hour < 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;

      // ignora horários bloqueados
      if (blockedTimes[dateStr] && blockedTimes[dateStr].includes(time)) continue;

      const slotEl = document.createElement("div");
      slotEl.classList.add("time-slot");
      slotEl.textContent = time;

      slotEl.addEventListener("click", () => selectTime(dateStr, time));
      timeSlotsEl.appendChild(slotEl);
    }
  }

  if (timeSlotsEl.innerHTML === "") {
    timeSlotsEl.innerHTML = "<p>Nenhum horário disponível neste dia.</p>";
  }
}

function selectTime(dateStr, time) {
  alert(`Você selecionou ${dateStr} às ${time}`);
  // Aqui você pode fazer o redirecionamento para confirmar o agendamento
  // ou enviar via fetch() para o backend
}

generateCalendar(year, month);
