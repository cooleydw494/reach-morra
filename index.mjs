import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [ PlayerOne, PlayerTwo, PlayerThree ] =
  await stdlib.newTestAccounts(3, startingBalance);

const RESULT = ['Nobody', 'PlayerOne', 'PlayerTwo', 'PlayerThree'];

const Player = (Who) => ({
  ...stdlib.hasRandom,
  getHand: () => {
    // I used random() * max -1 and then added 1 because 0 isn't a real option
    return (Math.floor(Math.random() * 4) + 1);
  },
  getGuess: () => {
    // I used random() * max -1 and then added 1 because 0 isn't a real option
    return (Math.floor(Math.random() * 14) + 1);
  },
  seeResult: (winnerBitMask) => {
    if (winnerBitMask === 0) {
      console.log(`${Who} saw that nobody guessed correctly this round.`);
      return; // If nobody guessed correctly, that's that
    }
    if (winnerBitMask & 1) {
      console.log(`${Who} saw that PlayerOne guessed correctly this round.`);
    }
    if (winnerBitMask & 2) {
      console.log(`${Who} saw that PlayerTwo guessed correctly this round.`);
    }
    if (winnerBitMask & 4) {
      console.log(`${Who} saw that PlayerThree guessed correctly this round.`);
    }

    // If I end up using an array for some reason I wanted to save this code
    // for (i = 0; i < winnerInts.length - 1; i++) {
    //   console.log(`${Who} saw that ${RESULT[winnerInts[i]]}`);
    // }
  },
});

const ctcPlayerOne = PlayerOne.contract(backend);
const ctcPlayerTwo = PlayerTwo.contract(backend, PlayerOne.getInfo());
// Note: I'm not sure if I should also be passing PlayerOne info below
const ctcPlayerThree = PlayerThree.contract(backend, PlayerTwo.getInfo());

await Promise.all([
  backend.PlayerOne(ctcPlayerOne, {
    ...Player,
  }),
  backend.PlayerTwo(ctcPlayerTwo, {
    ...Player,
  }),
  backend.PlayerThree(ctcPlayerThree, {
    ...Player,
  }),
]);
