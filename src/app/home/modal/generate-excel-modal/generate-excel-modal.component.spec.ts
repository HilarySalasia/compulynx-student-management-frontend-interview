import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateExcelModalComponent } from './generate-excel-modal.component';

describe('GenerateExcelModalComponent', () => {
  let component: GenerateExcelModalComponent;
  let fixture: ComponentFixture<GenerateExcelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateExcelModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateExcelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
