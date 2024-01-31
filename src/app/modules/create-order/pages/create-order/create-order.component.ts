import { Component, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../interfaces/create-order.interface';
import { CreateNewOrderService } from '../../services/create-new-order.service';
//TABLE
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],  
})

export class CreateOrderComponent {

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'website','action'];
  ELEMENT_DATA: User[] = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA); 
  
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private newOrderService: CreateNewOrderService) { }  
  
   // GLOBAL VARS
   bannerTitle: string = 'Identificación';
   onlyText:    string = '^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\',. ]{0,30}$';
   curpRegex:   string = '^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?$';
   rfcRegex:    string = '^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$';
    
   //MAIN FORM
   addOrderForm: FormGroup = this.fb.group({
     clientName:   ['', [Validators.required, Validators.pattern(this.onlyText)]],
     apPaterno:    ['', [Validators.required, Validators.pattern(this.onlyText)]],
     apMaterno:    ['', [Validators.pattern(this.onlyText)]],
     curp:         ['', [Validators.required, Validators.pattern(this.curpRegex)]],
     codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(5), Validators.minLength(5)]],
     calle:        ['', [Validators.required]],
     rfc:          ['', [Validators.required, Validators.pattern(this.rfcRegex)]],
     numExt:       ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(5), Validators.minLength(5)]],
     numInt:       ['', [Validators.maxLength(10)]],
     estado:       ['', [Validators.required, Validators.pattern(this.onlyText)]],
     municipio:    ['', [Validators.required, Validators.pattern(this.onlyText)]],
     colonia:      ['', [Validators.required, Validators.pattern(this.onlyText)]],     
   });

   /**
    * Obtiene datos para main grid
    * @method getData
    * @author aldobauvel@gmail.com
    */
   getData() {
    this.newOrderService.getUsers().subscribe({
      next: res => {        
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      }
    })
   }

   /**
    * Guarda datos del formulario
    * @method saveUser    
    * @author aldobauvel@gmail.com
    */
   saveUser() {
        
    if (!this.isFormValid()) return this.addOrderForm.markAllAsTouched();
    let clientObj = this.buildDataToSend(this.addOrderForm);    
    this.openSnackBar('Campos validados correctamente', 'Cerrar');
    /*
    this.newOrderService.saveClient(clientObj).subscribe({
        next: res => {
          this.openSnackBar('Cliente registrado con éxito', 'Cerrar');
          this.getData();
        },
        error: err => {
          this.openSnackBar('Algo salió mal, favor de reintentar', 'Cerrar');
        }      
    })
    */  
   }

   /**
    * Construye JSON del formulario
    * @method buildDataToSend
    * @returns Object
    * @author aldobauvel@gmail.com
    */
   buildDataToSend(formData: FormGroup) {

    return {
      infoUsuario: {
        Nombre:          this.addOrderForm.get('clientName')?.value,
        ApellidoPaterno: this.addOrderForm.get('apPaterno')?.value,
        ApellidoMaterno: this.addOrderForm.get('apMaterno')?.value,        
        CURP:            this.addOrderForm.get('curp')?.value,
        RFC:             this.addOrderForm.get('rfc')?.value,
      },
      Domicilio: {
        Calle:          this.addOrderForm.get('calle')?.value,
        CodigoPostal:   this.addOrderForm.get('codigoPostal')?.value,
        NumeroExterior: this.addOrderForm.get('numExt')?.value,
        NumeroInterior: this.addOrderForm.get('numInt')?.value,
        Estado:         this.addOrderForm.get('estado')?.value,
        Municipio:      this.addOrderForm.get('municipio')?.value,
        Colonia:        this.addOrderForm.get('colonia')?.value,
      }
    }
   }

  /**
   * Valida formulario
   * @method isFormValid
   * @returns boolean
   * @author aldobauvel@gmail.com
   */
  isFormValid() {
    if (this.addOrderForm.status === 'INVALID') {
      this.openSnackBar('Alguno de los campos ingresados no son validos, favor de verificar', 'Cerrar');
      return false
    }    
    return true;
  }

  /**
   * Muestra snackbar
   * @method openSnackBar
   * @param message 
   * @param action 
   * @author aldobauvel@gmail.com
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
    });
  }

  /**
   * Life Cycle hooks
   */
  ngOnInit () {
    this.getData();
  } 
 
}
