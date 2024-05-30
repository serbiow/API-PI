document.getElementById('searchEmail').addEventListener('submit', async (e) =>{
    e.preventDefault();

    const email = document.getElementById('email').value;

    // FIXME:
    // Essa rota aqui não funciona pq o /user do app requer o token jwt
    const response = await fetch('http://localhost:3000/user/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
        alert('Email encontrado');
    } else {
        alert(`Erro: ${data.message}`);
    }
})

// TODO:
// Esse código é pra recuperar a senha
// A ideia é que após o email ser encontrado no banco, chame um modal ou algo do tipo pra executar esse bloco
// Ele ainda não ta feito, ta um parâmetro de email, mas vai ser passado as security questions e answers

// document.getElementById('recoverPasswordForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const email = document.getElementById('email').value;

//     const response = await fetch('http://localhost:3000/auth/password/recover', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//     });

//     if (response.ok) {
//         alert('Email de recuperação enviado com sucesso.');
//     } else {
//         const data = await response.json();
//         alert(`Erro: ${data.message}`);
//     }
// });
