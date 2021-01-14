# Set Game
Single-player implementation of popular card game "SET", written with ES6, react.js and css3. 
Multi-player version <a href='https://set-ready-go.herokuapp.com/'>Check it out!</a> (first load after a break can take a few seconds).

<p align="center" width="100%">
  <img width="503" height="710" src="https://user-images.githubusercontent.com/65915712/102587096-967aad80-410b-11eb-87c9-f56070ff8a1b.gif">
</p>

## Usage
Get familiar with the rules and start picking sets of 3 cards which in your opinion are satisfying given conditions. First times might be hard, but then you'll start to speed up. There are 81 different cards in the deck, and there is a small chance that 12 on the table do not contain any valid set. If you think that this is the case, use the red button to deal 3 new cards. Your time will be displayed after each successful guess, there is also the possibility to show aggregated stats. The hint button highlights up to 3 cards (full valid set) but clicking it 3 times results in no score gain.

### Hidden feature
Unjustified click on "No set" button also subtracts one point from your score, but colours and shadings of letters from title directly correspond to the presence of valid set on the table. Enjoy!

### Top Scores
Application is connected with online leaderboard hosted on Deta micro via REST API( <a href='https://github.com/wroku/fastapi-for-set'>Code here.</a> ). After a third successful guess new record is created, then score is updated on every change. Player has the possibility to enter the nickname right now, or after finishing the whole deck. Leaderboard can also display best records with respect to average time.

### Multiplayer Mode
Implemented with serverless, AWS API Gateway, AWS Lambda and DynamoDB (<a href='https://github.com/wroku/aws-serverless-ws'>Code</a>).

You can switch to the multiplayer mode by clicking an icon located on the right side of the title. It requires entering a nickname, then you can use lobby-chat, browse and join unstarted games or create a new one. The number of awaiting users is also displayed. Each game room has a separate chat, and players are allocated distinct colours, visible on the scores table. These colours help to differentiate between chat messages and enable to tell who correctly guessed a set without looking away from cards (fading animation). Similarly to the single-player version, the wrong guess means losing a point, but hidden feature described above is disabled so justified click on "No Set" button is worth 3 additional points. 