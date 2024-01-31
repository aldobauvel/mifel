import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTS TO SHARE
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { MaterialModule } from '../material.module';
import { PageBannerComponent } from './components/page-banner/page-banner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';



//MODULES TO SHARE
export const MY_FORMAT_DATE = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabek: 'MMMM YYYY'
  }
}


@NgModule({
  declarations: [
    TopMenuComponent,
    PageBannerComponent
  ],
  imports: [
    CommonModule,    
    //MODULES
    FormsModule,
    ReactiveFormsModule,
    MaterialModule 
        
  ],
  exports:[
    TopMenuComponent,
    PageBannerComponent,
    //MODULES
    ReactiveFormsModule,
    FormsModule,
    MaterialModule       
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT_DATE},
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX'},

  ]
 
})
export class SharedModule { }
