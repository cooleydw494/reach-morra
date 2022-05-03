import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const reach = loadStdlib(process.env);

// import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
// reach.setWalletFallback(reach.walletFallback({
//   providerEnv: 'TestNet', MyAlgoConnect
// }));

const startingBalance = reach.parseCurrency(1000);

const [ PlayerOne, PlayerTwo ] =
  await reach.newTestAccounts(2, startingBalance);

const GUESS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HAND = [0, 1, 2, 3, 4, 5];
const RESULT = ['nobody', 'Player One', 'Player Two'];
const PLAYERNAMES = ['Player One', 'Player Two'];

const format = (atomicAmount) => {
  return `${reach.formatCurrency(atomicAmount)} ALGO`;
}

const Player = (Who) => ({
  ...reach.hasRandom,
  getHand: async () => {
    // I used random() * max -1 and then added 1 because 0 isn't a real option
    const hand = (Math.floor(Math.random() * 4) + 1);
    console.log(`${Who} threw a hand of ${hand} fingers.`);
    if (Math.random() <= 0.05) {
      for (let i = 0; i < 10; i++) {
        console.log(`${Who} takes their sweet time...`);
        await reach.wait(1);
      }
    }     
    return hand;
  },
  getGuess: async () => {
    // I used random() * max -1 and then added 1 because 0 isn't a real option
    const guess = (Math.floor(Math.random() * 9) + 1);
    console.log(`${Who} guessed ${guess}.`);
    if (Math.random() <= 0.05) {
      for (let i = 0; i < 10; i++) {
        console.log(`${Who} takes their sweet time...`);
        await reach.wait(1);
      }
    }     
    return guess;
  },
  seeResult: (result) => {
    console.log(`${Who} saw that ${RESULT[result]} guessed correctly this round.`);
    if (RESULT[result] === 'nobody') {
      console.log(`Time to play again`);
    }
  },
  informTimeout: (whoTimedOut) => {
    console.log(`${Who} observed that ${PLAYERNAMES[whoTimedOut]} took their sweet time and caused a timeout!`);
  }
});

const ctcPlayerOne = PlayerOne.contract(backend);
const ctcPlayerTwo = PlayerTwo.contract(backend, ctcPlayerOne.getInfo());

await Promise.all([
  backend.PlayerOne(ctcPlayerOne, {
    ...Player('Player One'),
    wager: reach.parseCurrency(10),
  }),
  backend.PlayerTwo(ctcPlayerTwo, {
    ...Player('Player Two'),
    acceptWager: (wagerAtomic) => {
      console.log(`Player Two accepts the wager of ${format(wagerAtomic)}`);
    },
  }),
]);
