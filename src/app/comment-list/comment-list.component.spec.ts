import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of comments', () => {
    component.comments = [
      {
        text: 'This Task was assigned to Daryl Babb',
        dateTime: new Date('2024-01-02T23:50:21.817Z'),
      },
      {
        text: 'Waiting on parts',
        dateTime: new Date('2024-01-03T23:50:21.817Z'),
      },
    ];

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;

    const comments = html.querySelectorAll('p');
    comments.forEach((p, index) =>
      expect(p.textContent).toMatch(component.comments[index].text)
    );

    const images = html.querySelectorAll('img');
    images.forEach((img) => expect(img.src).toMatch('assets/comment.svg'));

    const dates = html.querySelectorAll('div.comment__date');
    const expectedDates = ['2024/01/02 06:50 PM', '2024/01/03 06:50 PM'];
    dates.forEach((d, index) =>
      expect(d.textContent).toMatch(expectedDates[index])
    );
  });
});
