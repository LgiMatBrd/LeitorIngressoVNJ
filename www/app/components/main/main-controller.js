"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.auth = shared.info.auth;

    this.toggle = angular.noop;

    this.title = $state.current.title;

    this.scan = function() {
        var fName = "scan():";
        console.log(fName, "entry");
        try { 
            if (window.tinyHippos) {
                thirdPartyEmulator();
                console.log(fName, "emulator alert");
            } else {
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        //console.log(fName, "Leitura compelta!");
                        //alert("Código recebido!\n" + "Resultado: " + result.text + "\n" + "Formato: " + result.format + "\n");
                        //scan();
                        $.post('https://amigo.basquetejoinville.com.br/retaguarda/rsocio/leituraIngresso/123', function(res){
                            var resposta = JSON.parse(res);
                            if (resposta[0].RESPOSTA == 0) {
                                ctrl.mensagemRetornoTitulo = "Resposta:";
                                ctrl.mensagemRetorno = resposta[0].MENSAGEM;
                                //document.getElementById("mensagemResposta").innerHTML = resposta[0].MENSAGEM;
                                //setTimeout(scan, 2000); 
                            } else {
                                ctrl.mensagemRetornoTitulo = "Resposta:";
                                ctrl.mensagemRetorno = resposta[0].MENSAGEM;
                                //document.getElementById("mensagemResposta").innerHTML = resposta[0].MENSAGEM;
                                //setTimeout(scan, 2000);
                            }
                        });
                    },
                    function (error) {
                        alert("Falha na leitura: " + error);
                    }
                );
            }
        } catch (e) {
            console.log(fName, "catch, failure");
        }

        $timeout(function() { ctrl.mensagemRetorno = ""; }, 2000);
        console.log(fName, "exit");
    }

    this.isOpen = function() { return false };
    $mdComponentRegistry
    .when("left")
    .then( function(sideNav){
      ctrl.isOpen = angular.bind( sideNav, sideNav.isOpen );
      ctrl.toggle = angular.bind( sideNav, sideNav.toggle );
    });

    this.toggleRight = function() {
    $mdSidenav("left").toggle()
        .then(function(){
        });
    };

    this.close = function() {
    $mdSidenav("right").close()
        .then(function(){
        });
    };
});
