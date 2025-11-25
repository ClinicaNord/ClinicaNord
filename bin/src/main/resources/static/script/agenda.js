const API_AGENDA = "http://localhost:8080/agenda";
const API_AGENDAMENTO = "http://localhost:8080/agendamento";
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

let agendas = [];
let currentDateStr = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (!usuarioLogado) {
    alert("Você precisa estar logado para agendar uma consulta.");
    window.location.href = "./login.html";
    return;
  }

  await carregarAgendas();
  gerarCalendario();
});

// ➜ Carrega TODAS as agendas (bloqueadas + disponíveis)
async function carregarAgendas() {
  try {
    const res = await fetch(`${API_AGENDA}`);
    if (!res.ok) throw new Error("Erro ao buscar agendas");
    agendas = await res.json();
  } catch (error) {
    console.error("Erro ao carregar agendas:", error);
  }
}

// ➜ Gera o calendário considerando bloqueios
function gerarCalendario() {
  calendar.innerHTML = "";
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  let primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  if (primeiroDiaSemana === 0) primeiroDiaSemana = 7;

  for (let i = 1; i < primeiroDiaSemana; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty-day");
    calendar.appendChild(empty);
  }

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
    const weekday = new Date(ano, mes, dia).getDay();
    if (weekday === 0) continue;

    const horariosDia = agendas.filter(a => a.data === data);
    const horariosDisponiveis = horariosDia.filter(a => a.disponibilidade);

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = dia;

    if (horariosDia.length === 0) {
      dayEl.classList.add("day-disabled");
    } else if (horariosDisponiveis.length === 0) {
      dayEl.classList.add("day-blocked");
      dayEl.title = "Dia bloqueado pela clínica";
    } else {
      dayEl.classList.add("day-available");
      dayEl.addEventListener("click", () => mostrarHorarios(data));
    }

    calendar.appendChild(dayEl);
  }
}

// ➜ Exibe horários com bloqueios visuais
function mostrarHorarios(dateStr) {
  currentDateStr = dateStr;
  selectedDayEl.textContent = `Horários em ${dateStr}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  const horariosDia = agendas.filter(a => a.data === dateStr);

  if (horariosDia.length === 0) {
    timeSlotsEl.innerHTML = "<p>Não há horários neste dia.</p>";
    return;
  }

  horariosDia.forEach(agenda => {
    const slot = document.createElement("div");
    slot.classList.add("time-slot");
    slot.textContent = agenda.hora;

    if (!agenda.disponibilidade) {
      slot.classList.add("time-blocked");
      slot.title = "Horário bloqueado pela clínica!";
      slot.style.pointerEvents = "none"; // impede clique
    } else {
      slot.addEventListener("click", () => agendarHorario(agenda.idAgenda));
    }

    timeSlotsEl.appendChild(slot);
  });
}

// ➜ Agendamento somente se disponível
async function agendarHorario(idAgenda) {
  if (!confirm("Confirmar agendamento?")) return;

  const body = {
    idAgenda: idAgenda,
    idUsuario: usuarioLogado.idUsuario,
  };

  try {
    const res = await fetch(API_AGENDAMENTO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Erro ao agendar");
    alert("Consulta agendada com sucesso!");

    await carregarAgendas();
    mostrarHorarios(currentDateStr);
    gerarCalendario();
  } catch (error) {
    console.error("Erro ao agendar:", error);
  }
}

document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});
