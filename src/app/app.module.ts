import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {OrdenoFacilComponent} from './components/Solicitud/OrdenoFacil'
import {ComandasComponent} from './components/Solicitud/MisComandas'
import {FinishCocinaComponent} from './components/Solicitud/FinishCocina'
import {placesVisitS} from './components/Solicitud/placesVisit'
import {LaCuentaComponent} from './components/Solicitud/LaCuenta';



import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routing,appRoutingProviders} from './app.routing';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
//import {TabsModule} from "ng2-tabs";
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const firebaseConfig= {
    apiKey: "AIzaSyCDpDrf0EBTZ5hXSPRi4p3lxVqzj8GjEN0",
    authDomain: "comandaof.firebaseapp.com",
    databaseURL: "https://comandaof.firebaseio.com",
    projectId: "comandaof",
    storageBucket: "comandaof.appspot.com",
    messagingSenderId: "78261981774"
  };


@NgModule({
  declarations: [
    AppComponent,
   OrdenoFacilComponent,
   ComandasComponent,
   FinishCocinaComponent,
   placesVisitS,
   LaCuentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireDatabaseModule,
   AngularFireModule.initializeApp(firebaseConfig),
   //NgbModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
