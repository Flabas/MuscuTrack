import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDetail } from './program-detail';

describe('ProgramDetail', () => {
  let component: ProgramDetail;
  let fixture: ComponentFixture<ProgramDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
