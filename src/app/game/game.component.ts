import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  docData,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game: Game;
  gameId: string;
  gameOver = false;

  constructor(public dialog: MatDialog, private router: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.newGame();
    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      const gamesCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(gamesCollection, this.gameId);

      docData(gameDocRef).subscribe((game: any) => {
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
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
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }
}
