import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cmms';
  date = new Date();
}
