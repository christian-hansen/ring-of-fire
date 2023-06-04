import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exitintent',
  templateUrl: './dialog-exitintent.component.html',
  styleUrls: ['./dialog-exitintent.component.scss']
})
export class DialogExitintentComponent {

  constructor(private dialogRef: MatDialogRef<DialogExitintentComponent>) {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  leaveGame() {
    window.location.href = "/";
  }
}
