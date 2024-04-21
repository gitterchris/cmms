import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type = 'button';
  @Input() imageSource: string | null = null;
  @Input() text!: string;
  @Output() onButtonClick = new EventEmitter();
}
