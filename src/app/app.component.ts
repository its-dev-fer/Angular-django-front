import { Component, OnInit } from '@angular/core';
import { DjangoApiService } from './django-api.service'
// Form control
import { FormGroup, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularDjangoFront';
  carros: any = []
  isNew:boolean = true
  isEdit:boolean =false
  formGroup: FormGroup
  id:number = null
  constructor(
    private api: DjangoApiService
  )
  {
    this.formGroup = new FormGroup({
      'placa': new FormControl('', Validators.required),
      'duenio': new FormControl('', Validators.required),
      'modelo': new FormControl('', Validators.required),
      'marca': new FormControl('', Validators.required)
    })
  }

  ngOnInit()
  {
    this.fetchAll()
  }

  fetchAll()
  {
    this.api.getAllCars().subscribe(res => {
      this.carros = res
    })
  }

  /**
   * Editar un carro
   *
   * @param   {int}  id   ID del carro a editar
   */
  editThisCar(item)
  {
    this.isNew = false
    this.isEdit = true
    this.formGroup.get('placa').setValue(item.placa)
    this.formGroup.get('duenio').setValue(item.duenio)
    this.formGroup.get('modelo').setValue(item.modelo)
    this.formGroup.get('marca').setValue(item.marca)
    this.id = item.pk
  }

  saveUpdatedCar()
  {
    let c = {
      placa: this.formGroup.get('placa').value,
      duenio: this.formGroup.get('duenio').value,
      modelo: this.formGroup.get('modelo').value,
      marca: this.formGroup.get('marca').value
    }
    this.formGroup.get('placa').setValue('')
    this.formGroup.get('duenio').setValue('')
    this.formGroup.get('modelo').setValue('')
    this.formGroup.get('marca').setValue('')
    return this.api.updateCar(this.id, c).subscribe(res => {
      this.fetchAll()
      this.id = null
      this.isNew = true
      this.isEdit = false
    }, err => {
      console.log(err)
    })
  }

  /**
   * Eliminar un carro
   *
   * @param   {int}  id   ID del carro a editar
   */
  deleteThisCar(id)
  {
    this.api.deleteCar(id).subscribe(res => {
      this.fetchAll()
    }, err => {
      this.fetchAll()
    })
  }

  /**
   * Agregar un nuevo carro a la API
   */
  addThisCar()
  {
    let c = {
      placa: this.formGroup.get('placa').value,
      duenio: this.formGroup.get('duenio').value,
      modelo: this.formGroup.get('modelo').value,
      marca: this.formGroup.get('marca').value
    }
    this.formGroup.get('placa').setValue('')
    this.formGroup.get('duenio').setValue('')
    this.formGroup.get('modelo').setValue('')
    this.formGroup.get('marca').setValue('')
    return this.api.addCar(c).subscribe(res => {
      this.carros.push(res)
    }, err => {
      console.log(err)
    })
  }
}
