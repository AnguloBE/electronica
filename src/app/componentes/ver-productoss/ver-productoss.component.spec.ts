import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductossComponent } from './ver-productoss.component';

describe('VerProductossComponent', () => {
  let component: VerProductossComponent;
  let fixture: ComponentFixture<VerProductossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerProductossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerProductossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
