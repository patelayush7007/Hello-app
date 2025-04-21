import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterSuccessComponent } from './twitter-success.component';

describe('TwitterSuccessComponent', () => {
  let component: TwitterSuccessComponent;
  let fixture: ComponentFixture<TwitterSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwitterSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwitterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
