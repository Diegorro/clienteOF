import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';


declare var $:any;

@Component({
selector:'LaCuenta',
templateUrl:'./LaCuenta.html',
providers:[GetService],
})


export class LaCuentaComponent implements OnInit {

  final_data: any[]=[];
  final_datas: any[]=[];
  Mesa:Number=0;
  locaCuenta:string='';
  locaComanda:string='';
  locaTermino:string='';
  CountComandaL:number=0;
  CountFinishL:number=0;

  constructor(private activatedRoute: ActivatedRoute, private _getService:GetService){

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];

      this.locaCuenta='/LaCuenta/dnE6XnhrjrU_/'+local;
      this.locaComanda='/Comandas/dnE6XnhrjrU_/'+local;
      this.locaTermino='/TerminadosCocina/dnE6XnhrjrU_/'+local;
      this._getService.getCUenta(local,'0').subscribe(res=>{
        console.log(res);
        this.final_data=res.comanda;
        this.final_data.forEach((dat)=>{
          dat.platillos.forEach((mesaSelected)=>{
              //if(this.Mesa!=mesaSelected.Mesa)
          this.Mesa=mesaSelected.Mesa;
          });
          this.final_datas.push({
            fecha:+dat.fecha_Entrega.replace(' ','').replace(':','').replace('/','').replace('/',''),
            id:dat._id,
            Mesa:this.Mesa
          });
            console.log(this.final_data);
        });
        this.final_datas.sort(function(a, b){return a.fecha - b.fecha});
        console.log(this.final_data);
      })


        this._getService.getComandas(local).subscribe(data=>{
          this.CountComandaL=0;
          this.CountFinishL=0;
          data.forEach((childSnapshot) => {
            if(childSnapshot.Estatus==undefined){
              console.log(childSnapshot);
            this.CountComandaL+=+1;
          }
            if(childSnapshot.Estatus=='4'){
            console.log(childSnapshot);
            this.CountFinishL+=+1;
          }
        })
        })
});
  }

  ngOnInit(){

  }

btnBuscar_click(){

  var Code=(<HTMLInputElement>document.getElementById('txtCodesearch')).value;
  if(Code!='')
  {

    //(<HTMLElement>document.getElementById('contieneAll')).innerHTML='';
    this.final_data=[];
    this.final_datas=[];
    this.activatedRoute.params.subscribe((params: Params) => {
      let local = params['Esta'];
        console.log(local);
    this._getService.GetComandByCode(Code.toUpperCase(),local).subscribe(respuesta=>{
      this.final_data=[respuesta.ComandFounder];
      console.log(respuesta);
      this.final_data.forEach((dat)=>{
        this.final_datas.push({
          fecha:+dat.fecha_Entrega.replace(' ','').replace(':','').replace('/','').replace('/',''),
          id:dat._id
        });
      });
      this.final_datas.sort(function(a, b){return a.fecha - b.fecha});
      console.log(this.final_datas);

    });
});
}
}

getSum(code):number{
	 let sum = 0;
	 this.final_data.forEach(model => {
     if(code==model.codigoStr){
     model.platillos.forEach(prec=>{
       //console.log(prec);
       if(prec.precio!=undefined && prec.Estatus=='2' )
       sum += +prec.precio;
     });
}
	 });
	 return sum;
 }

 PayComand(comanda){

   this.activatedRoute.params.subscribe((params: Params) => {
     let tipo = params['typer'];
     let local = params['Esta'];
     this._getService.signUp(tipo,local).subscribe(
   respuestada=>{
     console.log(respuestada);
     if(respuestada.local.id_Menu.need_Code){
   this._getService.ValidaCode(comanda.codigoStr.toUpperCase(),respuestada.local.id_SQL).subscribe(
   response=>{
   if(response.coderFound==null){
console.log(response.coderFound);
    $('#alertBadCode').show();
   return;
   }
   else{
        (<HTMLInputElement>document.getElementById(comanda.codigoStr)).style.visibility='hidden';
     this._getService.payComanda(response.coderFound._id,comanda._id).subscribe(responde=>{
       console.log(responde);

     });
   }
//}
 });
}
else{
  (<HTMLInputElement>document.getElementById(comanda.codigoStr)).style.visibility='hidden';
this._getService.payComanda('',comanda._id).subscribe(responde=>{
 console.log(responde);

});
}
});
});
 }

}
