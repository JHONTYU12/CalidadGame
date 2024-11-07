import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  therapistCedula: string = '';
  patientCedula: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  // Verifica las cédulas y redirige a la configuración del juego
  goToConfiguration() {
    if (this.therapistCedula && this.patientCedula) {
      // Llamada al backend para verificar las cédulas
      this.apiService.verifyCedulas(this.therapistCedula, this.patientCedula).subscribe(
        (response) => {
          // Si las cédulas existen, guardarlas en localStorage y redirigir
          localStorage.setItem('therapistCedula', this.therapistCedula);
          localStorage.setItem('patientCedula', this.patientCedula);
          console.log('Cédulas guardadas:', this.therapistCedula, this.patientCedula); // Verificar las cédulas guardadas
          this.router.navigate(['/config']);
        },
        (error) => {
          // Si alguna cédula no existe, mostrar el mensaje de error
          alert(error.error.message || 'Error al verificar las cédulas.');
        }
      );
    } else {
      alert('Por favor, ingrese las cédulas del terapeuta y del paciente');
    }
  }

  // Redirige a la página del historial de todos los pacientes
  goToHistory() {
    this.router.navigate(['/history']);
  }
}
