import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  comments = [
    {
      text: 'This Task was assigned to Daryl Babb',
      dateTime: new Date(),
    },
    {
      text: 'Waiting on parts',
      dateTime: new Date(),
    },
  ];
  title = 'cmms';
}
