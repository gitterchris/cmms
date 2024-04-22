import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('comment')
  comment!: ElementRef<HTMLTextAreaElement>;
  inputRef!: HTMLTextAreaElement;
  users!: User[];
  filteredUsers!: User[];
  showUserList = false;
  selectedUserID = 0;
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

  ngAfterViewInit() {
    this.inputRef = this.comment.nativeElement;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === '@') {
      this.showUserList = true;
    }

    if (event.key === ' ') {
      this.resetUserList();
    }

    if (this.showUserList) {
      this.filterUserList(event);
    }
  }

  filterUserList(event: KeyboardEvent) {
    if (this.isLetter(event)) {
      this.filter.push(event.key);
    } else if (event.key === 'Backspace') {
      this.filter.pop();
      if (!this.filter.length) {
        this.resetUserList();
        return;
      }
    } else if (event.key === 'Enter') {
      if (this.selectedUserID) this.handleUserClick(this.selectedUserID);
    } else if (event.key === 'ArrowUp') {
      const currentSelectedIndex = this.filteredUsers.findIndex(
        (user) => this.selectedUserID === user.userID
      );
      this.selectedUserID =
        currentSelectedIndex === -1 || currentSelectedIndex === 0
          ? this.filteredUsers[this.filteredUsers.length - 1].userID
          : this.filteredUsers[currentSelectedIndex - 1].userID;
    } else if (event.key === 'ArrowDown') {
      const currentSelectedIndex = this.filteredUsers.findIndex(
        (user) => this.selectedUserID === user.userID
      );
      this.selectedUserID =
        currentSelectedIndex === -1 ||
        currentSelectedIndex === this.filteredUsers.length - 1
          ? this.filteredUsers[0].userID
          : this.filteredUsers[currentSelectedIndex + 1].userID;
    }
    this.filteredUsers = this.userService.filterUsers(
      this.filter.join('').substring(1)
    );

    if (!this.filteredUsers.length) {
      this.resetUserList();
    }
  }

  resetUserList() {
    this.showUserList = false;
    this.selectedUserID = 0;
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
    this.selectedUserID = userID;
    this.typeahead();
    this.inputRef.focus();
    this.resetUserList();
  }

  typeahead() {
    if (this.selectedUserID === 0) return;

    const selectedUser = this.userService.getUser(this.selectedUserID) ?? '';

    // TODO: this is buggy. Please fix.
    const oldTextAreaValue = this.inputRef.value;
    const startIndex = this.inputRef.selectionStart;
    const leftSide = oldTextAreaValue.slice(0, startIndex);
    const lastIndexOfDelimiter = leftSide.lastIndexOf('@');
    const newLeftSide = leftSide.substring(0, lastIndexOfDelimiter);

    const newTextAreaValue =
      newLeftSide + `@${selectedUser} ` + oldTextAreaValue.slice(startIndex);
    this.inputRef.value = newTextAreaValue;
  }
}
