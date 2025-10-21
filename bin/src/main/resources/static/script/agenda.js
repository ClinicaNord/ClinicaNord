const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

// Dias e horários bloqueados pelo admin
const blockedDays = JSON.parse(localStorage.getItem("blockedDays")) || [];
const blockedTimes = JSON.parse(localStorage.getItem("blockedTimes")) || {};

let currentDateStr = null;

// Gera o calendário (sem domingos e sem dias bloqueados)
function generateCalendar(year, month) {
  calendar.innerHTML = "";

  const lastDate = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay(); 

  // ajusta se o primeiro dia for domingo (0)
  if (firstDay === 0) firstDay = 7;

  // cria espaços vazios para alinhar o primeiro dia
  for (let i = 1; i < firstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.classList.add("empty-day");
    calendar.appendChild(emptyEl);
  }

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();

    if (weekday === 0) continue; // pula domingo

    const dateStr = `${year}-${month + 1}-${day}`;

    if (blockedDays.includes(dateStr)) continue; // pula dias bloqueados

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    dayEl.addEventListener("click", () => showSchedule(dateStr));
    calendar.appendChild(dayEl);
  }
}

// Mostra horários disponíveis
function showSchedule(dateStr) {
  currentDateStr = dateStr;
  selectedDayEl.textContent = `Horários disponíveis em ${dateStr}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  for (let hour = 7; hour < 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

      if (blockedTimes[dateStr] && blockedTimes[dateStr].includes(time)) continue; // pula horários bloqueados

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

// Seleciona horário
function selectTime(dateStr, time) {
  alert(`Você selecionou ${dateStr} às ${time}`);
  // Aqui você pode enviar os dados para o backend
}

// Fecha a aba de horários quando clicar fora
document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});

generateCalendar(year, month);
