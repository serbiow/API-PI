document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para acessar esta página');
        window.location.href = './login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            document.getElementById('name').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('phone').value = userData.phone;
            //document.getElementById('password').value = '';
        } else {
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = './login.html';
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao acessar o perfil');
    }
});

// const maskPhone = (value) => {
//     return value
//         .replace(/\D/g, "")
//         .replace(/(\d{2})(\d)/, "($1) $2")
//         .replace(/(\d{5})(\d)/, "$1-$2")
//         .replace(/(-\d{4})(\d+?)$/, "$1");
// };

// document.getElementById('phone').onchange((e) => setPhone(maskPhone(e.target.value)))