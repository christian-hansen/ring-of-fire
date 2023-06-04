import { Component } from '@angular/core';

import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-game-about',
  templateUrl: './game-about.component.html',
  styleUrls: ['./game-about.component.scss']
})
export class GameAboutComponent {

  constructor(private dialogRef: MatDialogRef<GameAboutComponent>) {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
