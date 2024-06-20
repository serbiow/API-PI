var questionsData;

document.getElementById('searchEmail').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    const response1 = await fetch('http://localhost:3000/auth/' + email, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response1.ok) {
        const errorData = await response1.json();
        alert(`Erro: ${errorData.message}`);
        return;
    }

    const userData = await response1.json();

    const response2 = await fetch('http://localhost:3000/recovery/' + userData.id, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (!response2.ok) {
        const errorData = await response2.json();
        alert(`Erro: ${errorData.message}`);
        return;
    }

    questionsData = await response2.json();

    if (response2.ok) {
        alert('Usuário encontrado');
        document.getElementById('security-question-1').value = questionsData.findedQuestions[0].question;
        document.getElementById('security-question-2').value = questionsData.findedQuestions[1].question;
        document.getElementById('security-question-3').value = questionsData.findedQuestions[2].question;
    } else {
        alert(`Erro: ${questionsData.message}`);
    }
})

// TODO:
// Esse código é pra recuperar a senha
// A ideia é que após o email ser encontrado no banco, chame um modal ou algo do tipo pra executar esse bloco
document.getElementById('confirmSecQuestionsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const answer1 = document.getElementById('security-answer-1').value;
    const answer2 = document.getElementById('security-answer-2').value;
    const answer3 = document.getElementById('security-answer-3').value;

    const hashedAnswer1 = questionsData.findedQuestions[0].answer;
    const hashedAnswer2 = questionsData.findedQuestions[1].answer;
    const hashedAnswer3 = questionsData.findedQuestions[2].answer;

    const response = await fetch('http://localhost:3000/auth/password/recover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer1, answer2, answer3, hashedAnswer1, hashedAnswer2, hashedAnswer3 }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Respostas de segurança verificadas. Você pode redefinir sua senha.');
        document.getElementById('resetPasswordForm').style.display = 'block';
        document.getElementById('recoverPasswordForm').style.display = 'none';
    } else {
        alert(`Erro: ${data.message}`);
    }
});

document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    let hasError = false;

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Confirme a senha.';
        hasError = true;
    }

    // Função para validar a senha
    function isValidPassword(newPassword) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(newPassword);
    }

    if (!isValidPassword(newPassword)) {
        document.getElementById('passwordError').textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas e minúsculas, números e símbolos.';
        hasError = true;
    }

    if (newPassword !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'As senhas não correspondem.';
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const response = await fetch('http://localhost:3000/auth/password/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, email: document.getElementById('email').value }),
    });

    if (response.ok) {
        alert('Senha redefinida com sucesso.');
        // document.getElementById('resetPasswordForm').style.display = 'none';
        window.location.href = './login.html';
    } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
    }
});
