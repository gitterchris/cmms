import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../types';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  @Input() selectedUserID!: number;
  @Input() users!: User[];
  @Output() onUserHover = new EventEmitter();
  @Output() onUserClick = new EventEmitter();
}
