import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class GetService{
public url:string;
public identity;
public token;
ComandasGet: Observable<any[]>;
ComandasGetCodes: Observable<any[]>;
MyComanda:any[]=[];
final_data: Array<any> = [];

constructor(private _http: Http, private afDB:AngularFireDatabase)
{
this.url=GLOBAL.url;
}


 signUp(tipe_Local, idLocal)
{
	//let json=JSON.stringify({typer:'dnE6XnhrjrU=',Esta:'9YiXOJhlzhk='});
	let json=JSON.stringify({typer:tipe_Local,Esta:idLocal});
	let params=json;//'dnE6XnhrjrU=/9YiXOJhlzhk=';
	//let headers=new Headers({'Acces-Controll-Allow-Origin':'*','content-type':'application/json','Cache-Control':'No-Cache'});
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'getordereasy/'+tipe_Local+'/'+idLocal, params, {headers:headers})
	            .map(res=>res.json());

}

removeOrder(local,codigo){
  //this.afDB.object('/VROckX8bGB8=/'+codigo).remove();
}

getCUenta(local,codigo){
  let params=JSON.stringify({Local:local, codigo:codigo});
  let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'myCount', params, {headers:headers})
	            .map(res=>res.json());
}

setComandaEntregada(local,codigo,comanda, id){
var d = new Date();
let date=this.formatoDate(d.toString());
console.log(date);
  //this.afDB.object('/VROckX8bGB8=/'+codigo).remove();
  let promise=this.afDB.object(local+'/'+codigo+'/')
  .update({Estatus:"4",FechaEntregado:date});

//  let promisa=this.afDB.object(local+'/'+codigo+'/'+id)
  //.update({Estatus:"4"});

  let params=JSON.stringify({codigoStr:codigo,local:local,platillos:comanda.snap,Fecha_Creada:comanda.snap[0].fechaCreado, fecha_Entrega:date, Estatus:4 });
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'SetComandas', params, {headers:headers})
	            .map(res=>res.json());
}

payComanda(codigo,idCOmanda){

  let params=JSON.stringify({id:idCOmanda,Codigo:codigo });
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'PayComand', params, {headers:headers})
	            .map(res=>res.json());

}


GetComandByCode(code, local){
    console.log('x aca servicio');
  let params=JSON.stringify({code:code,Local:local});
	let headers=new Headers({'content-type':'application/json'});
  console.log(params);
	return this._http.post(this.url+'GetComandByCode', params, {headers:headers})
	            .map(res=>res.json());
}

ValidaCode(Codigin, locals){
	let params=JSON.stringify({code:Codigin,Local:locals});
  console.log(params);
	let headers=new Headers({'content-type':'application/json'});
  console.log(Codigin);
	return this._http.post(this.url+'VerifyCode/'+Codigin+'/'+locals, params, {headers:headers})
	            .map(res=>res.json());
}

setNewplato(id,platillo){
  let params=JSON.stringify({id:id,fechaCreado:platillo.fechaCreado,Platillo:platillo.Platillo,Mesa:platillo.Mesa,Estatus:platillo.Estatus,Cantidad:platillo.Cantidad, precio:platillo.precio});
  let headers=new Headers({'content-type':'application/json'});
  return this._http.post(this.url+'newPlatillo', params, {headers:headers})
              .map(res=>res.json());

}

getSixLocals(){
//let params=JSON.stringify(user_Update);
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'updateUser/', {headers:headers})
	            .map(res=>res.json());
}


getIdentity(){
	let identity=JSON.parse(localStorage.getItem('identity'));
	if(identity!="undefined"){
		this.identity=identity;
	}
	else
	{
		this.identity=null;
	}
	return this.identity;
}
getToken(){
	let token=localStorage.getItem('token');
	if(token!='')
	{
	this.token=token;
	}
	else
		this.token=null

	return this.token;
}


formatoDate(date) {
	 var d = new Date(date.replace("GMT+0000","").replace("GMT+0100","")),
			 month = '' + (d.getMonth() + 1),
			 day = '' + d.getDate(),
			 year = d.getFullYear(),
       hour= '' +d.getHours(),
       minute='' +d.getMinutes();


	 if (month.length < 2) month = '0' + month;
	 if (day.length < 2) day = '0' + day;
   if (hour.length < 2) hour = '0' + hour;
   if (minute.length < 2) minute = '0' + minute;

	 return [day,month,year ].join('/')+' '+hour+':'+minute;
}



