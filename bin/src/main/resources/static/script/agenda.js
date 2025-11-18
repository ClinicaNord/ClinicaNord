const API_AGENDA = "http://localhost:8080/agenda";
const API_AGENDAMENTO = "http://localhost:8080/agendamento";
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

// Elementos da página
const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

let agendas = [];
let currentDateStr = null;

// ====================================
// INICIALIZAÇÃO
// ====================================
document.addEventListener("DOMContentLoaded", async () => {
  if (!usuarioLogado) {
    alert("Você precisa estar logado para agendar uma consulta.");
    window.location.href = "./login.html";
    return;
  }

  await carregarAgendasDisponiveis();
  gerarCalendario();
});

// ====================================
// FUNÇÕES
// ====================================

// 🔹 Carrega do backend as agendas disponíveis
async function carregarAgendasDisponiveis() {
  try {
    const response = await fetch(`${API_AGENDA}/disponiveis`);
    if (!response.ok) throw new Error("Erro ao buscar horários disponíveis");
    agendas = await response.json();
  } catch (error) {
    console.error("Erro ao carregar agendas:", error);
  }
}

// 🔹 Gera o calendário do mês atual (Seg a Sáb)
function gerarCalendario() {
  calendar.innerHTML = "";

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  let primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  if (primeiroDiaSemana === 0) primeiroDiaSemana = 7;

  // Preenche espaço antes do primeiro dia
  for (let i = 1; i < primeiroDiaSemana; i++) {
    const empty = document.createElement("div");
    empty.classList.add("empty-day");
    calendar.appendChild(empty);
  }

  // Pega os dias que possuem horários disponíveis
  const diasComDisponibilidade = [...new Set(agendas.map(a => a.data))];

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const data = `${ano}-${mes + 1}-${dia}`;
    const weekday = new Date(ano, mes, dia).getDay();
    if (weekday === 0) continue; // pula domingo

    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = dia;

    if (diasComDisponibilidade.includes(data)) {
      dayEl.addEventListener("click", () => mostrarHorarios(data));
    } else {
      dayEl.classList.add("day-disabled");
    }

    calendar.appendChild(dayEl);
  }
}

// 🔹 Mostra os horários disponíveis de um dia
function mostrarHorarios(dateStr) {
  currentDateStr = dateStr;
  selectedDayEl.textContent = `Horários disponíveis em ${dateStr}`;
  schedule.style.display = "block";
  timeSlotsEl.innerHTML = "";

  const horariosDia = agendas.filter(a => a.data === dateStr && a.disponibilidade);

  if (horariosDia.length === 0) {
    timeSlotsEl.innerHTML = "<p>Não há horários disponíveis neste dia.</p>";
    return;
  }

  horariosDia.forEach(agenda => {
    const slot = document.createElement("div");
    slot.classList.add("time-slot");
    slot.textContent = agenda.hora;

    slot.addEventListener("click", () => agendarHorario(agenda.idAgenda));
    timeSlotsEl.appendChild(slot);
  });
}

// 🔹 Faz o agendamento (POST /agendamento)
async function agendarHorario(idAgenda) {
  if (!confirm("Deseja confirmar este horário?")) return;

  const body = {
    idAgenda: idAgenda,
    idUsuario: usuarioLogado.idUsuario,
  };

  try {
    const response = await fetch(API_AGENDAMENTO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Erro ao realizar agendamento");

    alert(" Consulta agendada com sucesso!");
    await carregarAgendasDisponiveis();
    mostrarHorarios(currentDateStr);
  } catch (error) {
    console.error("Erro ao agendar:", error);
    alert("Erro ao agendar. Tente novamente mais tarde.");
  }
}

// 🔹 Fecha o painel de horários ao clicar fora
document.addEventListener("click", (e) => {
  if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
    schedule.style.display = "none";
  }
});
