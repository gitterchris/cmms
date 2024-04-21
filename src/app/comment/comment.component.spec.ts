import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains the comment based on the input', () => {
    component.comment = {
      text: '__comment__',
      dateTime: new Date('2024-01-02T23:50:21.817Z'),
    };

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    expect(html.querySelector('p')?.textContent).toMatch('__comment__');
    expect(html.querySelector('img')?.src).toMatch('assets/comment.svg');
    expect(html.querySelector('div.comment__date')?.textContent).toMatch(
      'System - 2024/01/02 06:50 PM'
    );
  });
});
