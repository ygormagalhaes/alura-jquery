function iniciaFraseAleatoria() {
    $("#botao-frase").click(obtemFraseAleatoria);
}

function obtemFraseAleatoria() {
    $("#spinner").toggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(trataErro)
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var indexAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[indexAleatorio].texto);
    
    inicializaContagemPalavras();

    var tempo = data[indexAleatorio].tempo;
    atualizaTempo(tempo);
}

function atualizaTempo(tempo) {
    tempoInicial = tempo;
    var labelTempo = $("#contador-segundos");
    labelTempo.text(tempo);
}

function trataErro() {
    $(".erro").toggle();
    setTimeout(function() {
        $(".erro").toggle();
    }, 2500);
}

function iniciaFraseEspecifica() {
    $("#botao-id").click(buscaFraseEspecifica);
}

function buscaFraseEspecifica() {
    $("#spinner").toggle();

    var idEscolhido = $("#campo-id").val();
    var dadoId = {
        id: idEscolhido
    }

    $.get("http://localhost:3000/frases", dadoId, atualizaFraseEspecifica)
    .fail(trataErro)
    .always(function() {
        $("#spinner").toggle();
    });
}

function atualizaFraseEspecifica(data) {
    var frase = $(".frase");
    frase.text(data.texto);

    inicializaContagemPalavras();

    atualizaTempo(data.tempo);
}