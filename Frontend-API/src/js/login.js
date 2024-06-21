// TODO: consertar o middleware da tela de login
// document.addEventListener('DOMContentLoaded', async () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     window.location.href = './profile.html';
//     return;
//   }
// });

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // erros
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('formError').textContent = '';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let hasError = false;

  if (!email) {
    document.getElementById('emailError').textContent = 'Email é obrigatório.';
    hasError = true;
  }

  if (!password) {
    document.getElementById('passwordError').textContent = 'Senha é obrigatória.';
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Armazenar o token no localStorage
      console.log(data.token)
      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');

      // Confirmar se existe perguntas de segurança cadastradas
      const response2 = await fetch('http://localhost:3000/secQuestions/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });

      const data2 = await response2.json();

      if (response2.ok && data2.hasSecurityQuestions) {
        window.location.href = './index.html';
      }
      else {
        if (confirm("Perguntas de seguranças não cadastradas. Deseja cadastrá-las?") == true) {
          window.location.href = './secQuestions.html';
        }
        else {
          window.location.href = './index.html';
        }
      }

    } else {
      alert(data.message || 'Falha no login');
    }
  } catch (error) {
    console.error('Erro:', error);
    document.getElementById('formError').textContent = 'Email ou senha inválidos.';
    return
  }
});