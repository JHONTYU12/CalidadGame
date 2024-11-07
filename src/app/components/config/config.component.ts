import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  therapistName: string = '';
  patientName: string = '';
  inicioRango: number | null = null;
  finRango: number | null = null;
  longitudSecuencia: number | null = null;
  cantidadNumeros: number | null = null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const therapistCedula = localStorage.getItem('therapistCedula');
    const patientCedula = localStorage.getItem('patientCedula');

    if (therapistCedula) {
      this.apiService.getTherapistByCedula(therapistCedula).subscribe(
        (therapist) => {
          this.therapistName = therapist.nombre;
        },
        (error) => {
          console.error('Error al obtener el terapeuta:', error);
        }
      );
    }

    if (patientCedula) {
      this.apiService.getPatientByCedula(patientCedula).subscribe(
        (patient) => {
          this.patientName = patient.nombre;
        },
        (error) => {
          console.error('Error al obtener el paciente:', error);
        }
      );
    }
  }

  startGame() {
    if (
      this.inicioRango !== null &&
      this.finRango !== null &&
      this.longitudSecuencia !== null &&
      this.cantidadNumeros !== null &&
      this.inicioRango < this.finRango &&
      this.longitudSecuencia > 0 &&
      this.cantidadNumeros > 0 &&
      this.cantidadNumeros < this.longitudSecuencia &&
      this.longitudSecuencia <= this.finRango - this.inicioRango + 1
    ) {
      localStorage.setItem('rangeStart', this.inicioRango.toString());
      localStorage.setItem('rangeEnd', this.finRango.toString());
      localStorage.setItem('totalNumbers', this.longitudSecuencia.toString());
      localStorage.setItem('missingCount', this.cantidadNumeros.toString());
      this.router.navigate(['/game']);
    } else {
      alert('Por favor, ingrese valores válidos.');
    }
  }
}
