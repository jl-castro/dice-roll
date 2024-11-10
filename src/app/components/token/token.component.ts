import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent {
  @Input() color: string = 'red'; // Color predeterminado
  @Input() playerIcon: IconDefinition = {} as IconDefinition;
}
