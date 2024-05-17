// API-PI/Frontend-API/src/js/scripts.js
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Cadastro bem-sucedido!');
        window.location.href = './login.html';
      } else {
        alert(data.message || 'Falha ao cadastrar');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao fazer cadastro');
    }
  });
  