setComanda(Comanda,local,codigo, isCode, mesa):Observable<any[]>
{

  var date_=new Date();
let  month = '' + (date_.getMonth() + 1);
let  day = '' + date_.getDate();
let  year = date_.getFullYear();
let  hour= '' +date_.getHours();
let  minute='' +date_.getMinutes();


if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;
if (hour.length < 2) hour = '0' + hour;
if (minute.length < 2) minute = '0' + minute;

var fechaSolicitado= [day,month,year ].join('/')+' '+hour+':'+minute;

for(var i=0;i<Comanda.length;i++){
    let promesa =null;
  if(Comanda[i].tama==''){
    if(isCode){
   promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':'1', 'Mesa':mesa, 'isCode':true,'id':Comanda[i].id, fechaCreado:fechaSolicitado, 'precio':Comanda[i].precio});
}
else{
  promesa = this.afDB.list('/'+local+'/'+codigo)
 .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':'0', 'isCode':false,'id':Comanda[i].id, fechaCreado:fechaSolicitado , 'precio':Comanda[i].precio});
}
}
else
{
  if(isCode){
  promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':'1','tamaño':Comanda[i].tama, 'Mesa':mesa, 'isCode':true,'id':Comanda[i].id, fechaCreado:fechaSolicitado , 'precio':Comanda[i].precio});
}
else
{
  promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':'0','tamaño':Comanda[i].tama, 'isCode':false,'id':Comanda[i].id, fechaCreado:fechaSolicitado, 'precio':Comanda[i].precio});
}
}
 promesa
  .then(_ => console.log('success'))
  //  .catch(err => console.log(err, 'You dont have ac  cess!'));


}
return  this.afDB.list('/'+local+'/'+codigo);
}

getComandas( local ):Observable<any[]>{
//this.ComandasGet=this.afDB.list('/VROckX8bGB8=/28X587');
//this.ComandasGet=new Observable<any[]>();
//return this.afDB.list('/VROckX8bGB8=',{query:{orderByChild:'fechaCreado'}});
return this.afDB.list(local,{query:{orderByChild:'fechaCreado'}});

}
ComandasGetCode(local,codigo):Observable<any[]>{
  //console.log(local);
  //this.ComandasGetCodes=new Observable<any[]>();
  //this.ComandasGetCodes=
  return this.ComandasGetCodes=this.afDB.list(local+'/'+codigo);


}

VaMesero(local,Codigo){
  this.afDB.object(local+'/'+Codigo).
  update({callMesero:false});
}

callMesero(local,codigo,mesa)
{
  this.afDB.object(local+'/'+codigo).
  update({callMesero:true,Mesa:mesa});
}


AcceptOrder(local,codigo,id){
  let promesa = this.afDB.object(local+'/'+codigo)
 .update({isCode:true});
}


AcceptOrderEntregada(local,codigo,id){

  //let promesa = this.afDB.object(local+'/'+codigo)
 //.update({isCode:true});

 let promeson = this.afDB.object(local+'/'+codigo+'/'+id)
.update({isCode:true, isconfirm:1});
}

declineComand(local,codigo){
  let promise=this.afDB.list(local+'/'+codigo).remove();
}

cancelPlato(local,codigo,id, comentarioCancela)
{
    let promise=this.afDB.object(local+'/'+codigo+'/'+id)
    .update({Estatus:"3", comentario:comentarioCancela});
}


BeginWorkPlato(local,codigo,id){
  let promise=this.afDB.object(local+'/'+codigo+'/'+id)
  .update({Estatus:"2"});
}

updateOrQuitar(local,codigo,plato,opcion)
{
  this.afDB.list(local+'/'+codigo).subscribe(data=>{
    for(var p=0;p<data.length;p++){
      if(plato.id==data[p].id){
    this.afDB.object(local+'/'+codigo+'/'+data[p].$key)
   .update({Cantidad:plato.cantidad,Platillo:plato.Nombre+' ' +plato.Especificaciones,Estatus:opcion});
  }
    }
  });

}

GetListComandaEstatus(local,valorSelected){
return this.afDB.list(local+'/');//.subscribe(data=>{


}

}
