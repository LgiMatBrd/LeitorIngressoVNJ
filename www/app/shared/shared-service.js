"use strict";

angular.module("ngapp").service("shared", function(){ // One of The Ways To Share Informations Across the Controllers

    this.info = {
        title: "Leitor de ingressos móvel",
        auth: "Vou no Jogo - www.vounojogo.com.br"
    };
});
