import {Component, OnInit,Pipe} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import { Observable } from 'rxjs';
//import {TabsModule} from "ng2-tabs";

declare var $:any;

@Component({
selector:'FinishCocina',
templateUrl:'./FinishCocina.html',
providers:[GetService]
})

export class FinishCocinaComponent implements OnInit
 {

MyComanda:boolean;
final_data: any[]=[];
order: any[]=[];
final_datas: any[]=[];
keys: string[];
llave:string;
locaCuenta:string='';
locaComanda:string='';
locaTermino:string='';
CountComanda:number=0;
CountFinish:number=0;


constructor(private activatedRoute: ActivatedRoute, private _getService:GetService)
{
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];

    if(tipo && local){
      this.locaCuenta='/LaCuenta/dnE6XnhrjrU_/'+local;
      this.locaComanda='/Comandas/dnE6XnhrjrU_/'+local;
      this.locaTermino='/TerminadosCocina/dnE6XnhrjrU_/'+local;
      this.final_data= [];
      this.keys = [];
      var date_=new Date();
      let  month = '' + (date_.getMonth() + 1);
      let  day = '' + date_.getDate();
      let  year = date_.getFullYear();
      let  hour= date_.getHours();
      let  minute=date_.getMinutes().toString();

        if (minute.length < 2) minute = '0' + minute;
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      var fechaSolicitado= [day,month,year ].join('/')+' '+hour+minute;
  var solodia=fechaSolicitado.split(' ');

  this._getService.getComandas(local).subscribe(data=>{
    this.CountComanda=0;
    this.CountFinish=0;
  this.final_data= [];
  this.final_datas= [];
  this.order= [];
  data.forEach((childSnapshot) => {
      console.log(childSnapshot);

    if(childSnapshot.Estatus=='4'){
    this.CountFinish+=+1;
  }
  if(childSnapshot.callMesero!=undefined)
  {
    this.order.push({
      Mesa:childSnapshot.Mesa,
      Codigo:childSnapshot.$key,
      mesero:childSnapshot.callMesero
    });
  }

console.log(this.order);

  this._getService.ComandasGetCode(local,childSnapshot.$key).subscribe(snap=>{

    if((snap[0].Estatus=='0'||snap[0].Estatus=='1')&& snap[0].isCode!=undefined){
    //  if(childSnapshot.Mesa!=undefined)
    this.CountComanda+=+1;
  }

  var aunatiempo="alert alert-success alert-dismissible fade in";
  if(snap[0] != undefined){
  if(snap[0].fechaCreado!=undefined){
  var yatarde=snap[0].fechaCreado.split(' ');
  var hora=yatarde[1].replace(':','');


  let horahoy= +solodia[1];
  if(horahoy-+hora>=10){
aunatiempo="alert alert-warning alert-dismissible fade in";
}
}

if(childSnapshot.FechaEntregado!=undefined)
{

  var snaper =new Array();
  snap.forEach((dontWork) => {
  if((dontWork.Estatus!='0'||dontWork.Estatus!='1') && childSnapshot.FechaEntregado!=undefined){
  snaper.push(dontWork);
  }
  });

  this.final_data.push({
      Estatus:childSnapshot.Estatus,
    FechaEntregado:childSnapshot.FechaEntregado,//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
    codigo:childSnapshot.$key,
    mesa:snap[0].Mesa,
    iscode:snap[0].isCode,
    yatardo:aunatiempo,
    fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
        snap:snaper


  });
  this.final_datas.push({
    fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
    id:childSnapshot.$key
  });
}


else{
if(snap[0].fechaCreado!=undefined){
  this.final_data.push({
    snap,
    codigo:childSnapshot.$key,
    mesa:snap[0].Mesa,
    iscode:snap[0].isCode,
    yatardo:aunatiempo,
    fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
    Estatus:childSnapshot.Estatus,
  //  FechaEntregado:childSnapshot.FechaEntregado.replace(' ','').replace(':','').replace('/','').replace('/',''),
  });
  this.final_datas.push({
    fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
    id:childSnapshot.$key
  });
}
}

this.final_datas.sort(function(a, b){return a.fecha - b.fecha});
console.log(this.final_data);

}

    });

      });
  })
  }
  });
}

VaMese(code){
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.VaMesero(local,code);


});
}

declinComand(Comanda)
{
  console.log(Comanda);
  var existenPedidos=false;
  Comanda.snap.forEach((dontWork) => {
    if(dontWork.Estatus!=undefined)
    {
      if(dontWork.Estatus=="0"||dontWork.Estatus=="1"){
        existenPedidos=true;
      }
    }
  });
  if(existenPedidos){
    if(confirm("Aun hay platillos preparandose, se se finaliza se eliminara la comanda de pantalla, ¿desea continuar?")){
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.declineComand(local,Comanda.codigo);


});
}
}
else{
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.declineComand(local,Comanda.codigo);


});
}
//if(this.CountFinish>0)
//this.CountFinish=this.CountFinish-1;
}


ngOnInit(){
}




}
