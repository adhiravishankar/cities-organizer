import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetroDetailsComponent } from './metro-details.component';

describe('MetroDetailsComponent', () => {
  let component: MetroDetailsComponent;
  let fixture: ComponentFixture<MetroDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetroDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
