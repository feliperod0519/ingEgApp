import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../ing-eg/estadistica/estadistica.component";
import { IngEgComponent } from "../ing-eg/ing-eg.component";
import { DetalleComponent } from "../ing-eg/detalle/detalle.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-egreso', component: IngEgComponent},
    { path: 'detalle', component: DetalleComponent },
];