import { useState } from "react";

const Login = () => {

    [email, setEmail] = useState("")
    [password, setPassword] = useState("")

    function login(email, password) {
        try {
            const response = fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido!');
                window.location.href = '/Home';
            } else {
                alert(data.message || 'Falha no login');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao fazer login');
        }
    }

    return (
        <>
                <input onChange={(event) =>{setEmail(event.target.value)}} type="email" name="email" id="email" />
                <input onChange={(event) =>{setPassword(event.target.value)}} type="password" name="password" id="password" />
                <button onClick={() => login(email, password)}>Login</button>
        </>
    )
}

export default Login;