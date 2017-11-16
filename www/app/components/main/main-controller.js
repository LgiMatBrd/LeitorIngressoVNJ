angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;
    this.auth = shared.info.auth;
    this.toggle = angular.noop;
    this.title = $state.current.title;
 
    $scope.mensagemRetornoTitulo = "Resposta:";
    $scope.mensagemRetorno = "";
    
    $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan( 
            function (result) {
                //alert("Código recebido!\n" + "Resultado: " + result.text + "\n" + "Formato: " + result.format + "\n");
                $.post('https://amigo.basquetejoinville.com.br/retaguarda/rsocio/leituraIngresso/' + result.text, function(res){
                    var resposta = JSON.parse(res);
                    console.dir(resposta);
                    if (resposta[0].RESPOSTA == 0) {
                        alert(resposta[0].MENSAGEM);
                        //$scope.mensagemRetornoTitulo = "Resposta:";
                        //$scope.mensagemRetorno = resposta[0].MENSAGEM;
                        setTimeout(scan, 1); 
                    } else {
                        alert(resposta[0].MENSAGEM);
                        //$scope.mensagemRetornoTitulo = "Resposta:";
                        //$scope.mensagemRetorno = resposta[0].MENSAGEM;
                        setTimeout($scope.scan, 1);
                    }
                });
            },
            function (error) {
                alert("Falha na leitura: " + error);
            });
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
