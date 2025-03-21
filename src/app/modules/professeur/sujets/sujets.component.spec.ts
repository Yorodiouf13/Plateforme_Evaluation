import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetsComponent } from './sujets.component';

describe('SujetsComponent', () => {
  let component: SujetsComponent;
  let fixture: ComponentFixture<SujetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SujetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SujetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
