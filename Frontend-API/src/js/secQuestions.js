const token = localStorage.getItem('token');

//Verificar se o usuário está logado
document.addEventListener('DOMContentLoaded', async () => {
  if (!token) {
    alert('Você precisa estar logado para acessar esta página');
    window.location.href = './login.html';
    return;
  }
});

document.getElementById('formSecurity').addEventListener('submit', async (event) => {
  event.preventDefault();

  const question1 = document.getElementById('question1').value;
  const question2 = document.getElementById('question2').value;
  const question3 = document.getElementById('question3').value;

  const answer1 = document.getElementById('answer1').value;
  const answer2 = document.getElementById('answer2').value;
  const answer3 = document.getElementById('answer3').value;

  try {
    const response = await fetch('http://localhost:3000/secQuestions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ question1, question2, question3, answer1, answer2, answer3 })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao cadastrar perguntas de segurança');
    }

    const data = await response.json();
    alert('Perguntas cadastradas com sucesso!')
    window.location.href = './login.html';

  } catch (error) {
    console.error('Erro:', error);
    alert(error.message || 'Erro ao fazer cadastro das perguntas')
  }

});