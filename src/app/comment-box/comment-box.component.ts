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
  filteredUsers!: User[];
  showUserList = false;
  /* 
    We need the '@' as the first element to determine
    if the popup will still be shown after repeated backspace. 
  */
  filter: string[] = ['@'];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  onKeydown(event: KeyboardEvent) {
    console.log('CHRIS!!! KEY ENTERED!!!', event);
    if (event.key === '@') {
      this.showUserList = true;
    }
    if (event.key === ' ') {
      this.resetUserList();
    }

    if (this.showUserList) {
      if (this.isLetter(event)) {
        this.filter.push(event.key);
      } else if (event.key === 'Backspace') {
        this.filter.pop();
        if (!this.filter.length) {
          this.resetUserList();
          return;
        }
      }
      this.filteredUsers = this.userService.filterUsers(
        this.filter.join('').substring(1)
      );
    }
  }

  resetUserList() {
    this.showUserList = false;
    this.filter = ['@'];
  }

  isLetter(event: KeyboardEvent) {
    return event.which >= 65 && event.which <= 90;
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
