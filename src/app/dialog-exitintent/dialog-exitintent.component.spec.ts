import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExitintentComponent } from './dialog-exitintent.component';

describe('DialogExitintentComponent', () => {
  let component: DialogExitintentComponent;
  let fixture: ComponentFixture<DialogExitintentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExitintentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExitintentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
