import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../comments';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  @Input() comments!: Comment[];
}
