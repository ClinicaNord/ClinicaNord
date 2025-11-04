const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();


// Carrega dados do localStorage
const servicoSelecionado = JSON.parse(localStorage.getItem("servicoSelecionado"));
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!servicoSelecionado) {
  alert("Nenhum tipo de terapia foi selecionado! Retornando à página anterior.");
  window.location.href = "./tiposTerapia.html";
}

console.log("Serviço selecionado:", servicoSelecionado);
console.log("Usuário logado:", usuarioLogado);

//  Bloqueios (se houver) 
const blockedDays = JSON.parse(localStorage.getItem("blockedDays")) || [];
const blockedTimes = JSON.parse(localStorage.getItem("blockedTimes")) || {};

let currentDateStr = null;

// Gera o calendário (sem domingos e sem dias bloqueados)
function generateCalendar(year, month) {
  calendar.innerHTML = "";

  const lastDate = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();

  if (firstDay === 0) firstDay = 7; // ajusta se domingo

  for (let i = 1; i < firstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.classList.add("empty-day");
    calendar.appendChild(emptyEl);
  }

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();

    if (weekday === 0) continue; // pula domingo

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (blockedDays.includes(dateStr)) continue;

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    dayEl.addEventListener("click", () => showSchedule(dateStr));
    calendar.appendChild(dayEl);
  }
}

//  Mostra horários disponíveis para o dia selecionado 
function showSchedule(dateStr) {
  currentDateStr = dateStr;
  selectedDayEl.textContent = `Horários disponíveis em ${dateStr}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  for (let hour = 7; hour < 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;

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

// Seleciona horário e envia para o backend 
async function selectTime(dateStr, time) {
  if (!usuarioLogado) {
    alert("Você precisa estar logado para agendar!");
    window.location.href = "./login.html";
    return;
  }

  const agendamento = {
    data: dateStr,
    hora: time,
    servico: { idServicos: servicoSelecionado.idServicos },
    cliente: { idCliente: usuarioLogado.idCliente }
  };

  try {
    const response = await fetch("http://localhost:8080/agendamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendamento)
    });

    if (response.ok) {
      alert(`Agendamento realizado com sucesso para ${dateStr} às ${time}!`);
      // opcional: bloqueia o horário localmente
      if (!blockedTimes[dateStr]) blockedTimes[dateStr] = [];
      blockedTimes[dateStr].push(time);
      localStorage.setItem("blockedTimes", JSON.stringify(blockedTimes));
    } else {
      const errorText = await response.text();
      alert("Erro ao agendar: " + errorText);
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
}

//  Fecha a aba de horários 
document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});

// Inicializa o calendário
generateCalendar(year, month);
