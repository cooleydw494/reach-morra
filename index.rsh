'reach 0.1';

const Player = {
  getHand: Fun([], UInt),
  getGuess: Fun([], UInt),
  seeResult: Fun([UInt], Null),
};

export const main = Reach.App(() => {
  const PlayerOne = Participant('PlayerOne', {
    ...Player,
  });
  const PlayerTwo = Participant('PlayerTwo', {
    ...Player,
  });
  const PlayerThree = Participant('PlayerThree', {
    ...Player,
  });
  init();

  // When it is time to compute winner(s) we'll use a bitmask to show potentially multiple winners
  // This isn't in scope to implement now but is important for my seeResult implementation on the front-end

  exit();
});
