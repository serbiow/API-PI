document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

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
      localStorage.setItem('token', data.token);
      alert('Login bem-sucedido!');
      // Redirecionar para uma página protegida, se necessário
      window.location.href = './perfil.html';
    } else {
      alert(data.message || 'Falha no login');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao fazer login');
  }
});