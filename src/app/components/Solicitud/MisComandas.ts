import { Component, OnInit, Pipe } from '@angular/core';
import { Routes, ActivatedRoute, Params } from '@angular/router';
import { GetService } from '../../Services/primerRequest';
import { Observable } from 'rxjs';
//import {TabsModule} from "ng2-tabs";

declare var $: any;

@Component({
  selector: 'MisComandas',
  templateUrl: './Miscomandas.html',
  providers: [GetService]
})

@Pipe({
  name: "orderByChild"
})

export class ComandasComponent implements OnInit {
  MyComanda: boolean;
  final_data: any[] = [];
  order: any[] = [];
  final_datas: any[] = [];
  keys: string[];
  llave: string;
  modals: any[] = [];
  locaCuenta: string = '';
  locaComanda: string = '';
  locaTermino: string = '';
  CountComandaC: number = 0;
  CountFinishC: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private _getService: GetService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];

      if (tipo && local) {
        this.locaCuenta = '/LaCuenta/dnE6XnhrjrU_/' + local;
        this.locaComanda = '/Comandas/dnE6XnhrjrU_/' + local;
        this.locaTermino = '/TerminadosCocina/dnE6XnhrjrU_/' + local;
        console.log(this.locaTermino);
        this.final_data = [];
        this.keys = [];
        var date_ = new Date();
        let month = '' + (date_.getMonth() + 1);
        let day = '' + date_.getDate();
        let year = date_.getFullYear();
        let hour = date_.getHours();
        let minute = date_.getMinutes().toString();

        if (minute.length < 2) minute = '0' + minute;
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var fechaSolicitado = [day, month, year].join('/') + ' ' + hour + minute;
        var solodia = fechaSolicitado.split(' ');

        this._getService.getComandas(local).subscribe(data => {
          this.CountComandaC = 0;
          this.CountFinishC = 0;
          this.final_data = [];
          this.final_datas = [];
          data.forEach((childSnapshot) => {
            console.log(childSnapshot);

            if (childSnapshot.Estatus == '4') {
              console.log(childSnapshot);
              this.CountFinishC += +1;
            }
            this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {

              if((snap[0].Estatus=='0'||snap[0].Estatus=='1')&& snap[0].isCode!=undefined){
              //  if(childSnapshot.Mesa!=undefined)
              this.CountComandaC+=+1;
            }

              var aunatiempo = "alert alert-success alert-dismissible fade in";
              if (snap[0] != undefined) {
                if (snap[0].fechaCreado != undefined) {
                  var yatarde = snap[0].fechaCreado.split(' ');
                  var hora = yatarde[1].replace(':', '');


                  let horahoy = +solodia[1];
                  if (horahoy - +hora >= 10) {
                    aunatiempo = "alert alert-warning alert-dismissible fade in";
                  }
                }

                if (snap[0].FechaEntregado != undefined) {

                  this.final_data.push({
                    snap,
                    codigo: childSnapshot.$key,
                    mesa: snap[0].Mesa,
                    isCode: childSnapshot.isCode,
                    yatardo: aunatiempo,
                    fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    Estatus: childSnapshot.Estatus,
                    FechaEntregado: this._getService.formatoDate(childSnapshot.FechaEntregado)//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                  });



                  this.final_datas.push({
                    fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    id: childSnapshot.$key
                  });

                  //snap.forEach((dontWork) => {
                  //  console.log(dontWork);
                  //if(dontWork.Estatus=='0'){

                  //this.final_data.push({
                  //  Estatus:'0',
                  //  //FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                  //codigo:childSnapshot.$key,
                  //mesa:snap[0].Mesa,
                  //iscode:snap[0].isCode,
                  //yatardo:aunatiempo,
                  //fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
                  //});
                  //}
                  //});







                }


                else {
                  if (snap[0].fechaCreado != undefined) {
                    this.final_data.push({
                      snap,
                      codigo: childSnapshot.$key,
                      mesa: snap[0].Mesa,
                      isCode: childSnapshot.isCode,
                      yatardo: aunatiempo,
                      fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                      Estatus: childSnapshot.Estatus,
                      //FechaEntregado:childSnapshot.FechaEntregado.replace(' ','').replace(':','').replace('/','').replace('/',''),
                    });

                    var noCofirm = false;
                    var snaper = new Array();
                    var ifConfirm = false;
                    snap.forEach((dontWork) => {
                      if ((dontWork.Estatus == '0' || dontWork.Estatus == '1') && childSnapshot.FechaEntregado != undefined) {
                        if (dontWork.isconfirm == undefined) {
                          noCofirm = true;
                        }
                        snaper.push(dontWork);
                      }
                    });

                    if (snaper.length > 0) {
                      if (noCofirm) {
                        this.final_data.push({
                          Estatus: '0',
                          //  FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                          codigo: childSnapshot.$key,
                          mesa: snap[0].Mesa,
                          isCode: !noCofirm,//childSnapshot.isCode,
                          yatardo: aunatiempo,
                          fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                          isconfirm: 1,
                          snap: snaper
                        });
                      }
                      else {
                        this.final_data.push({
                          Estatus: '0',
                          //  FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                          codigo: childSnapshot.$key,
                          mesa: snap[0].Mesa,
                          isCode: !noCofirm,//childSnapshot.isCode,
                          yatardo: aunatiempo,
                          fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                          snap: snaper
                        });
                      }
                    }


                    this.final_datas.push({
                      fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                      id: childSnapshot.$key
                    });
                    //console.log(this.final_data);
                  }
                }

                this.final_datas.sort(function(a, b) { return a.fecha - b.fecha });

              }

            });


          });
        })

      }
    });
  }


  ngOnInit() {
  }

  getSum(code): number {
    let sum = 0;
    this.final_data.forEach(model => {
      if (code == model.codigo) {
        model.snap.forEach(prec => {
          console.log(prec);
          if (prec.precio != undefined)
            sum += +prec.precio;
        });
      }
    });
    return sum;
  }


  toWork(Codigo, id, Comanda) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      this._getService.BeginWorkPlato(local, Codigo, id);

      Comanda.snap.forEach((toSave) => {
        if (toSave.isconfirm != undefined) {
          var idMongo = localStorage.getItem('ComandaLevantada');
          toSave.Estatus = '2';
          this._getService.setNewplato(idMongo, toSave).subscribe(respuesta => {
            console.log(respuesta);
          });
        }
      });
      //aqui hay que guardar las que entraron cuando se entrego el plato
    });
  }


  EntregaOrden(Comanda) {

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      var snaper = new Array();
      Comanda.snap.forEach((dontWork) => {
        if (dontWork.Cantidad != undefined) {

          snaper.push(dontWork);
        }
      });
      Comanda.snap = snaper;
      this._getService.setComandaEntregada(local, Comanda.codigo, Comanda, Comanda.snap[0].$key).subscribe(respuesta => {
        if (respuesta.Comandas._id != undefined) {
          console.log(respuesta.Comandas._id)
          localStorage.setItem('ComandaLevantada', respuesta.Comandas._id);
        }
      });

    });
    console.log(this.CountComandaC);
    //if(this.CountComandaC>0)
    //this.CountComandaC=this.CountComandaC-1;
  }

  getOthersComand(valorSelected) {
    if (valorSelected == '1')
      this.constructor(this.activatedRoute, this._getService);


    else {
      if (valorSelected == '4') {
        this.activatedRoute.params.subscribe((params: Params) => {
          let tipo = params['typer'];
          let local = params['Esta'];
          this.final_data = [];
          this.final_datas = [];
          this._getService.GetListComandaEstatus(local, valorSelected).subscribe(respuesta => {
            var datos: any[] = [];
            this.final_datas = [];
            respuesta.forEach((childSnapshot) => {
              if (childSnapshot.Estatus == valorSelected) {
                var snap = new Array();
                $.each(childSnapshot, function(index, item) {
                  if (this.id != undefined) {
                    snap.push(item);
                  }

                });
                if (childSnapshot.FechaEntregado != undefined) {
                  datos.push({
                    //this,
                    snap,
                    codigo: childSnapshot.$key,
                    mesa: snap[0].Mesa,
                    iscode: false,
                    //yatardo:aunatiempo,
                    fecha: snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    Estatus: childSnapshot.Estatus,
                    FechaEntregado: childSnapshot.FechaEntregado.replace('T', ' ').replace('Z', '')//.replace('/','').replace('/',''),
                  });
                }
                else {
                  datos.push({
                    //this,
                    snap,
                    codigo: childSnapshot.$key,
                    mesa: snap[0].Mesa,
                    isCode: false,
                    //yatardo:aunatiempo,
                    fecha: snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    Estatus: childSnapshot.Estatus,
                    //FechaEntregado:childSnapshot.FechaEntregado.replace('T',' ').replace('Z','')//.replace('/','').replace('/',''),
                  });
                }

                this.final_datas.push({
                  fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                  id: childSnapshot.$key
                });

              }
            })
            this.final_data = datos;
          });
        });
      }
      else {
        this.constructor(this.activatedRoute, this._getService);
      }
    }
  }

  ConfirmOrder(Comanda) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      if (Comanda.isconfirm == undefined)
        this._getService.AcceptOrder(local, Comanda.codigo, Comanda.snap[0].$key);
      else {
        //this._getService.setComandaEntregada(local,Comanda.codigo,Comanda,1);
        Comanda.snap.forEach((childSnapshot) => {
          this._getService.AcceptOrderEntregada(local, Comanda.codigo, childSnapshot.$key);
        });
      }

      this.constructor(this.activatedRoute, this._getService)

    });
  }

  declinComand(Comanda, tambienBloqueo) {

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      if (tambienBloqueo) {
        //aqui meter el q si lo declina meter una cookie o local storage para que no pueda levantar ordenes solo en locales que no ocupan codigo
        var d = new Date();
        d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d['toGMTString']();
        document.cookie = "sendValue" + "=" + Comanda.codigo + "_" + local + ";" + expires + ";path=/";
      }

      this._getService.declineComand(local, Comanda.codigo);
      this.modals = [];
    });
    $('#MymodalDecline').modal('hide');

  }

  AbrePopDecline(Comanda) {
    $('#MymodalDecline').modal('show');
    this.modals = Comanda;
  }

  abreCampo(code, llave) {
    //  $('#'+code).css('visibility', 'visible');
    this.llave = llave;
    document.getElementById(code).style.visibility = "visible";
    document.getElementById('btn_' + code).style.visibility = "visible";
    $("html, body").delay(1000).animate({ scrollTop: $('#btn_' + code).offset().top }, 2000);
  }

  CancelPlatillo(Codigo, id) {
    var comentario = (<HTMLInputElement>document.getElementById(Codigo)).value;
    if (comentario != '') {
      this.activatedRoute.params.subscribe((params: Params) => {
        let tipo = params['typer'];
        let local = params['Esta'];

        this._getService.cancelPlato(local, Codigo, id, comentario);


      });
    }
  }

}
