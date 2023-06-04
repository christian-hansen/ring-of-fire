import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  allProfilePictures = [
    'profile1.png',
    'profile2.png',
    'profile3.png',
    'profile4.png',
    'profile5.png',
    'profile6.png',
  ];
  name: string = '';
  permadialogue: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditPlayerComponent>,
    public dialog: MatDialog
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  openDeleteDialog(): void {
    this.permadialogue = true;
  }

  closeDeleteDialog(): void {
    this.permadialogue = false;
  }
}
