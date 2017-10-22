var campoTexto =  $("#campo-texto");
var tempoInicial = $("#contador-segundos").text();

$(function () {
    inicializaContagemPalavras();
    inicializarContagemDigitacao();
    inicializarCronometro();
    $("#botao-reiniciar").click(reiniciarJogo);
    inicializaMarcador();
    exibePlacar();
    iniciaFraseAleatoria();
    obtemFraseAleatoria();
    iniciaFraseEspecifica();
    inicializaSync();
    buscaPlacar();
});

function inicializaContagemPalavras() {
    var spanNumero = $("#numero-palavras");
    var qtdPalavras = $(".frase").text().split(" ").length;

    spanNumero.text(qtdPalavras);
}

function inicializarContagemDigitacao() {
    campoTexto.on("input", function() {
        var fraseDigitada = campoTexto.val();
        var contPalavras = fraseDigitada.split(/\S+/).length - 1;

        $("#contador-palavras").text(contPalavras);
        $("#contador-caracteres").text(fraseDigitada.length);
    });
}

function inicializarCronometro() {

    campoTexto.addClass("borda-preta");

    campoTexto.one("focus", function() {
        var contadorSegundos = $("#contador-segundos").text();
        
        $("#botao-reiniciar").attr("disabled", true);

        var id = setInterval(function() {
            contadorSegundos--;
            $("#contador-segundos").text(contadorSegundos);
    
            if (contadorSegundos == 0) {
                clearInterval(id);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campoTexto.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campoTexto.toggleClass("campo-desativado");
    adicionaPlacar();
}

function reiniciarJogo() {
    campoTexto.attr("disabled", false);
    campoTexto.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#contador-segundos").text(tempoInicial);
    campoTexto.toggleClass("campo-desativado");
    inicializarCronometro();
    campoTexto.removeClass("borda-verde");
    campoTexto.removeClass("borda-vermelha");
    campoTexto.addClass("borda-preta");
}

function inicializaMarcador() {
    campoTexto.on("input", function () {
        var frase = $(".frase").text();
        campoTexto.removeClass("borda-preta");

        var fraseDigitada = campoTexto.val();
    
        if (frase.startsWith(fraseDigitada)) {
            campoTexto.addClass("borda-verde");
            campoTexto.removeClass("borda-vermelha");
        } else {
            campoTexto.addClass("borda-vermelha");
            campoTexto.removeClass("borda-verde");
        }
    });
}