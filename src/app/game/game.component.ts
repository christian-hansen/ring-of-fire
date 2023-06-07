import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

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
import { TranslateService } from '@ngx-translate/core';
import { DialogShareGameComponent } from '../dialog-share-game/dialog-share-game.component';
import { LanguagetransferService } from '../languagetransfer.service';

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
  gamePlayable = false;
  href: string;

  defaultPlayerImage: string = 'profile5.png';
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    private router: ActivatedRoute,
    public menu: MatMenuModule,
    public toolbar: MatToolbarModule,
    public translate: TranslateService,
    private languagetransfer: LanguagetransferService
  ) {}

  async ngOnInit(): Promise<void> {
    this.newGame();

    this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      const gamesCollection = collection(this.firestore, 'games');
      const gameDocRef = doc(gamesCollection, this.gameId);
      console.log(gameDocRef);

      docData(gameDocRef).subscribe((game: any) => {
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.playedCards = game.playedCards;
        this.game.currentPlayer = game.currentPlayer;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.game.language = game.language;
        this.languagetransfer.setData(game.language);
        this.isGamePlayable();
        this.loadLanguage();
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
    console.log(this.game.language);
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
    const dialogRef = this.dialog.open(GameAboutComponent);
  }

  openExitDialog(): void {
    const dialogRef = this.dialog.open(DialogExitintentComponent);
  }

  openShareDialog(): void {
    const dialogRef = this.dialog.open(DialogShareGameComponent);
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
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
  }

  switchLanguage() {
    if (this.game.language === 'en') {
      this.translate.use('de');
      this.game.language = 'de';
      this.languagetransfer.setData(this.game.language);
      this.saveGame();
    } else {
      this.translate.use('en');
      this.game.language = 'en';
      this.languagetransfer.setData(this.game.language);
      this.saveGame();
    }
  }

  loadLanguage() {
    if (this.game.language === 'de') {
      this.translate.use('de');
    }
  }
}
