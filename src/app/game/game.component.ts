import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {
  Firestore,
  collection,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { GameAboutComponent } from '../game-about/game-about.component';
import { DialogExitintentComponent } from '../dialog-exitintent/dialog-exitintent.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game: Game;
  gameId: string;
  gameOver = false;
  gamePlayable = false;
  href: string;
  defaultPlayerImage: string = 'profile5.png';
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(public dialog: MatDialog, public dialog2: MatDialog, private router: ActivatedRoute, public menu: MatMenuModule, public toolbar: MatToolbarModule) {
    console.log(this.router.url['value'][0]);
    console.log(this.router.url['value'][1]);
  }

  async ngOnInit(): Promise<void> {
    this.newGame();
    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      const gamesCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(gamesCollection, this.gameId);

      docData(gameDocRef).subscribe((game: any) => {
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.isGamePlayable();
      });
      
    });
  }

  async newGame() {
    this.game = new Game();
  }

  async saveGame() {
    const gamesCollection = collection(this.firestore, 'games');
    const gameDocRef = doc(gamesCollection, this.gameId);
    let gameJson = this.game.toJSON();
    await setDoc(gameDocRef, gameJson);
  }

  takeCard() {
    if (this.gamePlayable) {
      if (this.game.stack.length == 0) {
        this.gameOver = true;
      } else if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;

        this.nextPlayer();
        this.saveGame();
        setTimeout(() => {
          this.game.pickCardAnimation = false;
          this.game.playedCards.push(this.game.currentCard);
          this.saveGame();
        }, 1000);
      }
    } else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push(this.defaultPlayerImage);
        this.isGamePlayable();
        this.saveGame();
      }
    });
  }

  openAboutDialog(): void {
    const dialogRef = this.dialog.open(GameAboutComponent)
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(DialogExitintentComponent)
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  editPlayer(playerId: number) {
    console.log('Edit player', playerId);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          console.log('Player deleted');
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          console.log('received change', change);
          this.game.player_images[playerId] = change;
        }
        this.isGamePlayable();
        this.saveGame();
      }
    });
  }

  isGamePlayable() {
    if (this.game.players.length === 0) {
      this.gamePlayable = false;
    } else {
      this.gamePlayable = true;
    }
    console.log('Game playable?', this.gamePlayable);
  }


  shareGame() {
    console.log(window.location.href)
  }

  switchLanguage() {
    console.log('Change language')
  }


}
