'reach 0.1';

const [isResult, NOBODY, PLAYERONE, PLAYERTWO] = makeEnum(3);
const [isGuess, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN] = makeEnum(10);
const [isHand, ONEHAND, TWOHAND, THREEHAND, FOURHAND, FIVEHAND] = makeEnum(5);
const [isPlayerName, PLAYERONENAME, PLAYERTWONAME] = makeEnum(2);

const deadline = 25;

const Player = {
  ...hasRandom,
  getHand: Fun([], UInt),
  getGuess: Fun([], UInt),
  seeResult: Fun([UInt], Null),
  informTimeout: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const PlayerOne = Participant('PlayerOne', {
    ...Player,
    wager: UInt,
  });
  const PlayerTwo = Participant('PlayerTwo', {
    ...Player,
    acceptWager: Fun([UInt], Null),
  });
  const informTimeout = (WhoTimedOut) => {
    each([PlayerOne, PlayerTwo], () => {
      interact.informTimeout(WhoTimedOut);
    });
  }
  init();

  PlayerOne.only(() => {
    const wager = declassify(interact.wager);
  });
  PlayerOne.publish(wager)
    .pay(wager);
  commit();

  PlayerTwo.only(() => {
    interact.acceptWager(wager);
  });
  PlayerTwo.pay(wager)
    .timeout(relativeTime(deadline), () => closeTo(PlayerOne, () => informTimeout(PLAYERTWONAME)));

  var winner = NOBODY;
  invariant(balance() === 2 * wager && isResult(winner));
  while (winner == NOBODY) {
    commit();

    PlayerOne.only(() => {
      const _hand1 = interact.getHand();
      const [_handCommit1, _handSalt1] = makeCommitment(interact, _hand1);
      const _guess1 = interact.getGuess();
      const [_guessCommit1, _guessSalt1] = makeCommitment(interact, _guess1);
      const handCommit1 = declassify(_handCommit1);
      const guessCommit1 = declassify(_guessCommit1);
    });

    PlayerOne.publish(handCommit1, guessCommit1)
      .timeout(relativeTime(deadline), () => closeTo(PlayerTwo, () => informTimeout(PLAYERONENAME)));
    
    commit();

    unknowable(PlayerTwo, PlayerOne(_hand1, _handSalt1, _guess1, _guessSalt1));

    PlayerTwo.only(() => {
      const hand2 = declassify(interact.getHand());
      const guess2 = declassify(interact.getGuess());
    });

    PlayerTwo.publish(hand2, guess2)
      .timeout(relativeTime(deadline), () => closeTo(PlayerOne, () => informTimeout(PLAYERTWONAME)));

    commit();

    PlayerOne.only(() => {
      const hand1 = declassify(_hand1);
      const handSalt1 = declassify(_handSalt1);
      const guess1 = declassify(_guess1);
      const guessSalt1 = declassify(_guessSalt1);
    });
    PlayerOne.publish(hand1, handSalt1, guess1, guessSalt1);

    checkCommitment(handCommit1, handSalt1, hand1);
    checkCommitment(guessCommit1, guessSalt1, guess1);

    const correctAnswer = hand1 + hand2;
    if (guess1 === guess2) {
      // TODO: Maybe a specialized DRAW case distinct from just "nobody won"
    } else if (correctAnswer === guess1) {
      winner = PLAYERONE;
      continue;
    } else if (correctAnswer === guess2) {
      winner = PLAYERTWO;
      continue;
    }

    each([PlayerOne, PlayerTwo], () => {
      interact.seeResult(NOBODY);
    });
    continue;
  }


  assert(winner === PLAYERONE || winner === PLAYERTWO);
  transfer(2 * wager).to(winner === PLAYERONE ? PlayerOne : PlayerTwo);
  commit();

  each([PlayerOne, PlayerTwo], () => {
    interact.seeResult(winner);
  });

  exit();
});
