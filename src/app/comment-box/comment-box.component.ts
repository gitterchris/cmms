import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss',
})
export class CommentBoxComponent {
  @Input() form!: FormGroup;

  onKeydown(event: KeyboardEvent) {
    // TODO: detects @ and do something about it.
    console.log('Key down event', event);
  }
}
