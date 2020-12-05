# Set Game
Single-player implementation of popular card game "SET", written with ES6, react.js and css3. <a href='https://set-ready-go.herokuapp.com/'>Check it out!</a>(first load after a break can take a few seconds).

## Usage
Get familiar with the rules and start picking sets of 3 cards which in your opinion are satisfying given conditions. First times might be hard, but then you'll start to speed up. There are 81 different cards in the deck, and there is small chance that 12 on the table do not contain any valid set. If you think that this is the case, use red button to deal 3 new cards. Your time will be displayed after each succesfull guess, there is also possibility to show aggregated stats. Hint button highlights up to 3 cards (full valid set), but clicking it 3 times results in no score gain.

### Hidden feature
Unjustified click on "No set" button also subtracts one point from your score, but colors and shadings of letters from title directly corresponds to presence of valid set on the table. Enjoy!

![Alt text](SetPics/hint.png?raw=true)
![Alt text](SetPics/plain.png?raw=true)
![Alt text](SetPics/selected.png?raw=true)
![Alt text](SetPics/stats.png?raw=true)