import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodsTableComponent } from './neighborhoods-table.component';

describe('NeighborhoodsTableComponent', () => {
  let component: NeighborhoodsTableComponent;
  let fixture: ComponentFixture<NeighborhoodsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
