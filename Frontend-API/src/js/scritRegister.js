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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao cadastrar');
    }

    const data = await response.json();
    alert('Cadastro bem-sucedido!');
    window.location.href = './login.html';
  } catch (error) {
    console.error('Erro:', error);
    alert(error.message || 'Erro ao fazer cadastro');
  }
});