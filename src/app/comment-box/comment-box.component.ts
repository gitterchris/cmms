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

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.filteredUsers = [...this.users];
  }

  ngAfterViewInit() {
    this.inputRef = this.comment.nativeElement;
  }

  onKeydown(event: KeyboardEvent) {
    if (this.showUserList === false) return;

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const currentSelectedIndex = this.filteredUsers.findIndex(
        (user) => this.selectedUserID === user.userID
      );
      this.selectedUserID =
        currentSelectedIndex === -1 || currentSelectedIndex === 0
          ? this.filteredUsers[this.filteredUsers.length - 1].userID
          : this.filteredUsers[currentSelectedIndex - 1].userID;
    }

    if (event.key === 'ArrowDown') {
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
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.selectedUserID && this.showUserList) {
      event.preventDefault();
      this.typeahead();
      this.showUserList = false;
      return;
    }
    this.manageUserList();
  }

  resetUserList() {
    this.showUserList = false;
    this.selectedUserID = 0;
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

    const selectedUser = this.userService.getUser(this.selectedUserID);

    const oldTextAreaValue = this.removeNewLine(this.inputRef.value);

    const startIndex = this.getStartIndex();
    const newLeftSide = oldTextAreaValue.slice(0, startIndex);
    const currentFilter = this.getCurrentWordBeingTyped();
    const endIndex = startIndex + currentFilter.length;
    const newRightSide = oldTextAreaValue.slice(endIndex);
    const newTextAreaValue =
      `${newLeftSide.trim()} @${selectedUser} ${newRightSide.trim()} `.trim();
    this.inputRef.value = newTextAreaValue + ' ';

    // not sure if mutating this is a good idea in Angular since this form is coming from parent.
    // without this, form is not picking up the entire username value.
    this.form.value.comment = newTextAreaValue + ' ';
    const newCursorLocation =
      newLeftSide.length + (selectedUser?.length ?? 0) + 2;
    this.inputRef.selectionStart = newCursorLocation;
    this.inputRef.selectionEnd = newCursorLocation;
  }

  getStartIndex() {
    let startIndex = this.inputRef.selectionStart;
    while (startIndex > 0 && this.inputRef.value[startIndex - 1] !== ' ') {
      --startIndex;
    }

    return startIndex;
  }

  getCurrentWordBeingTyped() {
    const startIndex = this.getStartIndex();
    const endIndex = this.inputRef.selectionStart;
    return this.removeNewLine(
      this.inputRef.value.substring(startIndex, endIndex)
    );
  }

  // Do not allow new line for the mean time.
  removeNewLine(str: string) {
    return str.replace(/[\r\n\v]+/g, '');
  }

  manageUserList() {
    const wordBeingTyped = this.getCurrentWordBeingTyped().trim();
    if (!wordBeingTyped.startsWith('@') || !wordBeingTyped) {
      this.showUserList = false;
      return;
    }

    this.showUserList = true;
    this.filteredUsers = this.userService.filterUsers(wordBeingTyped);
    const currentSelectedUserInTheFilteredResult = this.filteredUsers.some(
      (user) => user.userID === this.selectedUserID
    );
    if (!this.selectedUserID || !currentSelectedUserInTheFilteredResult)
      this.selectedUserID = this.filteredUsers[0]?.userID ?? 0;
    if (!this.filteredUsers.length) this.showUserList = false;
  }
}
