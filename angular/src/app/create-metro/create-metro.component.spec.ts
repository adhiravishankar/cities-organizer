import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetroComponent } from './create-metro.component';

describe('CreateMetroComponent', () => {
  let component: CreateMetroComponent;
  let fixture: ComponentFixture<CreateMetroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMetroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
