import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdenoFacilComponent} from './components/Solicitud/OrdenoFacil';
import {ComandasComponent} from './components/Solicitud/MisComandas';
import {FinishCocinaComponent} from './components/Solicitud/FinishCocina';
import {placesVisitS} from './components/Solicitud/placesVisit';
import {LaCuentaComponent} from './components/Solicitud/LaCuenta';





const appRoutes:Routes=[
{path:'', component: OrdenoFacilComponent},
{path:'menu/:typer/:Esta', component:OrdenoFacilComponent },
{path:'Comandas/:typer/:Esta', component:ComandasComponent },
{path:'TerminadosCocina/:typer/:Esta', component:FinishCocinaComponent },
{path:'placesVisit',component:placesVisitS},
{path:'LaCuenta/:typer/:Esta',component:LaCuentaComponent}


];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);
