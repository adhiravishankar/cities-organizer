import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodDetailsComponent } from './neighborhood-details.component';

describe('NeighborhoodDetailsComponent', () => {
  let component: NeighborhoodDetailsComponent;
  let fixture: ComponentFixture<NeighborhoodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
