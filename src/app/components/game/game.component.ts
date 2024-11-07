import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  rangeStart: number = 0;
  rangeEnd: number = 0;
  totalNumbers: number = 0;
  missingCount: number = 0;
  numberList: number[] = [];
  missingNumbers: number[] = [];
  userInputs: number[] = [];
  feedbackMessage: string = '';
  feedbackClass: string = '';
  errorsPerNumber: number = 0;
  startTime: Date = new Date(); // Hora de inicio del juego

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.rangeStart = parseInt(localStorage.getItem('rangeStart') || '0', 10);
    this.rangeEnd = parseInt(localStorage.getItem('rangeEnd') || '0', 10);
    this.totalNumbers = parseInt(localStorage.getItem('totalNumbers') || '0', 10);
    this.missingCount = parseInt(localStorage.getItem('missingCount') || '0', 10);

    this.generateNumberList();
    this.selectMissingNumbers();
    this.shuffleNumbers();
    this.startTime = new Date(); // Iniciar el tiempo
  }

  generateNumberList() {
    this.numberList = [];
    for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
      this.numberList.push(i);
    }
  }

  selectMissingNumbers() {
    this.missingNumbers = [];
    while (this.missingNumbers.length < this.missingCount) {
      const randomIndex = Math.floor(Math.random() * this.numberList.length);
      const missingNumber = this.numberList.splice(randomIndex, 1)[0];
      if (!this.missingNumbers.includes(missingNumber)) {
        this.missingNumbers.push(missingNumber);
      }
    }
  }

  shuffleNumbers() {
    for (let i = this.numberList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.numberList[i], this.numberList[j]] = [this.numberList[j], this.numberList[i]];
    }
  }

  validateInput() {
    const userAnswers = this.userInputs.map(input => Number(input)).filter(input => !isNaN(input));
    const isCorrect = this.missingNumbers.every(num => userAnswers.includes(num)) &&
                      userAnswers.length === this.missingNumbers.length;

    if (isCorrect) {
      this.feedbackMessage = '¡Correcto!';
      this.feedbackClass = 'success';
      this.navigateToResult();
    } else {
      this.feedbackMessage = '¡Incorrecto! Intenta de nuevo.';
      this.feedbackClass = 'error';
      this.errorsPerNumber++;
    }
  }

  navigateToResult() {
    const endTime = new Date();
    const timeTaken = (endTime.getTime() - this.startTime.getTime()) / 1000; // Tiempo en segundos
    localStorage.setItem('timeTaken', timeTaken.toString());
    localStorage.setItem('errorsPerNumber', this.errorsPerNumber.toString());
    this.router.navigate(['/result']);
  }
}
