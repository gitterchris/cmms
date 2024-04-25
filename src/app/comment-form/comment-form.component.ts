import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { CommentsService } from '../comments.service';
import { Comment } from '../types';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [
    CommentListComponent,
    CommentBoxComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  commentForm = this.formBuilder.group({ comment: '' });
  comments!: Comment[];
  title = 'cmms';
  userSet!: Set<string>;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userSet = new Set(
      this.userService.getUsers().map((user) => user.name)
    );
    this.comments = this.commentService.getComments();
  }

  handleCommentSubmit() {
    console.log('Form submitted!', this.commentForm.value);
    this.comments.push({
      text: this.commentForm.value.comment ?? '',
      dateTime: new Date(),
    });

    const userNames = this.parseUserNames();
    // call a service to notify the user.
    console.log('The following users are notified: ', userNames?.join(','));

    this.commentForm.reset();

    // TODO: Call a service that submits the comment to the backend.
  }

  parseUserNames() {
    const userNames = this.commentForm.value.comment
      ?.split(/[" " \n]+/)
      .filter((comment) => this.isValidUserName(comment))
      .map((username) => username.substring(1));

    const set = new Set(userNames);
    return [...set];
  }

  isValidUserName(word: string) {
    if (!word.startsWith('@')) return false;
    return this.userSet.has(word.substring(1));
  }
}
