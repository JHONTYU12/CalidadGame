// src/app/components/result/result.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  errorsPerNumber: number[] = [];
  totalErrors: number = 0;
  timeTaken: string = ''; 
  observation: string = '';
  timeResult: string = '00:00:00';

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.displayResults();
    this.timeTaken = localStorage.getItem('timeTaken') || '0';
    this.totalErrors = parseInt(localStorage.getItem('errorsPerNumber') || '0', 10);
  }

  displayResults() {
    this.errorsPerNumber = JSON.parse(
      localStorage.getItem('errorsPerNumber') || '[]'
    );
    this.totalErrors = this.errorsPerNumber.reduce(
      (total, num) => total + num,
      0
    );
  }

  saveResult() {
    const patientId = localStorage.getItem('patientId');

    if (patientId) {
      const gameData = {
        patient: patientId,
        errorsPerNumber: this.errorsPerNumber,
        totalErrors: this.totalErrors,
        timeTaken: this.timeResult,
      };

      this.apiService.addGameHistory(gameData).subscribe(
        (response) => {
          alert('Resultado guardado exitosamente.');
        },
        (error) => {
          alert('Error al guardar el resultado.');
        }
      );
    } else {
      alert('No se encontró el ID del paciente.');
    }
  }
  saveHistory() {
    const patientId = localStorage.getItem('patientId'); // Suponiendo que el ID del paciente está almacenado
    const therapistId = localStorage.getItem('therapistId'); // Suponiendo que el ID del terapeuta está almacenado

    const historyData = {
      observation: this.observation,
      time: parseFloat(this.timeTaken),
      errors: this.totalErrors,
      patient: patientId,
      therapist: therapistId
    };

    this.apiService.saveGameHistory(historyData).subscribe(
      () => {
        alert('Historial guardado exitosamente');
        this.router.navigate(['/']); // Redirigir a la página principal o donde desees
      },
      (error) => {
        console.error('Error al guardar el historial:', error);
      }
    );
  }
  retryGame() {
    this.router.navigate(['/game']);
  }

  newGame() {
    localStorage.removeItem('rangeStart');
    localStorage.removeItem('rangeEnd');
    localStorage.removeItem('totalNumbers');
    localStorage.removeItem('missingCount');
    this.router.navigate(['/config']);
  }

  goToMain() {
    this.router.navigate(['/']);
  }
}
