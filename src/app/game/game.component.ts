import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  addDoc,
  getDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  //s$: Observable<any[]>;
  games: any;

  constructor(public dialog: MatDialog, private router: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.newGame();
    this.router.params.subscribe(async (params) => {
      console.log(params['id']);
      const gamesCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(gamesCollection, params['id']);

      docData(gameDocRef).subscribe((game:any) => {
        console.log(game);
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        console.log(game.players);
    });
  });
  }

  async newGame() {
    this.game = new Game();

    const gamesCollection = collection(this.firestore, 'games');

    let gameJson = this.game.toJSON();
    // await addDoc(gamesCollection, gameJson);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      this.nextPlayer();

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }
}
