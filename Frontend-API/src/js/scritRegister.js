document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Limpar mensagens de erro anteriores
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
  document.getElementById('formError').textContent = '';

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  let hasError = false;

  // Verificar se as senhas são iguais
  if (password !== confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'As senhas não correspondem.';
    hasError = true;
  }

  // Verificar outros campos conforme necessário (exemplo)
  if (!name) {
    document.getElementById('nameError').textContent = 'Nome é obrigatório.';
    hasError = true;
  }

  if (!email) {
    document.getElementById('emailError').textContent = 'Email é obrigatório.';
    hasError = true;
  }

  if (!password) {
    document.getElementById('passwordError').textContent = 'Senha é obrigatória.';
    hasError = true;
  }

  if (!confirmPassword) {
    document.getElementById('confirmPasswordError').textContent = 'Confirme a senha.';
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
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao cadastrar');
    }

    const data = await response.json();
    document.getElementById('successMessage').textContent = 'Cadastro bem-sucedido! Redirecionando para login...';
    setTimeout(() => {
      window.location.href = './login.html';
    }, 2000); // redirecionar após 2 segundos
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('formError').textContent = error.message || 'Erro ao fazer cadastro';
  }
});
