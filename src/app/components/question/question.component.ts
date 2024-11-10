import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input() url = '';
  @Input() text = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
}
