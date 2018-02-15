import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';


declare var $:any;

//declare var myExtObject: any;

@Component({
selector:'OrdenoFacil',
templateUrl:'./OrdenoFacilVista.html',
providers:[GetService],
//styleUrls:['../../assets/css/animate-custom.css'
//,'../../assets/css/styles.css'],
 // ViewEncapsulation.None,
 //directives:[Routes]
})

export class OrdenoFacilComponent implements OnInit {
		public needCode:boolean;

	public titulo;
	public LocalGet:local;
	public recomendaciones:[local];
	public tiempos;
	public timessorted;
public intproducto;
public arregloPrTm;
public modals:any[] = [];//Array<{id:string, Nombre:string, descrip:string,precio:string,Active:number, Cate:string,DescCate:string,
                    //Etiquetas:string,NomImg:string,piezas:string,tamaPrice:string, tiempo:string  }> //
public comandaSave: Array<{id: string, Nombre: string, cantidad: number,precio:number,Especificaciones:string,tama:string,Estatus:string }>;
public comandaDelete: Array<{id: string, Nombre: string, cantidad: number,precio:number,Especificaciones:string,tama:string} >;
public comandaNew: Array<{id: string, Nombre: string, cantidad: number,precio:number,Especificaciones:string,tama:string} >;
public places: Array<{place:string,IdPlace:string,nombre:string,type:string}>;
public precios;
public redessplit:any[]=[];
public paq;
public espe;
public promos;
public eve;
public logo;
public Fondo;
final_data: any[]=[];
razonCancel:string='';
is_Updatering:number=0;
cerrado:boolean;


	constructor(private activatedRoute: ActivatedRoute, private _getService:GetService)
	{



		this.titulo="Bienvenid@";
		this.tiempos=new Array();
		this.timessorted=new Array();
		this.intproducto=0;
		this.arregloPrTm=new Array();
		this.precios=new Array();
		this.comandaSave= [];
		this.comandaDelete= [];
		this.comandaNew=[];
		this.needCode=false;
		this.paq=false;
		this.espe=false;
		this.promos=false;
		this.eve=false;
		this.logo='';
		this.Fondo='';
		this.places=[];
		this.cerrado=false;


	}

