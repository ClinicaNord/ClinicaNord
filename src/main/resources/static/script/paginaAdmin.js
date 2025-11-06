    if(!usuarioLogado || usuarioLogado.tipo === 2) {
        alert("Acesso negado. Você não esta logado");
        window.location.href = "index.html";
    }