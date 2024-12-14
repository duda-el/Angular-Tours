import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamvacationComponent } from './dreamvacation.component';

describe('DreamvacationComponent', () => {
  let component: DreamvacationComponent;
  let fixture: ComponentFixture<DreamvacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamvacationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DreamvacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
