import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor() {}

  getComments() {
    // TODO: Retrieve this using http.get
    return [
      {
        text: 'This Task was assigned to Daryl Babb',
        dateTime: new Date(),
      },
      {
        text: 'Waiting on parts',
        dateTime: new Date(),
      },
    ];
  }
}
