const API_AGENDA = "http://localhost:8080/agenda";
const API_AGENDAMENTO = "http://localhost:8080/agendamento";
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

const calendar = document.getElementById("calendar");
const schedule = document.getElementById("schedule");
const selectedDayEl = document.getElementById("selected-day");
const timeSlotsEl = document.getElementById("time-slots");

// Variáveis Globais para controle do estado
let agendas = [];
let currentDateStr = null;
let selectedAgendaId = null; // 🚨 NOVO: Armazena o ID selecionado temporariamente

// ----------------------------------------------------
// 📌 INICIALIZAÇÃO E CARREGAMENTO DE DADOS
// ----------------------------------------------------
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

// ----------------------------------------------------
// 📅 GERAÇÃO DO CALENDÁRIO
// ----------------------------------------------------
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

    const hojeStr = hoje.toISOString().split("T")[0];

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
        const weekday = new Date(ano, mes, dia).getDay();
        if (weekday === 0) continue; // Pula Domingo

        const horariosDia = agendas.filter(a => a.data === data);
        const horariosDisponiveis = horariosDia.filter(a => a.disponibilidade);

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");
        dayEl.textContent = dia;
        
        // Bloqueia dias passados
        if (data < hojeStr) {
            dayEl.classList.add("day-blocked");
            dayEl.title = "Data já passou";
        }
        // Bloqueia dias sem horários na agenda
        else if (horariosDia.length === 0) {
            dayEl.classList.add("day-disabled");
            dayEl.title = "Sem horários cadastrados";
        } 
        // Bloqueia dias com todos horários ocupados/bloqueados pela clínica
        else if (horariosDisponiveis.length === 0) {
            dayEl.classList.add("day-blocked");
            dayEl.title = "Dia bloqueado pela clínica";
        } 
        // Dias disponíveis
        else {
            dayEl.classList.add("day-available");
            dayEl.addEventListener("click", () => mostrarHorarios(data));
        }

        calendar.appendChild(dayEl);
    }
}

// ----------------------------------------------------
// 🕑 EXIBIÇÃO E SELEÇÃO DE HORÁRIOS
// ----------------------------------------------------
function mostrarHorarios(dateStr) {
    currentDateStr = dateStr;
    // Reseta o estado de seleção ao mudar o dia
    selectedAgendaId = null; 
    
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
            slot.style.pointerEvents = "none";
        } else {
            // 🚨 MUDANÇA: Chama selecionarHorario (Não agendar direto)
            slot.addEventListener("click", () => selecionarHorario(slot, agenda.idAgenda));
        }

        timeSlotsEl.appendChild(slot);
    });
    
    // 🚨 NOVO: Adiciona o Botão de Confirmação
    const confirmBtn = document.createElement("button");
    confirmBtn.id = "confirm-schedule-btn";
    confirmBtn.textContent = "Confirmar Agendamento";
    confirmBtn.disabled = true; // Desabilitado até que um horário seja selecionado
    confirmBtn.addEventListener("click", agendarHorarioFinal);
    timeSlotsEl.appendChild(confirmBtn);
}

// 🚨 NOVO: Função para selecionar o horário
function selecionarHorario(slot, idAgenda) {
    // Remove a classe 'selected' de todos os slots para garantir que apenas um esteja selecionado
    document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
    
    // Adiciona a classe 'selected' ao slot clicado
    slot.classList.add("selected");
    
    // Armazena o ID da agenda selecionada
    selectedAgendaId = idAgenda;
    
    // Habilita o botão de confirmação
    document.getElementById("confirm-schedule-btn").disabled = false;
}

// ----------------------------------------------------
// ✅ CONFIRMAÇÃO E AGENDAMENTO (via Botão)
// ----------------------------------------------------
// 🚨 MUDANÇA: Esta função é chamada SOMENTE pelo botão de confirmação
async function agendarHorarioFinal() {
    if (selectedAgendaId === null) {
        alert("Por favor, selecione um horário primeiro.");
        // O botão já deve estar desabilitado, mas é um bom fallback
        return; 
    }
    
    if (!confirm("Confirmar agendamento do horário selecionado?")) return;

    const body = {
        agenda: { idAgenda: selectedAgendaId }, 
        usuario: { idUsuario: usuarioLogado.idUsuario },
        servicos: null
    };

    try {
        const res = await fetch(API_AGENDAMENTO, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error("Erro ao agendar");
        
        alert("Consulta agendada com sucesso!");

        // Limpa o estado e atualiza a interface
        selectedAgendaId = null; 
        await carregarAgendas();
        mostrarHorarios(currentDateStr);
        gerarCalendario();
    } catch (error) {
        console.error("Erro ao agendar:", error);
        alert("Erro ao agendar. O horário pode ter sido reservado por outro usuário.");
    }
}

// ----------------------------------------------------
// 🚪 FECHAR PAINEL DE HORÁRIOS
// ----------------------------------------------------
document.addEventListener("click", (e) => {
    // Fecha o painel se clicar fora dele e não for um dia do calendário
    if (!schedule.contains(e.target) && !e.target.classList.contains("day")) {
        schedule.style.display = "none";
        selectedAgendaId = null; // Opcional: limpa seleção ao fechar
    }
});