import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../types';
import { UsersService } from '../users.service';

interface Word {
  text: string;
  isUserName: boolean;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: Comment;
  words!: Word[];
  userSet!: Set<string>;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userSet = new Set(
      this.userService.getUsers().map((user) => user.name)
    );
    this.parseUserName();
  }

  parseUserName() {
    this.words = this.comment.text
      .split(/[" " \n]+/) // split by " " and new line
      .map((text) => ({
        text,
        isUserName: this.isValidUserName(text),
      }));
  }

  isValidUserName(word: string) {
    if (!word.startsWith('@')) return false;
    return this.userSet.has(word.substring(1));
  }
}
