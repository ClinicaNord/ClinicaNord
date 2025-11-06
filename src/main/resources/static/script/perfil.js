document.addEventListener('DOMContentLoaded', () => {

  const usuarioJson = localStorage.getItem('usuarioLogado');

  if (!usuarioJson) {
    alert('Usuário não está logado! Redirecionando para o login...');
    window.location.href = 'login.html';
    return;
  }

  const usuario = JSON.parse(usuarioJson);

  // Preenche as informações do usuário
  document.getElementById('nomeUsuario').textContent = usuario.nomeUsuario || '';
  document.getElementById('email').textContent = usuario.email || '';
  document.getElementById('telefone').textContent = usuario.telefone || '';
  document.getElementById('dataNascimento').textContent = usuario.dataNascimento || '';

  // Espera o DOM carregar completamente antes de adicionar os listeners
  const logoutBtn = document.getElementById('LogoutBtn');
  const verAgendamentosBtn = document.getElementById('VerAgendamentosBtn');

  if (!logoutBtn || !verAgendamentosBtn) {
    console.error(" Botões não encontrados no DOM!");
    return;
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Logout efetuado!');
    window.location.href = 'index.html';
  });

  verAgendamentosBtn.addEventListener('click', () => {
    window.location.href = 'verAgendamento.html';
  });
});
