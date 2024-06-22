document.getElementById('editTime').addEventListener('input', function (e) {
    var time = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos

    // Verifica se a hora está vazia ou não
    if (time.length > 0) {
        var formattedTime = time.slice(0, 2); // Formata as horas

        if (time.length > 2) {
            formattedTime += ':' + time.slice(2, 4); // Adiciona os minutos
        }

        e.target.value = formattedTime; // Atualiza o valor do campo com a versão formatada da hora
    } else {
        e.target.value = ''; // Limpa o campo se a hora estiver vazia
    }
});