	ngOnInit(){

      this.activatedRoute.params.subscribe((params: Params) => {
        let tipo = params['typer'];
        let local = params['Esta'];
       // tipo=tipo.replace('|','/').replace('_','=');
		//local=local.replace('|','/').replace('_','=');
        //console.log(userId+'1');
        if(tipo && local){
        this._getService.signUp(tipo,local).subscribe(
			response=>{
				if(!response.local)
				{
					if(response.firtsSix)
					{
						this.recomendaciones=response.firtsSix;

						console.log(this.recomendaciones);
					}

				}
				else
				{
					if(response.local!='')
					{



						this.LocalGet=response.local;//new local(response.local);
						console.log(this.LocalGet);

					this.estaCerrao(this.LocalGet.nom_img);
						this.redessplit=this.LocalGet.redes.split('|');

if(this.LocalGet.id_PaqEspe!=undefined){
					for(var paqespe=0; paqespe<this.LocalGet.id_PaqEspe.length; paqespe++){
						if(this.LocalGet.id_PaqEspe[paqespe].Is_Active==1){
							if(this.LocalGet.id_PaqEspe[paqespe].Typo==1)
							this.paq=true;
							else
							this.espe=true;
						}
					}
				}

				if(this.LocalGet.id_EvenPromo!=undefined){
					for(var evenPromo=0;evenPromo<this.LocalGet.id_EvenPromo.length;evenPromo++){
						if(this.LocalGet.id_EvenPromo[evenPromo].IsActive==1){
							if(this.LocalGet.id_EvenPromo[evenPromo].Typo==1)
							this.eve=true;
							else
							this.promos=true;
						}
					}
				}

						var countered=0;
						for (var i =0; i< this.LocalGet.id_Menu.menu.length ; i++) {
							if(i==0){
								this.tiempos[countered]=this.LocalGet.id_Menu.menu[i].tiempo;
								countered++;
							}
							else{
								if(this.LocalGet.id_Menu.need_Code==1)
     									this.needCode=true;
								if(!this.tiempos.includes(this.LocalGet.id_Menu.menu[i].tiempo))
								{
								this.tiempos[countered]=this.LocalGet.id_Menu.menu[i].tiempo;
								countered++;
								}
							}
						}
						if(this.tiempos.length>0){
							var otercounter=0;
								if(this.tiempos.includes("bebidas")){
									this.timessorted[otercounter]="bebidas";
									otercounter++;
								}
								if(this.tiempos.includes("Botana")){
									this.timessorted[otercounter]="Botana";
									otercounter++;
								}
								if(this.tiempos.includes("Entrada")){
									this.timessorted[otercounter]="Entrada";
									otercounter++;
								}
								if(this.tiempos.includes("Guarnicion")){
									this.timessorted[otercounter]="Guarnicion";
									otercounter++;
								}
								if(this.tiempos.includes("Plato_Fuerte")){
									this.timessorted[otercounter]="Plato_Fuerte";
									otercounter++;
								}
								if(this.tiempos.includes("Postre")){
									this.timessorted[otercounter]="Postre";
									otercounter++;
								}

						}
						for(var e=0;e< this.LocalGet.id_Imgs.length;e++){

							if(this.LocalGet.id_Imgs[e].tipo==1)
						this.Fondo=this.LocalGet.id_Imgs[e].Nombre;
						if(this.LocalGet.id_Imgs[e].tipo==2)
						this.logo=this.LocalGet.id_Imgs[e].Nombre;
					}

					}
					else
						console.log('No existe el local');


// aqui la cookie
let placeBefore=this.getCookie('OFClient');
//console.log(placeBefore);
    var d = new Date();
    d.setTime(d.getTime() + (60*24*60*60*1000));
    var expires = "expires=" + d['toGMTString']();
		if(!placeBefore.includes(tipo+'|'+local + '|'+this.LocalGet.Nombre+'|'+this.LocalGet.tipo+'|'+this.LocalGet.id_Imgs[1].Nombre+"+"))
    document.cookie = "OFClient" + "=" +placeBefore+ tipo+'|'+local +'|'+this.LocalGet.Nombre+'|'+this.LocalGet.tipo+'|'+this.LocalGet.id_Imgs[1].Nombre+ "+;" + expires + ";path=/";
	//	else
	//	document.cookie = "OFClient" + "=" +placeBefore+ ";" + expires + ";path=/";

						//tambien aqui iria meter el token para cuando se mete el codigo
						//localStorage.setItem('identity',JSON.stringify(this.user));
						//this.alertMessage='El usuario se actualizo, correctamente!';
				}
			},
			error=>{
	var errorMessage=<any>error;
	if(errorMessage!=null)
	{

		console.log(error);

	}
}
			);
}
      });

	}


