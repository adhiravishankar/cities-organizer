import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrosTableComponent } from './metros-table.component';

describe('MetrosTableComponent', () => {
  let component: MetrosTableComponent;
  let fixture: ComponentFixture<MetrosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetrosTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetrosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
