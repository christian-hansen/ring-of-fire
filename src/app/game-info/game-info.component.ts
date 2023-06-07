import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LanguagetransferService } from '../languagetransfer.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  // cardActionx = [
  //   {
  //     title: 'Waterfall',
  //     description:
  //       'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
  //   },
  //   { title: 'You', description: 'You decide who drinks' },
  //   { title: 'Me', description: 'Congrats! Drink a shot!' },
  //   {
  //     title: 'Category',
  //     description:
  //       'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
  //   },
  //   {
  //     title: 'Bust a jive',
  //     description:
  //       'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ',
  //   },
  //   { title: 'Chicks', description: 'All girls drink.' },
  //   {
  //     title: 'Heaven',
  //     description: 'Put your hands up! The last player drinks!',
  //   },
  //   {
  //     title: 'Mate',
  //     description:
  //       'Pick a mate. Your mate must always drink when you drink and the other way around.',
  //   },
  //   {
  //     title: 'Thumbmaster',
  //     description:
  //       'The player who drew the card must put their thumb on the table at a chosen time. The last person to put their thumb on the table must drink.',
  //   },
  //   { title: 'Men', description: 'All men drink.' },
  //   {
  //     title: 'Quizmaster',
  //     description:
  //       'You become the question master, and if anybody answers ANY question asked by you, they have to drink.',
  //   },
  //   {
  //     title: 'Never have i ever...',
  //     description:
  //       'Say something you nnever did. Everyone who did it has to drink.',
  //   },
  //   {
  //     title: 'Rule',
  //     description:
  //       'Make a rule. Everyone needs to drink when he breaks the rule.',
  //   },
  // ];

  cardActionEN = [
    {
      title: 'Ace',
      description:
        'The ace represents the waterfall. All players start drinking at the same time. Drinking can only stop clockwise when the player´s right neighbor stops drinking. The player who drew the ace can stop drinking whenever they want.',
    },
    {
      title: '2 is for you',
      description: 'You get to choose someone to take a sip from their drink.',
    },
    { title: '3 is me', description: 'You have to take a sip.' },
    {
      title: '4 is floor',
      description:
        'Touch the floor with your hand. The player who touches the floor last has to take a sip.',
    },
    {
      title: '5 is thumbmaster',
      description:
        'Touch the table with your thumb. The player who touches the table last has to take a sip.',
    },
    {
      title: '6 is for chicks',
      description: 'All female players have to take a sip.',
    },
    {
      title: '7 is heaven',
      description:
        'Point your index finger towards the sky. The player who points to the sky last has to take a sip.',
    },
    {
      title: '8 is mate',
      description:
        'Choose a player who becomes your drinking mate. They have to take a sip whenever you do.',
    },
    {
      title: '9 is rhyme',
      description:
        "Choose a word. Starting clockwise, each player has to come up with a rhyme for it. If a player repeats a word or can't think of a new rhyme, they have to take a sip.",
    },
    {
      title: '10 is men',
      description: 'All male players can toast and take a sip.',
    },
    {
      title: 'Jack',
      description:
        'The player who draws a jack gets to create a new game rule that lasts until the end of the game. The rule cannot override any existing rules.',
    },
    {
      title: 'Queen',
      description:
        'The player can initiate a round of "Never have I ever...". The players who have done the mentioned actions have to take a sip.',
    },
    {
      title: 'King',
      description:
        'When a King is drawn, the player can pour a drink of their choice into the Kingscup. If it is the fourth king drawn, the player must immediately empty the Kingscup in the middle of the game.',
    },
  ];

  cardActionDE = [
    {
      title: 'Ass',
      description:
        'Das Ass steht für den Wasserfall. Alle Spieler beginnen zur gleichen Zeit zu trinken. Das Trinken kann nur im Uhrzeigersinn aufhören, wenn der rechte Nachbar des Spielers aufhört zu trinken. Der Spieler, der das Ass gezogen hat, kann aufhören zu trinken, wann immer er will.',
    },
    {
      title: '2 ist für dich',
      description:
        'Du darfst dir jemanden aussuchen, der einen Schluck von seinem Getränk nimmt.',
    },
    { title: '3 ist für mich', description: 'Du musst einen Schluck nehmen.' },
    {
      title: '4 ist der Boden',
      description:
        'Berühre den Boden mit deiner Hand. Der Spieler, der den Boden zuletzt berührt, muss einen Schluck trinken.',
    },
    {
      title: '5 ist der Daumenmeister',
      description:
        'Berühre den Tisch mit deinem Daumen. Der Spieler, der den Tisch zuletzt berührt, muss einen Schluck trinken.',
    },
    {
      title: '6 ist für Tussis',
      description: 'Alle weiblichen Spieler müssen einen Schluck nehmen.',
    },
    {
      title: '7 ist der Himmel',
      description:
        'Zeige mit dem Zeigefinger zum Himmel. Der Spieler, der zuletzt in den Himmel zeigt, muss einen Schluck nehmen.',
    },
    {
      title: '8 ist Kumpel',
      description:
        'Wähle einen Spieler, der dein Trinkkumpel wird. Er muss immer dann einen Schluck trinken, wenn du es tust.',
    },
    {
      title: '9 ist Reim',
      description:
        'Wähle ein Wort. Im Uhrzeigersinn beginnend, muss sich jeder Spieler einen Reim darauf machen. Wenn ein Spieler ein Wort wiederholt oder sich keinen neuen Reim ausdenken kann, muss er einen Schluck nehmen.',
    },
    {
      title: '10 ist Männer',
      description:
        'Alle männlichen Spieler dürfen anstoßen und einen Schluck nehmen.',
    },
    {
      title: 'Bube',
      description:
        'Der Spieler, der einen Buben zieht, darf eine neue Spielregel aufstellen, die bis zum Ende des Spiels gültig ist. Die Regel kann keine bestehenden Regeln außer Kraft setzen.',
    },
    {
      title: 'Dame',
      description:
        'Der Spieler kann eine Runde "Ich habe noch nie..." einleiten. Die Spieler, die die genannten Aktionen durchgeführt haben, müssen einen Schluck nehmen.',
    },
    {
      title: 'König',
      description:
        'Wenn ein König gezogen wird, kann der Spieler ein Getränk seiner Wahl in den Königsbecher schütten. Wenn es der vierte gezogene König ist, muss der Spieler den Königsbecher in der Mitte des Spiels sofort leeren.',
    },
  ];

  title: string = '';
  description: string = '';
  language: string = '';
  @Input() card: string;

  constructor(private languagetransfer: LanguagetransferService) {}

  ngOnInit(): void {
    this.language = this.languagetransfer.getData();
    console.log(this.language);
  }

  ngOnChanges(): void {
    

    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      if (this.language === 'de') {
        this.title = this.cardActionDE[cardNumber - 1].title;
        this.description = this.cardActionDE[cardNumber - 1].description;
      } else {
        this.title = this.cardActionEN[cardNumber - 1].title;
        this.description = this.cardActionEN[cardNumber - 1].description;
      }
    }
  }
}
