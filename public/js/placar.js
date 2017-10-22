function adicionaPlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var numeroDePalavras = $("#contador-palavras").text();

    var nome = "Laurinha";

    var linha = criaLinhaPlacar(nome, numeroDePalavras);

    corpoTabela.prepend(linha);
    
    scrollPlacar();
}

function criaLinhaPlacar(nome, numeroDePalavras) {
    var linha = $("<tr>");
    var colunaNome = $("<td>").text(nome);
    var colunaPalavras = $("<td>").text(numeroDePalavras);
    var colunaRemover = $("<td>");

    var linkRemover = $("<a>").addClass("link-remover").attr("href", "#");
    var icone = $("<i>").addClass("material-icons").text("delete");

    linkRemover.append(icone);

    linkRemover.click(removerPlacar);

    colunaRemover.append(linkRemover);

    linha.append(colunaNome);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    
    return linha;
}

function removerPlacar() {
    event.preventDefault();
    
    var linha = $(this).parent().parent();
    linha.fadeOut(600);
    setTimeout(function() {
        linha.remove();
    }, 600);
}

function exibePlacar() {
    $("#botao-placar").click(function() {
        $(".placar").stop().slideToggle(600);
    });
}

function scrollPlacar() {
    var placar = $(".placar");
    placar.slideDown(600);

    var posicaoPlacar = placar.offset().top;

    console.log(posicaoPlacar);

    $("body, html").animate({
        scrollTop: posicaoPlacar + "px"
    }, 600);
}

function inicializaSync() {
    $("#botao-sync").click(sincronizaPlacar);
}

function sincronizaPlacar() {
    var linhasTabela = $("tbody > tr");
    var placar = [];

    linhasTabela.each(function() {
        var nome = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: nome,
            pontos: palavras
        };

        placar.push(score);
    });

    var objPlacar = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", objPlacar, function() {
        console.log("POST realizado.");
    });

}

function buscaPlacar() {
    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            var linha = criaLinhaPlacar(this.usuario, this.pontos);

            var corpoTabela = $(".placar").find("tbody");
            corpoTabela.prepend(linha);
        });
    });
}