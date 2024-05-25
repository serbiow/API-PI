document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;

    try {
        const response = await fetch('http://localhost:3000/auth/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question1, question2, question3 })
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