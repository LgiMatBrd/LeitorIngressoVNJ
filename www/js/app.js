/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    console.log(str);
}


// ...additional event handlers here...

function thirdPartyEmulator() {
    alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function scan() {
    "use strict";
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
                    $.post('https://amigo.basquetejoinville.com.br/retaguarda/rsocio/leituraIngresso/' + result.text, function(res){
                        var resposta = JSON.parse(res);
                        if (resposta[0].RESPOSTA == 0) {
                            //alert(resposta[0].MENSAGEM);
                            document.getElementById("mensagemResposta").innerHTML = resposta[0].MENSAGEM;
                            setTimeout(scan, 2000); 
                        } else {
                            //alert(resposta[0].MENSAGEM);
                            document.getElementById("mensagemResposta").innerHTML = resposta[0].MENSAGEM;
                            setTimeout(scan, 2000);
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

    console.log(fName, "exit");
}


