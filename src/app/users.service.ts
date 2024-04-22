import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUsers() {
    // TODO: retrieve this from http.get() and cache the result;
    return [
      { userID: 1, name: 'Kevin' },
      { userID: 2, name: 'Jeff' },
      { userID: 3, name: 'Bryan' },
      { userID: 4, name: 'Gabbey' },
    ];
  }

  filterUsers(filter: string) {
    const allUsers = this.getUsers();
    if (!filter || filter === '@') return allUsers;

    return allUsers.filter((user) =>
      user.name.toLowerCase().startsWith(filter.substring(1).toLowerCase())
    );
  }

  getUser(userID: number) {
    return this.getUsers().find((user) => userID === user.userID)?.name;
  }
}
