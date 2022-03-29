# reach-morra
Reach Ascent Project based on the game Morra


# Notes post-class-1

*Participants*
Player

*Interactions*
getHand
getGuess
seeResult
wager??? (not sure if we're doing this variant)

*Order of Operations*
# I'm pretty iffy on exactly how this will go down but here's a good guess
# I haven't included wager logic, I'm not sure if we're doing it
Players 1-(n-1) publishes their classified getHand commitment via makeCommitment, they also publish declassified getGuess
Player n publishes declassified getHand and declassified getGuess
Players 1-(n-1) publish their salts from makeCommitment and their declassified getHands
Players 1-(n-1) declassified getHands are verified using salts/commitments to make sure nobody cheated
Total is computed
Winner(s) is(are) found
All Players (each) seeResult