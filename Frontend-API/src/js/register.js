document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Limpar mensagens de erro anteriores
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
  document.getElementById('formError').textContent = '';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  let hasError = false;

  // Verificar se os campos são nulos
  if (!name) {
    document.getElementById('nameError').textContent = 'Nome é obrigatório.';
    hasError = true;
  }

  if (!email) {
    document.getElementById('emailError').textContent = 'Email é obrigatório.';
    hasError = true;
  }

  if (!phone) {
    document.getElementById('phoneError').textContent = 'Telefone é obrigatório.';
    hasError = true;
  }

  if (!confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Confirme a senha.';
    hasError = true;
  }

  // Função para validar a senha
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  if (!isValidPassword(password)) {
    document.getElementById('passwordError').textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas e minúsculas, números e símbolos.';
    hasError = true;
  }

  // Verificar se as senhas são iguais
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'As senhas não correspondem.';
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao cadastrar');
    }

    const data = await response.json();
    alert('Cadastro bem-sucedido!')
    window.location.href = './login.html';

  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('formError').textContent = error.message || 'Erro ao fazer cadastro';
  }
});
