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

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.selectedUserID) {
      this.handleUserClick(this.selectedUserID);
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
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const currentSelectedIndex = this.filteredUsers.findIndex(
        (user) => this.selectedUserID === user.userID
      );
      this.selectedUserID =
        currentSelectedIndex === -1 || currentSelectedIndex === 0
          ? this.filteredUsers[this.filteredUsers.length - 1].userID
          : this.filteredUsers[currentSelectedIndex - 1].userID;
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
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
    const startIndex = this.getStartIndex() + 1;
    const newLeftSide = oldTextAreaValue.slice(0, startIndex);
    const newRightSide = oldTextAreaValue.slice(this.inputRef.selectionStart);

    const newTextAreaValue = newLeftSide + `@${selectedUser} ` + newRightSide;
    this.inputRef.value = newTextAreaValue;

    const newCursorLocation = startIndex + selectedUser.length + 1;
    this.inputRef.selectionStart = newCursorLocation;
    this.inputRef.selectionEnd = newCursorLocation;
  }

  getStartIndex() {
    let startIndex = this.inputRef.selectionStart;
    while (this.inputRef.value[startIndex] !== ' ' && startIndex !== 0) {
      --startIndex;
    }

    return startIndex;
  }
}
