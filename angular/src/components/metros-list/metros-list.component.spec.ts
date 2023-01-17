import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetrosListComponent } from './metros-list.component';

describe('MetrosListComponent', () => {
  let component: MetrosListComponent;
  let fixture: ComponentFixture<MetrosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetrosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
