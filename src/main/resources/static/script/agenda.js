// VARIÁVEIS GERAIS
const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const servicoSelecionado = JSON.parse(localStorage.getItem("servicoSelecionado"));
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!servicoSelecionado) {
  alert("Nenhum tipo de terapia foi selecionado! Retornando à página anterior.");
  window.location.href = "./tiposTerapia.html";
}

console.log("Serviço selecionado:", servicoSelecionado);
console.log("Usuário logado:", usuarioLogado);


// VARIÁVEIS DE BLOQUEIO

let blockedTimes = {};

// FUNÇÃO PARA CARREGAR HORÁRIOS BLOQUEADOS DO BACKEND
async function carregarHorariosBloqueados() {
  try {
    const response = await fetch("http://localhost:8080/agenda");
    const agendas = await response.json();

    blockedTimes = {};

    agendas.forEach((a) => {
      if (a.diponibilidade === false) {
        const data = a.data.split("T")[0];
        if (!blockedTimes[data]) blockedTimes[data] = [];
        blockedTimes[data].push(a.hora);
      }
    });

    console.log("Horários bloqueados carregados:", blockedTimes);
  } catch (error) {
    console.error("Erro ao carregar horários bloqueados:", error);
  }
}


// FUNÇÃO PARA GERAR O CALENDÁRIO
function generateCalendar(year, month) {
  calendar.innerHTML = "";

  const lastDate = new Date(year, month + 1, 0).getDate();
  let firstDay = new Date(year, month, 1).getDay();
  if (firstDay === 0) firstDay = 7;

  for (let i = 1; i < firstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.classList.add("empty-day");
    calendar.appendChild(emptyEl);
  }

  for (let day = 1; day <= lastDate; day++) {
    const date = new Date(year, month, day);
    const weekday = date.getDay();
    if (weekday === 0) continue;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;
    dayEl.addEventListener("click", () => showSchedule(dateStr));

    calendar.appendChild(dayEl);
  }
}

// MOSTRA HORÁRIOS DISPONÍVEIS
function showSchedule(dateStr) {
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

      slotEl.addEventListener("click", () => selectTime(dateStr, time, slotEl));
      timeSlotsEl.appendChild(slotEl);
    }
  }

  if (timeSlotsEl.innerHTML === "") {
    timeSlotsEl.innerHTML = "<p>Nenhum horário disponível neste dia.</p>";
  }
}

// =====================
// SELECIONA E BLOQUEIA O HORÁRIO
// =====================
async function selectTime(dateStr, time, slotEl) {
  if (!usuarioLogado || !usuarioLogado.idUsuario) {
    alert("Você precisa estar logado para agendar!");
    return;
  }

  const agendaData = {
    data: dateStr,
    hora: time,
    diponibilidade: false,
  };

  try {
    const agendaResponse = await fetch("http://localhost:8080/agenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendaData),
    });

    if (!agendaResponse.ok) throw new Error("Erro ao salvar a agenda");
    const agenda = await agendaResponse.json();
    console.log("Agenda criada:", agenda);

    const agendamentoData = {
      servicos: { idServicos: servicoSelecionado.idServicos },
      usuario: { idUsuario: usuarioLogado.idUsuario },
      agenda: { idAgenda: agenda.idAgenda },
    };

    const agendamentoResponse = await fetch("http://localhost:8080/agendamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agendamentoData),
    });

    if (!agendamentoResponse.ok) throw new Error("Erro ao salvar o agendamento");
    const agendamento = await agendamentoResponse.json();
    console.log("Agendamento criado:", agendamento);

    // Remove o horário da tela imediatamente
    slotEl.remove();

    // Marca localmente como bloqueado
    blockedTimes[dateStr] = blockedTimes[dateStr] || [];
    blockedTimes[dateStr].push(time);

    alert(` Agendamento realizado com sucesso em ${dateStr} às ${time}!`);
  } catch (error) {
    console.error("Erro ao agendar:", error);
    alert(" Ocorreu um erro ao tentar agendar. Tente novamente.");
  }
}

// FECHAR ABA DE HORÁRIOS AO CLICAR FORA
document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});

// INICIALIZAÇÃO
(async () => {
  await carregarHorariosBloqueados();
  generateCalendar(year, month);
})();
