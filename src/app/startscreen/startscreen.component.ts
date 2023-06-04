import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore, collection, addDoc
} from '@angular/fire/firestore';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {

  }

ngOnInit(): void {
}

async newGame() {
  let game = new Game;
  const gamesCollection = collection(this.firestore, 'games');
  let gameJson = game.toJSONinit();
  await addDoc(gamesCollection, gameJson).then((gameInfo: any) => {    
    this.router.navigateByUrl('/game/' + gameInfo.id)
  });
  

}

}