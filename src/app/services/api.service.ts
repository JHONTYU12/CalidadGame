import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addTherapist(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/therapists`, data);
  }
  // Obtener historial de juegos de un paciente por nombre
  getPatientHistoryByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/history/name/${name}`);
  }
   // Verificar si existen las cédulas del terapeuta y del paciente
  verifyCedulas(therapistCedula: string, patientCedula: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-cedulas`, { therapistCedula, patientCedula });
  }

   // Obtener terapeuta por cédula
   getTherapistByCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/therapist/cedula/${cedula}`);
  }
  saveGameHistory(historyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gamehistories`, historyData);
  }
  // Obtener paciente por cédula
  getPatientByCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/cedula/${cedula}`);
  }
  getAllHistories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamehistories`);
  }

  addPatient(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, data);
  }
 // Obtener todos los historiales de juego
  getAllGameHistories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gamehistories`);
  }
  addGameHistory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/game-history`, data);
  }

  getPatientHistory(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/history`);
  }
  // src/app/services/api.service.ts
  getAllPatientsHistory(): Observable<any> {
   return this.http.get(`${this.apiUrl}/all-patients-history`);
  }

}
