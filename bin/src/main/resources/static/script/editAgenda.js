document.addEventListener("click", (e) => {
  const perfilBtn = document.getElementById("perfilBtn");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  if (perfilBtn && e.target === perfilBtn) dropdownMenu.classList.toggle("show");
  else if (dropdownMenu && !dropdownMenu.contains(e.target)) dropdownMenu.classList.remove("show");
});
const API_AGENDA = "http://localhost:8080/agenda";
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");
const toggleDayBtn = document.getElementById("toggle-day-btn");

let agendas = [];
let currentDateStr = null;

document.addEventListener("DOMContentLoaded", async () => {
  if (!usuarioLogado || usuarioLogado.tipoUsuario !== "ADMIN") {
    alert("Acesso restrito a administradores!");
    window.location.href = "./index.html";
    return;
  }

  await carregarAgendas();
  gerarCalendario();
});

//  Busca todas as agendas (bloqueadas e liberadas)
async function carregarAgendas() {
  try {
    const response = await fetch(API_AGENDA);
    if (!response.ok) throw new Error("Erro ao buscar agendas");
    agendas = await response.json();
  } catch (error) {
    console.error("Erro ao carregar agendas:", error);
  }
}

//  Gera o calendário (Seg a Sáb)
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

  // Gera os dias úteis (segunda a sábado)
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const data = `${ano}-${mes + 1}-${dia}`;
    const weekday = new Date(ano, mes, dia).getDay();
    if (weekday === 0) continue; // pula domingo

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = dia;

    const horariosDia = agendas.filter(a => a.data === data);
    const todosBloqueados = horariosDia.length > 0 && horariosDia.every(a => !a.disponibilidade);

    if (todosBloqueados) {
      dayEl.classList.add("blocked");
    }

    dayEl.addEventListener("click", () => mostrarHorarios(data));
    calendar.appendChild(dayEl);
  }
}

//  Mostra os horários de um dia
function mostrarHorarios(data) {
  currentDateStr = data;
  selectedDayEl.textContent = `Horários de ${data}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  const horariosDia = agendas.filter(a => a.data === data);

  // Se o dia não tem horários cadastrados, cria automaticamente
  if (horariosDia.length === 0) {
    criarHorariosPadrao(data);
    return;
  }

  horariosDia.forEach(agenda => {
    const slot = document.createElement("div");
    slot.classList.add("time-slot");
    slot.textContent = agenda.hora;

    if (!agenda.disponibilidade) {
      slot.classList.add("time-blocked");
    }

    slot.addEventListener("click", () => alternarHorario(agenda));
    timeSlotsEl.appendChild(slot);
  });
}

//  Cria horários padrão (7h às 17h30, 30/30min)
async function criarHorariosPadrao(data) {
  const horarios = [];
  for (let h = 7; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hora = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      horarios.push({ data, hora, disponibilidade: true });
    }
  }

  try {
    for (const horario of horarios) {
      await fetch(API_AGENDA, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(horario),
      });
    }
    await carregarAgendas();
    mostrarHorarios(data);
  } catch (error) {
    console.error("Erro ao criar horários padrão:", error);
  }
}

//  Alterna (bloqueia/desbloqueia) um horário específico
async function alternarHorario(agenda) {
  const rota = agenda.disponibilidade ? "bloquear" : "desbloquear";
  try {
    await fetch(`${API_AGENDA}/${rota}/${agenda.idAgenda}`, { method: "POST" });
    agenda.disponibilidade = !agenda.disponibilidade;
    await carregarAgendas();
    mostrarHorarios(currentDateStr);
  } catch (error) {
    console.error("Erro ao alterar disponibilidade:", error);
  }
}

//  Bloquear ou desbloquear o dia inteiro
toggleDayBtn.addEventListener("click", async () => {
  if (!currentDateStr) return;

  const horariosDia = agendas.filter(a => a.data === currentDateStr);
  if (horariosDia.length === 0) {
    alert("Nenhum horário encontrado neste dia.");
    return;
  }

  const todosBloqueados = horariosDia.every(a => !a.disponibilidade);
  const rota = todosBloqueados ? "desbloquear" : "bloquear";

  try {
    for (const agenda of horariosDia) {
      await fetch(`${API_AGENDA}/${rota}/${agenda.idAgenda}`, { method: "POST" });
    }
    await carregarAgendas();
    mostrarHorarios(currentDateStr);
    gerarCalendario();
  } catch (error) {
    console.error("Erro ao bloquear/desbloquear dia:", error);
  }
});

//  Fecha painel de horários ao clicar fora
document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});
