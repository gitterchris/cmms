import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentBoxComponent } from '../comment-box/comment-box.component';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    CommentListComponent,
    CommentBoxComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  commentForm = this.formBuilder.group({ comment: '' });
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

  constructor(private formBuilder: FormBuilder) {}

  handleCommentSubmit() {
    console.log('Form submitted!', this.commentForm.value);
    this.comments.push({
      text: this.commentForm.value.comment ?? '',
      dateTime: new Date(),
    });
    this.commentForm.reset();

    // TODO: Call a service that submits the comment to the backend.
  }
}
