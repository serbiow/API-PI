document.getElementById('recoverPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:3000/auth/password/recover', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        alert('Email de recuperação enviado com sucesso.');
    } else {
        const data = await response.json();
        alert(`Erro: ${data.message}`);
    }
});
