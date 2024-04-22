import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUsers() {
    // TODO: retrieve this from http.get();
    return [
      { userID: 1, name: 'Kevin' },
      { userID: 2, name: 'Jeff' },
      { userID: 3, name: 'Bryan' },
      { userID: 4, name: 'Gabbey' },
    ];
  }
}
