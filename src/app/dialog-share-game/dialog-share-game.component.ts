import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-dialog-share-game',
  templateUrl: './dialog-share-game.component.html',
  styleUrls: ['./dialog-share-game.component.scss']
})
export class DialogShareGameComponent {
  location: string;

  constructor(private dialogRef: MatDialogRef<DialogShareGameComponent>, private card: MatCardModule, private clipboard: Clipboard) {
this.location = window.location.href;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyLocationLink() {
    this.clipboard.copy(this.location);
  }

}
