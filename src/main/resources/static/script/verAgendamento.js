document.addEventListener("DOMContentLoaded", async () => {
  // Recupera o usuário logado
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuarioLogado) {
    alert("Você precisa estar logado para ver seus agendamentos!");
    window.location.href = "./login.html";
    return;
  }

  const usuarioId = usuarioLogado.idUsuario; // Pega o ID do usuário logado

  const main = document.querySelector("main.card");
  main.innerHTML = "<h2>Carregando seus agendamentos...</h2>";

  try {
    const response = await fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`);
    if (!response.ok) throw new Error("Erro ao buscar agendamentos");

    const agendamentos = await response.json();

    if (agendamentos.length === 0) {
      main.innerHTML = "<h2>Você ainda não possui agendamentos.</h2>";
      return;
    }

    main.innerHTML = "";

    
    agendamentos.forEach((ag) => {
      const card = document.createElement("div");
      card.classList.add("agendamento-card");

      card.innerHTML = `
        <div class="profile">
          <img src="./img/logo.png" alt="Foto" class="profile-img">
          <ul>
            <li><strong>Nome:</strong> ${usuarioLogado.nome}</li>
            <li><strong>Serviço:</strong> ${ag.servicos?.nome || "Serviço"}</li>
            <li><strong>Data:</strong> ${new Date(ag.agenda?.data).toLocaleDateString("pt-BR")}</li>
            <li><strong>Hora:</strong> ${ag.agenda?.hora || "Hora"}</li>
          </ul>
        </div>

        <div class="buttons">
          <button class="cancel" data-id="${ag.idAgendamento}">Cancelar</button>
          <button class="edit" data-id="${ag.idAgendamento}">Editar</button>
        </div>
      `;

      main.appendChild(card);
    });

    document.querySelectorAll(".cancel").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.getAttribute("data-id");
        const confirma = confirm("Deseja realmente cancelar este agendamento?");
        if (!confirma) return;

        const res = await fetch(`http://localhost:8080/agendamento/${id}`, { method: "DELETE" });
        if (res.ok) {
          alert("Agendamento cancelado com sucesso!");
          location.reload();
        } else {
          alert("Erro ao cancelar agendamento.");
        }
      });
    });

  } catch (err) {
    console.error("Erro ao carregar agendamentos:", err);
    main.innerHTML = "<h2>Erro ao carregar agendamentos.</h2>";
  }
});
