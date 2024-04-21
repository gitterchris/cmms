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
  comment = {
    text: 'This Task was assigned to Daryl Babb',
    dateTime: new Date(),
  };
  title = 'cmms';
}
