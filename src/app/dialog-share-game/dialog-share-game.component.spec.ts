import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShareGameComponent } from './dialog-share-game.component';

describe('DialogShareGameComponent', () => {
  let component: DialogShareGameComponent;
  let fixture: ComponentFixture<DialogShareGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShareGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogShareGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
