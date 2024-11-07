import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  searchName: string = ''; // Variable para la búsqueda por nombre
  historyLog: any[] = []; // Array para almacenar el historial de juegos
  filteredHistoryLog: any[] = []; // Array para almacenar el historial filtrado
  message: string = ''; // Mensaje de estado

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadHistory(); // Cargar el historial al iniciar el componente
  }

  // Cargar todos los historiales de juegos
  loadHistory(): void {
    this.apiService.getAllGameHistories().subscribe(
      (data) => {
        // Suponiendo que data es un array de historiales de juego
        this.historyLog = data.map((gameHistory: any) => ({
          observacion: gameHistory.observacion,
          tiempo: gameHistory.tiempo,
          errores: gameHistory.errores,
          aciertos: gameHistory.aciertos,
          nombrePaciente: gameHistory.patient?.nombre,
          nombreTerapeuta: gameHistory.therapist?.nombre
        }));
        this.filteredHistoryLog = this.historyLog; // Inicializar el array filtrado con todos los datos
      },
      (error) => {
        console.error('Error al cargar el historial:', error);
      }
    );
  }

  /// Buscar historial de paciente por nombre
  searchPatient(): void {
    this.apiService.getPatientHistoryByName(this.searchName).subscribe(
      (data) => {
        if (data.length > 0) {
          this.historyLog = data.map((entry: any) => ({
            observacion: entry.observacion,
            tiempo: entry.tiempo,
            errores: entry.errores,
            aciertos: entry.aciertos
          }));
          this.message = '';
        } else {
          this.historyLog = [];
          this.message = 'No se encontraron resultados.';
        }
      },
      (error) => {
        console.error('Error al buscar historial:', error);
        this.message = 'Error al buscar el historial.';
      }
    );      
} 
}