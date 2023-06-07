import { Component, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-load-games',
  templateUrl: './dialog-load-games.component.html',
  styleUrls: ['./dialog-load-games.component.scss'],
})
export class DialogLoadGamesComponent {
  private gamesCollection: CollectionReference<DocumentData>;
  allGameId: string[] = [];
  allGamePlayers: string[] = [];
  allGameLanguage: string[] = [];
  allGames: any = [];
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.gamesCollection = collection(this.firestore, 'games');

    collectionData(this.gamesCollection, { idField: 'id' }).subscribe(
      (data) => {
        data.forEach((game) => {
          let gamesobject = [];
          gamesobject['id'] = game['id'];
          gamesobject['players'] = game['players'].length;
          gamesobject['language'] = game['language'];
          this.allGames.push(gamesobject);
          console.log(this.allGames);
        });
      }
    );
    
    
  }

  // this.games$.subscribe((games) => {
  //   // with .subscribe we subscribe to the updates of this variable. We give the result (newTodos) into the function.
  //   console.log('Games sind', games);
  //   this.gameobjects = games;

  //   this.route.params.subscribe(params => {
  //     console.log(params['id'])
  //     docData(doc(this.firestore, `games/${params['id']}`))
  //   });
  // });

  // }
  // console.log(this.games);
  // console.log(gamesCollection);
}
