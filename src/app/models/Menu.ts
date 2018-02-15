import {Platillos}  from './platillos';

export class menu{
	constructor(
		public _id:String,
		public id_Local:Number,
		public is_Active:Number,
		public date_Create:String,
		public need_Code:Number,
		public proces_Loc:String,
		public menu:Platillos[]
		){}
}