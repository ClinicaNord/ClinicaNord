document.addEventListener('DOMContentLoaded', () => {
  // Tenta pegar os dados do usuário armazenados no localStorage
  const usuarioJson = localStorage.getItem('usuarioLogado');

  if (!usuarioJson) {
    alert('Usuário não está logado! Redirecionando para o login...');
    window.location.href = 'entrarcliente.html';  // redireciona para login se não tiver dados
    return;
  }

  // Usa o método JSON.parse para converter a string JSON armazenada na variável 'usuarioJson' em um objeto JavaScript.
  // Isso é necessário porque os dados armazenados no localStorage são sempre strings, e para acessar suas propriedades como 'nome' ou 'email',
  // precisamos transformá-los de volta em objeto.
  // O resultado é armazenado na constante 'usuario', que agora pode ser usada para acessar os dados do usuário como um objeto normal.
  const usuario = JSON.parse(usuarioJson);

  // Busca o elemento HTML que possui o id 'nome' na página usando getElementById.
  // Depois, atribui ao conteúdo de texto interno (textContent) desse elemento o valor da propriedade 'nome' do objeto 'usuario'.
  // O operador lógico OR (||) é usado para garantir que, caso 'usuario.nome' seja undefined, null ou vazio, o conteúdo do elemento será definido como uma string vazia (''),
  // evitando que apareça 'undefined' ou erro na página.
  document.getElementById('nome').textContent = usuario.nomeUsuario || '';
  document.getElementById('email').textContent = usuario.email || '';

  // Configura botão logout para limpar o localStorage e voltar para login
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert('Logout efetuado!');
    window.location.href = 'index.html';
  });
});