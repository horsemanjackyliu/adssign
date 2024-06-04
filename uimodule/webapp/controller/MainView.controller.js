sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox", "sap/base/Log", "sap/ui/model/json/JSONModel", "sap/base/security/URLWhitelist"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Log, JSONModel, URLWhitelist) {
        "use strict";

        return Controller.extend("com.sap.adssign.controller.MainView", {
            onInit: function () {

            },
            pressRenderSign: function () {
                const printd = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><form1><LabelForm><DeliveryId>80000010</DeliveryId><Position>10</Position><MaterialNo>RAOW01</MaterialNo><Quantity>100</Quantity><Package>1</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm><sign/></form1>";
                const printdb64 = btoa(printd);
               const pdfcontent = JSON.stringify( {
                    embedFont: 0,
                    formLocale: "en_US",
                    formType: "interactive",
                    taggedPdf: 1,
                    xdpTemplate: "labelprint4/labelprint4",
                    xmlData: printdb64
                 });
                 const myHeaders = new Headers();
                 myHeaders.append("Content-Type", "application/json");
                 let requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: pdfcontent,
                  redirect: 'follow'
                };
                fetch("/adobeapi/v1/adsRender/pdf?templateSource=storageName", requestOptions).then(response => response.json() ).then( jbody => {
                  const signBody = {
                    "credentialAlias": "jackysignature",
                    "signatureFieldName": "SignatureField1",
                     "reasonInfo": "approval",
                     "locationInfo": "Shanghai",
                     "contactInfo": "jacky.liu02@sap.com",
                     "pdf":  jbody.fileContent
                  };
                  requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(signBody),
                    redirect: 'follow'
                  };
                  fetch("/adobeapi/v1/pdf/adsSet/signature",requestOptions).then(response1 => response1.json() ).then( jbody1 => {
                    const deccont = atob(jbody1.fileContent) ;
                    const byteNumbers = new Array(deccont.length);
                    for (let i = 0; i < deccont.length; i++) {
                        byteNumbers[i] = deccont.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], {type: "application/pdf"});
                    const pdfDocumentURL = URL.createObjectURL(blob);
                    this._pdfModel = new JSONModel({
                      Source: pdfDocumentURL,
                      Title: "pdf document",
                      Height: "600px"
                    });
                    URLWhitelist.add("blob");
                    this.byId("pdfview").setModel(this._pdfModel);
                   }).catch( error => {
                     console.log('error', error);
                  });
                  })
              },
            pressRender: function () {
              const printd = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><form1><LabelForm><DeliveryId>Mirum est ut animus agitatione motuque corporis excitetut.</DeliveryId><Position>Ego ille</Position><MaterialNo>Si manu vacuas</MaterialNo><Quantity>Apros tres et quidem</Quantity><Package>Mirum est</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm><LabelForm><DeliveryId>Ad retia sedebam: erat in proximo non venabulum aut lancea, sed stilus et pugilares:</DeliveryId><Position>Licebit auctore</Position><MaterialNo>Proinde</MaterialNo><Quantity>Am undique</Quantity><Package>Ad retia sedebam</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm><LabelForm><DeliveryId>meditabar aliquid enotabamque, ut, si manus vacuas, plenas tamen ceras reportarem.</DeliveryId><Position>Vale</Position><MaterialNo>Ego ille</MaterialNo><Quantity>Si manu vacuas</Quantity><Package>Apros tres et quidem</Package><QRCode>01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789</QRCode></LabelForm></form1>";
              const printdb64 = btoa(printd);

             const pdfcontent = JSON.stringify( {
                  embedFont: 0,
                  formLocale: "en_US",
                  formType: "interactive",
                  taggedPdf: 1,
                  xdpTemplate: "labelprint3/labelprint3",
                  xmlData: printdb64
               });

               const myHeaders = new Headers();
               myHeaders.append("Content-Type", "application/json");

               const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: pdfcontent,
                redirect: 'follow'
              };

              fetch("/adobeapi/v1/adsRender/pdf?templateSource=storageName", requestOptions).then(response => response.json() ).then( jbody => {
                const deccont = atob(jbody.fileContent) ;
                const byteNumbers = new Array(deccont.length);

                for (let i = 0; i < deccont.length; i++) {
                    byteNumbers[i] = deccont.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], {type: "application/pdf"});
                const pdfDocumentURL = URL.createObjectURL(blob);
                this._pdfModel = new JSONModel({
                  Source: pdfDocumentURL,
                  Title: "pdf document",
                  Height: "600px"
                });
                URLWhitelist.add("blob");
                this.byId("pdfview").setModel(this._pdfModel);
               }).catch( error => {
                 console.log('error', error);
              });
            }
        });
    });
