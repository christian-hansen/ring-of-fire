import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoadGamesComponent } from './dialog-load-games.component';

describe('DialogLoadGamesComponent', () => {
  let component: DialogLoadGamesComponent;
  let fixture: ComponentFixture<DialogLoadGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoadGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLoadGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
