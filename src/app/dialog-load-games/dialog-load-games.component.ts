import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-load-games',
  templateUrl: './dialog-load-games.component.html',
  styleUrls: ['./dialog-load-games.component.scss']
})
export class DialogLoadGamesComponent {

  firestore: Firestore = inject(Firestore)
  games$: any;

  constructor() {
    const gamesCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gamesCollection);

    this.games$.subscribe((games) => {
      // with .subscribe we subscribe to the updates of this variable. We give the result (newTodos) into the function.
      console.log('Games sind', games);
    });
  }
    // console.log(this.games);
    // console.log(gamesCollection);
    
  }


