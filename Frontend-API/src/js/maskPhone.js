document.getElementById('phone').addEventListener('input', function (e) {
    var phone = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    
    // Verifica se o número de telefone está vazio ou não
    if (phone.length > 0) {
        var formattedPhone = '(' + phone.slice(0, 2) + ')'; // Formata o código de área
        
        if (phone.length > 2) {
            formattedPhone += phone.slice(2, 7); // Adiciona os próximos 5 dígitos do número
            
            if (phone.length > 7) {
                formattedPhone += '-' + phone.slice(7, 11); // Adiciona os 4 últimos dígitos do número
            }
        }
        
        e.target.value = formattedPhone; // Atualiza o valor do campo com a versão formatada do número de telefone
    } else {
        e.target.value = ''; // Limpa o campo se o número de telefone estiver vazio
    }
});
