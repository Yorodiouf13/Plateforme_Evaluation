import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseDetailsComponent } from './classe-details.component';

describe('ClasseDetailsComponent', () => {
  let component: ClasseDetailsComponent;
  let fixture: ComponentFixture<ClasseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