	 getCookie(nameCook):string {
    var name = nameCook + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


 estaCerrao(horarios) {
	 var horas=horarios.split('-');
var horaAbre=horas[0].split(':');
var horaCierra=horas[1].split(':');
		var d = new Date();
		var date = new Date(d.toString().replace("GMT+0000","").replace("GMT+0100",""));
		var		hour= '' +d.getHours();

console.log(+horas[0]);
	 if (hour.length < 2) hour = '0' + hour;
	 if(+hour<+horaAbre[0]){
		 this.cerrado=true;
	 }
	 if(+hour>+horaCierra[0])
	 this.cerrado=true;
 }
	DameNumPedido(){
			if(this.comandaSave.length>0){

				if(this.needCode  )
				{
					var codigo=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
					if(codigo=='')
					{
							$('#alertNoCode').show();
						return;
					}
//incerto codigo puede proseguir y validar el codigo
 this._getService.ValidaCode(codigo.toUpperCase(),this.LocalGet.id_SQL).subscribe(
response=>{
if(response.coderFound==null){

	$('#alertBadCode').show();
return;
}
else{
	for (let j=0; j<this.comandaSave.length; j++)
	{
	if(this.comandaSave[j].Estatus=='' )
	this.comandaNew.push({
		id:this.comandaSave[j].id,
		Nombre:this.comandaSave[j].Nombre,
		cantidad: this.comandaSave[j].cantidad,
		precio: this.comandaSave[j].precio,
		Especificaciones: this.comandaSave[j].Especificaciones,
		tama: this.comandaSave[j].tama

	});
	}

	//$('#MyModalPedido').modal('hide');
//response.coderFound trae la mesa y el local y con el arreglo de this.comandaSave para levantar la comanda
this._getService.setComanda(this.comandaNew,this.LocalGet.id_Hashed,codigo.toUpperCase(),true,response.coderFound.Mesa).subscribe(data=>{
this.comandaNew=[];
for (let i=0; i<this.comandaSave.length; i++)
{
	this.comandaSave[i].Estatus='7';
}
data.forEach((childSnapshot) => {
	this.setCambios(childSnapshot,codigo.toUpperCase(),data);
});
$('#MyModalPedido').modal('hide');
//	$('#MyModalAlerts').modal('show');
});
}
},error=>{
var errorMessage=<any>error;
if(errorMessage!=null)
{
console.log(error);
}
});
				}
				else{
					this.estaCerrao(this.LocalGet.nom_img);
					if(this.cerrado){
						$('#alerCerrao').show();
						return;
					}

					//aqui jalar la cookie o localStorage para ver si no ya fue bloqueado.
					let decline=this.getCookie('sendValue');
					console.log(decline);
					if(decline!=''){
						$('#alertBlocking').show();
						return;
					}
					var NombreComensal=(<HTMLInputElement>document.getElementById('NameOrder')).value;
					//nomif()bre orden
					if(NombreComensal=='')
					{
						$('#alertNameNece').show();
						return;
					}

					for (let j=0; j<this.comandaSave.length; j++)
					{
					if(this.comandaSave[j].Estatus=='' )
					this.comandaNew.push({
						id:this.comandaSave[j].id,
						Nombre:this.comandaSave[j].Nombre,
						cantidad: this.comandaSave[j].cantidad,
						precio: this.comandaSave[j].precio,
						Especificaciones: this.comandaSave[j].Especificaciones,
						tama: this.comandaSave[j].tama

					});
				}
						//incerto nombre puede proseguir
						//$('#MyModalPedido').modal('hide');
this._getService.setComanda(this.comandaNew,this.LocalGet.id_Hashed,NombreComensal, false,0).subscribe(data=>{

this.comandaNew=[];
for (let i=0; i<this.comandaSave.length; i++)
{
	this.comandaSave[i].Estatus='7';
}
data.forEach((childSnapshot) => {
this.setCambios(childSnapshot, NombreComensal,data);
});
$('#MyModalPedido').modal('hide');
//	$('#MyModalAlerts').modal('show');
});
				}

			}
		}

		setCambios(childSnapshot, code,data){
			if(childSnapshot.Estatus=="0"|| childSnapshot.Estatus=="1"){
				console.log(childSnapshot.Estatus);
				$('#MyModalAlerts').modal('show');
				$('#alertOrderOk').show();
				//$('#alertCancelPlato').hide();
				//$('#alertEntregaPlato').hide();
			}
			if(childSnapshot.Estatus=="3"){
				this.razonCancel=childSnapshot.Platillo+' La razon de cancelación es: '+childSnapshot.comentario;

				$('#MyModalAlerts').modal('show');
					$('#alertCancelPlato').show();
						$('#alertOrderOk').hide();
						//		$('#alertEntregaPlato').hide();
					//window.navigator.vibrate([1000, 500, 2000]);
					this.quitarSeleccion(childSnapshot.id,true);
			}
			if(childSnapshot.Estatus=="2"){
				// el plato esta trabajando y ya no se puede editar
				for (let i=0; i<this.comandaSave.length; i++)
				{
					if(childSnapshot.id==this.comandaSave[i].id){
						this.comandaSave[i].id='1';
					}
				}
			}


			if(childSnapshot.$key=="Estatus"){
if(childSnapshot.$value=="4"){
	console.log(childSnapshot.Estatus);
				$('#MyModalAlerts').modal('show');
					$('#alertEntregaPlato').show();
						$('#alertCancelPlato').hide();
							$('#alertOrderOk').hide();
				//	this._getService.removeOrder(this.LocalGet.id_Hashed,code);
					this.comandaSave=[];
			}
		}

		}

		llamaMese(){
//aqui llamar al mesero pero cuaquiera puede hablarle?
	var codings=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
	if(codings!='')
	(<HTMLInputElement>document.getElementById('CodeMesa')).value=codings;
	$('#MyModalCallMese').modal('show');

}

sendCallerMese(){
	var codings=(<HTMLInputElement>document.getElementById('CodeMesa')).value;
	if(codings==''){
			$('#alertNoCoder').show();
			return;
	}
	else{
		this._getService.ValidaCode(codings.toUpperCase(),this.LocalGet.id_SQL).subscribe(
	 response=>{
	 if(response.coderFound==null){

		 $('#alertBadCoder').show();
	 return;
	 }
	 else{
		 console.log(response.coderFound);
		 this.activatedRoute.params.subscribe((params: Params) => {
			 let tipo = params['typer'];
			 let local = params['Esta'];
		 // hay q registrar al en firebase la llamada en finish
		 this._getService.callMesero(local,codings.toUpperCase(),response.coderFound.Mesa);
	 });
	 }
 });

	}


}


myModalPac(paqespe){

		$('#myModalPac').modal('show');
		this.modals=[];
		this.modals=paqespe;
}
myModalEvenprom(eventosPromos){
	$('#myModaleventPromo').modal('show');
	this.modals=[];
	if(	eventosPromos.Comienza!=''){
var comin=	this._getService.formatoDate(eventosPromos.Comienza);
	eventosPromos.Comienza=comin+' hrs.';
}
if(	eventosPromos.Termina!=''){
var term=	this._getService.formatoDate(eventosPromos.Termina);
	eventosPromos.Termina=term+' hrs.';
}
	this.modals=eventosPromos ;
	//this.modals.Comienza=new Date()
}


	cantidadTamanos(tamanos){
	var chek=	<HTMLInputElement>document.getElementById(tamanos) ;
	if(chek.checked){
		let canti= (<HTMLInputElement>document.getElementById('NUmProduct')).value;
		if(canti=='')
		canti='1';
		var tamaPrecio:string= tamanos;
		var estamadre=tamaPrecio.split('=');

	 (<HTMLInputElement>document.getElementById('CantProd')).value=canti+'_'+estamadre[1]+'_'+estamadre[0];
	// console.log((<HTMLInputElement>document.getElementById('CantProd')).value);
	 }
	}

	GuardameCantidad(tipo){
		let canti= (<HTMLInputElement>document.getElementById('NUmProduct')).value;
		if(canti=='')
	  canti='1';
		if(tipo.precio!='0'){
	(<HTMLInputElement>document.getElementById('CantProd')).value=canti+'_'+tipo.precio;

		}

	}

	ShowOptins(){
		document.getElementById('OptionsSearch').style.visibility = "visible";
	}

	SUscribeNews_CLic(){
		var lugar=(<HTMLInputElement>document.getElementById('NUmProduct')).value;
		if(lugar!=''){

		}
	}

  abreCantos(platos, is_update) {



		if(is_update){
		this.is_Updatering=1;
	}
		(<HTMLInputElement>document.getElementById('NUmProduct')).value='';
		(<HTMLInputElement>document.getElementById('EspefTxt')).value='';
	$('#myModalUpdate').modal('show');

	if(platos.tamaPrice != "" && platos.tamaPrice!=undefined ){

	this.arregloPrTm=platos.tamaPrice.split(',');
	}
if(platos.precio!='0'){
	this.intproducto=platos.precio;
}
this.modals=platos;

}

agregaPedido(Plato, mostrarOrden)
{
	let yaexiste=false;
		var cantidades=(<HTMLInputElement>document.getElementById('CantProd')).value;
	var especif=(<HTMLInputElement>document.getElementById('EspefTxt')).value;
let cantidaa=0;
var price=0;
var cantSplit=[];
var name=Plato.Nombre;
var tamaos='';
	if(Plato.precio==0 && cantidades=='')
	{
		$('#alertNotama').show();
		return ;
	}
	if(cantidades==''){
	cantidaa=1;
	price=Plato.precio;
}
	else
	{
			cantSplit=cantidades.split('_');
			//console.log(cantSplit);
				price=+cantSplit[0]*+cantSplit[1];
				cantidaa=+cantSplit[0];
				if(cantSplit.length>2)
				{
				name=Plato.Nombre+' '+cantSplit[2];
				tamaos=cantSplit[2];
			}
	}

	for (let i=0; i<this.comandaSave.length; i++)
	{
		if(Plato.id==this.comandaSave[i].id){
			if(this.is_Updatering==0){
			yaexiste=true;
this.comandaSave[i].cantidad+=cantidaa;
this.comandaSave[i].Estatus='';
}
//if(this.comandaSave[i].Especificaciones!='')
this.comandaSave[i].Especificaciones+=" "+ especif;

	if(this.is_Updatering==1){

this.comandaSave[i].tama=tamaos;
this.comandaSave[i].Nombre=name;
this.comandaSave[i].precio=price;
// aqui meter un if pa ver si ya esta guardadao
this.actualizaDesdeCiente(this.comandaSave[i],5);
}
		}
	}

if(!yaexiste && this.is_Updatering==0){
this.comandaSave.push({
	id:Plato.id,
	Nombre:name,//Plato.Nombre,
	cantidad:cantidaa,
	precio:price,
	Especificaciones:especif,
	tama:tamaos,
	Estatus:''
});
}
$('#myModalUpdate').modal('hide');
(<HTMLInputElement>document.getElementById('CantProd')).value='';
(<HTMLInputElement>document.getElementById('EspefTxt')).value='';
//console.log(yaexiste);
this.is_Updatering=0;

if(mostrarOrden)
this.abreComanda();
}

abreComanda()
{
	$('#MyModalPedido').modal('show');
}



quitarSeleccion(idSelected,desdeCocina)
{

	var chek=	<HTMLInputElement>document.getElementById(idSelected) ;
	if(chek!=null){
	if(chek.checked ||desdeCocina){
		let confirmo=false;
		if(!desdeCocina)
		confirmo=confirm("Estas seguro de eliminar este producto?");
		else
		confirmo=desdeCocina;

	if(confirmo) {
	this.comandaDelete=this.comandaSave;
	this.comandaSave=[];

	for(let i=0;i<this.comandaDelete.length; i++)
	{
		if(this.comandaDelete[i].id!=idSelected){
this.comandaSave.push(
	{
		id:this.comandaDelete[i].id,
		Nombre:this.comandaDelete[i].Nombre,
		cantidad:this.comandaDelete[i].cantidad,
		precio:this.comandaDelete[i].precio,
		Especificaciones:this.comandaDelete[i].Especificaciones,
		tama:this.comandaDelete[i].tama,
		Estatus:''
	});
		}
		else{
			if(this.comandaDelete[i].cantidad>1){
				let newPrice=this.comandaDelete[i].precio/this.comandaDelete[i].cantidad;
				this.comandaSave.push(
					{
						id:this.comandaDelete[i].id,
						Nombre:this.comandaDelete[i].Nombre,
						cantidad:(this.comandaDelete[i].cantidad-1),
						precio:this.comandaDelete[i].precio-newPrice,
						Especificaciones:this.comandaDelete[i].Especificaciones,
						tama:this.comandaDelete[i].tama,
						Estatus:''
					});
if(!desdeCocina)
					this.actualizaDesdeCiente(this.comandaDelete[i],6);


			}
			else{
				if(!desdeCocina)
				this.actualizaDesdeCiente(this.comandaDelete[i],6);
			}
		}
	}


}
else{
	chek.checked=false;
}

}
}
}

getSum():number{
	 let sum = 0;
	 this.comandaSave.forEach(model => {
		 sum += +model.precio;
	 });
	 return sum;
 }

 actualizaDesdeCiente(comanda,idModifica){
	 var codigo='';
		if(this.needCode  )
		{
			 codigo=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
		}
		else{
			codigo=(<HTMLInputElement>document.getElementById('NameOrder')).value;
		}

			if(codigo!='')
			{
		this.activatedRoute.params.subscribe((params: Params) => {
			let tipo = params['typer'];
			let local = params['Esta'];
		this._getService.updateOrQuitar(local,codigo,comanda,idModifica);
		});

		}
 }

}
