import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardActionx = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'The player who drew the card must put their thumb on the table at a chosen time. The last person to put their thumb on the table must drink.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'You become the question master, and if anybody answers ANY question asked by you, they have to drink.' },
    { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  cardAction = [
    { title: 'Ace', description: 'The ace represents the waterfall. All players start drinking at the same time. Drinking can only stop clockwise when the player´s right neighbor stops drinking. The player who drew the ace can stop drinking whenever they want.' },
    { title: '2 is for you', description: 'You get to choose someone to take a sip from their drink.' },
    { title: '3 is me', description: 'You have to take a sip.' },
    { title: '4 is floor', description: 'Touch the floor with your hand. The player who touches the floor last has to take a sip.' },
    { title: '5 is thumbmaster', description: 'Touch the table with your thumb. The player who touches the table last has to take a sip.' },
    { title: '6 is for chicks', description: 'All female players have to take a sip.' },
    { title: '7 is heaven', description: 'Point your index finger towards the sky. The player who points to the sky last has to take a sip.' },
    { title: '8 is mate', description: 'Choose a player who becomes your drinking mate. They have to take a sip whenever you do.' },
    { title: '9 is rhyme', description: 'Choose a word. Starting clockwise, each player has to come up with a rhyme for it. If a player repeats a word or can\'t think of a new rhyme, they have to take a sip.' },
    { title: '10 is men', description: 'All male players can toast and take a sip.' },
    { title: 'Jack', description: 'The player who draws a jack gets to create a new game rule that lasts until the end of the game. The rule cannot override any existing rules.' },
    { title: 'Queen', description: 'The player can initiate a round of "Never have I ever...". The players who have done the mentioned actions have to take a sip.' },
    { title: 'King', description: 'When a King is drawn, the player can pour a drink of their choice into the Kingscup. If it is the fourth king drawn, the player must immediately empty the Kingscup in the middle of the game.' }    
  ];

  title: string = '';
  description: string = '';
  @Input() card: string;

  constructor() {

  }

  ngOnInit(): void{
  }

  ngOnChanges(): void {
    if(this.card) {
    let cardNumber = +this.card.split('_')[1];
    // let cardSymbol = this.card.split('_')[0];
    this.title = this.cardAction[cardNumber - 1].title;
    this.description = this.cardAction[cardNumber - 1].description;
  }
}
}
