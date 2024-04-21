import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss',
})
export class CommentBoxComponent {
  onKeydown(event: KeyboardEvent) {
    // TODO: detects @ and do something about it.
    console.log('Key down event', event);
  }
}
