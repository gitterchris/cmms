import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button (type button) with image', () => {
    component.text = 'Submit';
    component.imageSource = '/assets/comment.svg';

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    expect(html.querySelector('button')?.textContent).toMatch('Submit');
    expect(html.querySelector('button')?.type).toBe('button');
    expect(html.querySelector('img')?.src).toMatch('assets/comment.svg');
  });

  it('should render a simple button of type submit', () => {
    component.text = 'Submit';
    component.type = 'submit';

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    expect(html.querySelector('button')?.textContent).toMatch('Submit');
    expect(html.querySelector('button')?.type).toBe('submit');
    expect(html.querySelector('img')).toBe(null);
  });

  it('should emit the event when button is clicked', () => {
    component.text = 'Submit';
    component.type = 'submit';
    const emitSpy = spyOn(component.onButtonClick, 'emit');

    fixture.detectChanges();

    const html: HTMLElement = fixture.nativeElement;
    const button = html.querySelector('button');
    button?.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
