document.getElementById('editDate').addEventListener('input', function (e) {
    var date = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos

    // Verifica se a data está vazia ou não
    if (date.length > 0) {
        var formattedDate = date.slice(0, 2); // Formata o mês

        if (date.length > 2) {
            formattedDate += '/' + date.slice(2, 4); // Adiciona o dia

            if (date.length > 4) {
                formattedDate += '/' + date.slice(4, 8); // Adiciona o ano
            }
        }

        e.target.value = formattedDate; // Atualiza o valor do campo com a versão formatada da data
    } else {
        e.target.value = ''; // Limpa o campo se a data estiver vazia
    }
});
