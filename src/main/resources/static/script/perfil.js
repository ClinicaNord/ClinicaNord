document.addEventListener('DOMContentLoaded', () => {
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

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Logout efetuado!');
    window.location.href = 'index.html';
  });
});
