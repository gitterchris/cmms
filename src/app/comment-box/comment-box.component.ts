import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from '../users-list/users-list.component';
import { UsersService } from '../users.service';
import { User } from '../types';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UsersListComponent],
  templateUrl: './comment-box.component.html',
  styleUrl: './comment-box.component.scss',
})
export class CommentBoxComponent {
  @Input() form!: FormGroup;
  users!: User[];
  showUserList = false;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === '@') {
      this.showUserList = true;
    }
  }

  handleUserHover(userID: number) {
    // TODO
    console.log('User hover', userID);
  }

  handleUserClick(userID: number) {
    // TODO
    console.log('User click', userID);
  }
}
