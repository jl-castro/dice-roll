import { Component, OnInit } from '@angular/core';
import {
  faArrowLeft,
  faArrowRight,
  faFish,
  faGamepad,
  faHorse,
} from '@fortawesome/free-solid-svg-icons';
import { JsonBinService } from 'src/app/services/json-bin.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public leftArrowIcon = faArrowLeft;
  public rightArrowIcon = faArrowRight;
  public playerIcon = faGamepad;
  public playerOneIcon = faHorse;
  public playerTwoIcon = faFish;
  public color1 = '#A66E38';
  public color2 = '#024CAA';
  public showModal = false;

  rows: (string | number)[][] = [];
  playerPositions = [
    { row: 0, cell: 0 }, // Posición del Jugador 1
    { row: 0, cell: 0 }, // Posición del Jugador 2
  ];
  currentPlayer = 0; // 0 para Jugador 1, 1 para Jugador 2
  questionList: any[] = [];
  url = '';
  text = '';
  constructor(private json: JsonBinService) {
    this.crearTablero();
  }

  ngOnInit(): void {
    this.json.getQuestions().subscribe((response) => {
      if (response) {
        this.questionList = [...response];
        console.log(this.questionList);
      }
    });
  }

  crearTablero() {
    let numero = 1;
    const filas = [7, 8, 7]; // Define la cantidad de casillas por fila

    // Crea las filas en formato serpiente
    filas.forEach((cantidad, index) => {
      const row = Array.from({ length: cantidad }, () => numero++);
      if (index % 2 !== 0) {
        row.reverse(); // Invertir la fila para el efecto de serpiente
      }
      this.rows.push(row);
    });

    // Agregar "Inicio" al inicio de la primera fila y "Fin" al final de la última fila
    this.rows[0].unshift('Inicio');
    this.rows[this.rows.length - 1].push('Fin');
  }

  moveForward() {
    const player = this.playerPositions[this.currentPlayer];

    // Si está en "Fin", no avanzar
    if (player.row === 2 && player.cell === this.rows[2].length - 1) return;

    if (player.row % 2 === 0) {
      // Fila par: avanzar de izquierda a derecha
      if (player.cell < this.rows[player.row].length - 1) {
        player.cell++;
      } else {
        // Ir a la última casilla de la siguiente fila
        player.row++;
        player.cell = this.rows[player.row].length - 1;
      }
    } else {
      // Fila impar: avanzar de derecha a izquierda
      if (player.cell > 0) {
        player.cell--;
      } else {
        // Ir a la primera casilla de la siguiente fila
        player.row++;
        player.cell = 0;
      }
    }
  }

  moveBackward() {
    const player = this.playerPositions[this.currentPlayer];

    // Si está en "Inicio", no retroceder
    if (player.row === 0 && player.cell === 0) return;

    if (player.row % 2 === 0) {
      // Fila par: retroceder de derecha a izquierda
      if (player.cell > 0) {
        player.cell--;
      } else {
        // Ir a la primera casilla de la fila anterior
        player.row--;
        player.cell = 0;
      }
    } else {
      // Fila impar: retroceder de izquierda a derecha
      if (player.cell < this.rows[player.row].length - 1) {
        player.cell++;
      } else {
        // Ir a la última casilla de la fila anterior
        player.row--;
        player.cell = this.rows[player.row].length - 1;
      }
    }
  }

  // Cambia de jugador
  changeTurn() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  getCellValue(value: string | number): void {
    if (value !== 'Inicio' && value !== 'Fin') {
      const cell = Number(value) - 1;
      this.url = '../assets/img/' + this.questionList[cell].img;
      this.text = this.questionList[cell].value;
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
