document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Se não tiver ID na URL, tenta pegar o usuário logado
  if (!id) {
    const usuarioJson = localStorage.getItem('usuarioLogado');

    if (!usuarioJson) {
      alert('Usuário não está logado! Redirecionando para o login...');
      window.location.href = 'login.html';
      return;
    }

    const usuario = JSON.parse(usuarioJson);

    document.getElementById('nomeUsuario').textContent = usuario.nomeUsuario || '';
    document.getElementById('email').textContent = usuario.email || '';
    document.getElementById('telefone').textContent = usuario.telefone || '';
    document.getElementById('dataNascimento').textContent = usuario.dataNascimento || '';

    // Botões
    document.getElementById('LogoutBtn').addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      alert('Logout efetuado!');
      window.location.href = 'index.html';
    });

    document.getElementById('VerAgendamentosBtn').addEventListener('click', () => {
      window.location.href = 'verAgendamento.html';
    });

    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/cadastrocliente/${id}`);

    if (!response.ok) throw new Error("Erro ao buscar paciente.");

    const usuario = await response.json();

    document.getElementById('nomeUsuario').textContent = usuario.nomeUsuario || '';
    document.getElementById('email').textContent = usuario.email || '';
    document.getElementById('telefone').textContent = usuario.telefone || '';
    document.getElementById('dataNascimento').textContent = usuario.dataNascimento || '';

    // Botão Ver Agendamentos redireciona para agendamentos do paciente (não do ADM)
    document.getElementById('VerAgendamentosBtn').addEventListener('click', () => {
      window.location.href = `verAgendamento.html?id=${usuario.idUsuario}`;
    });

  } catch (error) {
    console.error("Erro ao carregar paciente:", error);
    alert("Não foi possível carregar os dados do paciente.");
  }

  // Botão logout sempre disponível
  document.getElementById('LogoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Logout efetuado!');
    window.location.href = 'index.html';
  });
});
