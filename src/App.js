import React from 'react';
import Title from './components/Title';
import Rules from './components/Rules';
import Stats from './components/Stats';
import Table from './components/Table';
import {CustomAlert, ShowTime} from './components/DisplayHelpers'; 
import Footer from './components/Footer';
import {Leaderboard} from './api/leaderboard';
import classNames from 'classnames';


class Lobby extends React.Component {

  render() {
    const className = classNames({
      'lobby': true,
      'hidden': !this.props.lobby
    });

    const chatMessages = [];
    for (let i=0; i < this.props.messages.length; i++){
      chatMessages.push(
        <div key={i} className={this.props.messages[i].author === this.props.playerNickname? 'chat-message sended' : 'chat-message'}>
            <div className={this.props.messages[i].author === this.props.playerNickname? 'chat-text own' : 'chat-text'}>
              {this.props.messages[i].content}
          </div>
        </div>
      );
    }

    const lobbyGames = [];
    for(const game of this.props.games){
      lobbyGames.push(
        <div className='lobby-game' key={game.ID}>
          <span>{game.ID} {game.started ? "ongoing" : <span className='joinGame' onClick={() => this.props.joinGame(game.ID)}>Join</span>}</span>
        </div>
      );
    }

    const scores = [];
    scores.push(
      <tr key='tittleRow'>
        <th></th><th>Score</th><th>Avg time</th>
      </tr>
      );
    for (const player of this.props.players){
      scores.push(
        <tr key={player.ID}>
          <th>{player.name}</th>
          <th>{player.score}</th>
          <th>{player.times.length > 0 ? player.times.reduce((x, y) => x + y)/player.times.length : '-'}</th>
        </tr>
      );
    };
    return (
      <div className={className}>
        <div className='row'>
          <div className={!this.props.currentGame ? 'games' : 'games hidden'}>
            <div className='gamesBox-title-wrapper'>
              Games
            </div>
            {lobbyGames}            
            <button className='createGame' onClick={this.props.createGame}>Create game</button>

          </div>

          <div className={this.props.currentGame ? 'current-game': 'current-game hidden'}>
            <div className='gamesBox-title-wrapper'>
              GameName game
            </div>
            <div className='game-info'>
              Remaining cards: {this.props.nofRemainingCards}
            </div>
            
           
            <table className='game-scores'>
              <tbody>
                {scores}
              </tbody>
            </table>
  
          </div>

          <div className='chatbox'>
            <div className='chatbox-overlays'>
              <div className='chatbox-overlay-top'>
              </div>
              <div className='chatbox-overlay-bottom'>
              </div>
            </div>
            
            <div className='messages'>
              {chatMessages}
            </div>
            
            
            <div className='input-wrapper'>
              <input type="text"  id="messageText" autoComplete="off"/>
              <button className='send-button' onClick={this.props.sendMessage}>Send</button>
            </div>
            
          </div>
        </div>
      </div>
    )
  }

}
class SetGame extends React.Component {

  /* Main stateful component  */

  constructor(props){
    super(props);
    this.noP = 3;
    this.leaderboardGuessesTreshold = 3;
    this.animationTimeFactor = 1;
    this.colours = {'0': 'red',
                    '1': 'green',
                    '2': 'darkviolet'};
    const deck = this.fisherYatesShuffle(this.generateDeck());

    this.state = {
      rules: false,
      stats: false,
      leaderboard: false,
      finished: false,
      startTime: new Date(),
      successTimes: [],
      fails: [0],
      titleData: this.generateValid(),
      selectedCards: [],
      cards: deck.slice(0, this.noP * 4),
      remainingCards: deck.slice (this.noP * 4),
      noSetHint: false,
      hintedCards:[],
      cardsToHint:[],
      excludedFromScore:[],
      hintLvl: 1,
      showTime: false,
      failedAttempt: false,
      noSetFail: false,
      topScores: [],
      fastestGames:[],
      timeBasedLeaderboard: false,
      gameId: 0,
      playerPrompt: false,
      playerNickname: `Anonym${Math.floor(Math.random()*100)}`,
      connectionID: 0,
      multiplayer: true,
      started: false,
      lobby: true,
      webSocketChat:[],     
      games: [{"ID":"mockGame", "started": false}],
      currentGame: false,
      players: [],
      winnerTime: 0
    };
    
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleStats = this.toggleStats.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.checkIfSetOnTable = this.checkIfSetOnTable.bind(this);
    this.reload = this.reload.bind(this);
    this.generateHint = this.generateHint.bind(this);
    
    /* Leaderboard feature related */
    this.fetchLeaderboard = Leaderboard.fetchLeaderboard.bind(this);
    this.addGameToLeaderboard = Leaderboard.addGameToLeaderboard.bind(this);
    this.updateGameRecord = Leaderboard.updateGameRecord.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.turnOnLeaderboard = this.turnOnLeaderboard.bind(this);
    this.turnOffLeaderboard = this.turnOffLeaderboard.bind(this);
    this.toggleLeaderboards = this.toggleLeaderboards.bind(this);
    
    /*WS*/
    this.sendMessage = this.sendMessage.bind(this);
    this.connect = this.connect.bind(this);
    this.createGame = this.createGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.failedSelect = this.failedSelect.bind(this);
    this.selectSet = this.selectSet.bind(this);
    this.noSet = this.noSet.bind(this);

    this.lastSelectedMultiplayer = this.lastSelectedMultiplayer.bind(this);
    this.receivedValidSet = this.receivedValidSet.bind(this);



    /*MP*/
    this.toggleMultiplayer = this.toggleMultiplayer.bind(this);
    this.toggleLobby = this.toggleLobby.bind(this);

    /* Debug only*/
    this.closeAlert = this.closeAlert.bind(this);
    this.removeCards = this.removeCards.bind(this);
    this.showTime = this.showTime.bind(this);
    this.alert = this.alert.bind(this);
    
  }
  
  componentDidMount(){
    this.fetchLeaderboard();
    
  }

  reload(){
    const deck = this.fisherYatesShuffle(this.generateDeck());
    this.setState({
      rules: false,
      stats: false,
      leaderboard: false,
      finished: false,
      startTime: new Date(),
      successTimes: [],
      fails: [0],
      titleData: this.generateValid(),
      selectedCards: [],
      cards: deck.slice(0, this.noP * 4),
      remainingCards: deck.slice (this.noP * 4),
      noSetHint: false,
      hintedCards:[],
      cardsToHint:[],
      excludedFromScore:[],
      hintLvl: 1,
      showTime: false,
      failedAttempt: false,
      noSetFail: false,
      topScores: [],
      fastestGames:[],
      timeBasedLeaderboard: false,
      gameId: 0,
      playerPrompt: false,
    });

    this.fetchLeaderboard();
  }

  generateDeck() {
    /* ncss - number, color, shape, shading 
     noP - number of properties */
    
    const deck = [];
    const noP = this.noP;
    for (let n = 0; n < noP; n++){
      for (let c = 0; c < noP; c++){
        for (let s1 = 0; s1 < noP; s1++){
          for (let s2 = 0; s2 < noP; s2++){
            const ncss = [n, c, s1, s2].map(x => x.toString()).reduce((x, y) => x + y);
            deck.push(ncss);
          }
        }
      }
    }
    return deck;
  }

  fisherYatesShuffle(arr){
    /*modern version of Fisher-Yates shuffle algorithm*/
    
    let j, x, i;
    for(i = arr.length -1; i > 0; i--){
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
    }
    return arr;
  }

  findValidSets(cards){
    /* go through all possible combinations of cards on the table looking for valid sets.*/
    
    const validSets = [];
    for (let i1 = 0; i1 < cards.length; i1++){
      for (let i2 = i1 + 1; i2 < cards.length; i2++){
        for (let i3 = i2 + 1; i3 < cards.length; i3++){
          const possibleSet = [cards[i1], cards[i2], cards[i3]];
          if (this.isValid(possibleSet)){  
            validSets.push(possibleSet);
          }
        }
      }
    }
    return validSets;
  }

  countSets() {
    return this.findValidSets(this.state.cards).length;
  }

  generateHint(){
    /* Suggest noSet button or random valid set (in random order), taking care of incrementing hints one card at the time, 
    adding fails for score subtracting and updating excludeFromScore accordingly for proper "+1" animations. Timeout functions 
    ensure that css animations hooked to particular card or button have enough time to be displayed. */
    
    if (this.countSets() === 0){
      this.setState({
        noSetHint: true
      });
      setTimeout(() => this.setState({noSetHint: false}), 3000 * this.animationTimeFactor);
    }
    else {
      if(this.state.hintLvl === 1){
        const cardsToHint = this.fisherYatesShuffle(this.fisherYatesShuffle(this.findValidSets(this.state.cards))[0]);
        this.setState({
          cardsToHint,
          excludedFromScore: cardsToHint[0]
        });
      }
      else{
        this.setState({
          excludedFromScore: this.state.cardsToHint.slice(0,this.state.hintLvl)
        });
      }
      

      for (let i = 0; i < this.state.hintLvl; i++){
        setTimeout(() => this.setState({hintedCards: this.state.cardsToHint.slice(0, i+1)}), (i*500)*this.animationTimeFactor);
      }
      const delay = (this.state.hintLvl - 1) * 500;
      setTimeout(() => this.setState({hintedCards: []}), (3000 + delay) * this.animationTimeFactor);
      this.setState((state) => ({hintLvl: state.hintLvl === 3 ? 1: state.hintLvl + 1}));
    }
    const fails = this.state.fails.slice();
    fails.splice(-1, 1, fails[fails.length - 1] + 1);
    this.setState({
      fails
      });
  }

  selectCard(ncss) {
    const selectedCards = this.state.selectedCards.slice();
    if (selectedCards.indexOf(ncss) === -1){
      if (selectedCards.length < 3){
        selectedCards.push(ncss);
      }
    }
    else {
      selectedCards.splice(selectedCards.indexOf(ncss), 1);
    }
    this.setState({
      selectedCards
    }, () => {
        if (selectedCards.length === this.noP){
          if(!this.state.started){
            this.lastSelected();
          } else {
            this.lastSelectedMultiplayer();
          };
              
        }
    });
  }

  lastSelectedMultiplayer() {
    if (this.isValid(this.state.selectedCards)) {
      this.selectSet();
    } else {
      this.failedSelect();
      this.setState({
        selectedCards: []
      });
    }
  }

  receivedValidSet(selectedSet) {
    const author = selectedSet.author;
    const set = selectedSet.set;
    const cards = this.state.cards.slice();
    let remainingCards = this.state.remainingCards.slice();
    this.calculateElapsed(author);
    this.showTime();

    if (remainingCards.length > 0) {
      if (cards.length > 12) {
        for (const card of set){
          cards.splice(cards.indexOf(card), 1);
        };
      } 
      else {
        let i = 0;
        for (const card of set) {
          cards.splice(cards.indexOf(card), 1, remainingCards[i]);
          i++;
        };
        remainingCards = remainingCards.slice(this.noP);
      }
    } 
    else {
      for (const card of this.state.selectedCards) {
        cards.splice(cards.indexOf(card), 1);
      };
      //Implement endgame here
    };

    setTimeout(() => this.setState({
      cards: cards,
      remainingCards: remainingCards,
      selectedCards: []
    }, () => {
      this.generateTitle();
    }), 3000 * this.animationTimeFactor);
    

  }

  lastSelected() {
    if( this.isValid(this.state.selectedCards)) {
      this.calculateElapsed();
      this.showTime();
      const cards = this.state.cards.slice();
      let remainingCards = this.state.remainingCards.slice();

      const fails = this.state.fails.slice();
      fails.push(0);
      this.setState({
        fails: fails
      },() => {
        if (this.state.successTimes.length === this.leaderboardGuessesTreshold){
          this.addGameToLeaderboard();
        }
        else if (this.state.successTimes.length > this.leaderboardGuessesTreshold) {
          this.updateGameRecord();
        }
      });

      /* Usual game */
      if (remainingCards.length > 0) {
        
        if (cards.length > 12) {
          /* Just take selected set from table, returning to 12(or 15 if we were really unlucky before), 
          do not deal 3 more and leave remainingCards be*/
          for (const card of this.state.selectedCards){
            cards.splice(cards.indexOf(card), 1);
          };
        }
        else {
          /* Deal three new cards and delete them from remaining deck*/
          let i = 0;
          for (const card of this.state.selectedCards){
            cards.splice(cards.indexOf(card), 1, remainingCards[i]);
            i++;
          };
          remainingCards = remainingCards.slice(this.noP);
        }

        setTimeout(() => this.setState({
          cards: cards,
          remainingCards: remainingCards,
          noSetHint: false,
          hintedCards: [],
          cardsToHint: [],
          hintLvl: 1
        }, () => {
          this.generateTitle();
        }), 3000 * this.animationTimeFactor);
      }

      /* Near finish part */
      else {
        for (const card of this.state.selectedCards) {
          cards.splice(cards.indexOf(card), 1);
        };
        setTimeout(() => this.setState({
          cards: cards
          },() => {
            this.generateTitle();
            if (this.countSets() === 0) {
              /* CustomAlert component is designed to display first playerPrompt, then endgame congrats */
              this.setState({
                playerPrompt: this.state.playerNickname === '' ? true: false,
                finished: true,
                stats: true,
                leaderboard: false
              });
            }  
          }), 3000 * this.animationTimeFactor);
        
      }
      setTimeout(() => this.setState({selectedCards: []}), 3000 * this.animationTimeFactor)
    }

    else {
      const fails = this.state.fails.slice();
      fails.splice(-1, 1, fails[fails.length - 1] + 1);
      this.setState({
        failedAttempt: true,
        fails: fails,
        selectedCards: []
      });
    }
  }

  isValid(set) {
    for(let i = 0; i <= this.noP; i++) {
      const valSet = new Set();
      for (const card of set){
        valSet.add(card[i]);
      };
      if(valSet.size !== 1 && valSet.size !== this.noP){
        return false;
      } 
    };
    return true;
  }

  toggleRules() {
    this.setState({
      rules: !this.state.rules,
      stats: false
    });
  }

  toggleStats() {
    this.setState({
      stats: !this.state.stats,
      rules: false
    });
  }

  turnOnLeaderboard() {
    this.setState({
      leaderboard: true,
    });
  }

  toggleLeaderboards() {
    this.setState({
      timeBasedLeaderboard: !this.state.timeBasedLeaderboard,
    });
  }

  turnOffLeaderboard() {
    this.setState({
      leaderboard: false,
    });
  }

  toggleMultiplayer() {
    this.setState({
      multiplayer: !this.state.multiplayer,
    });
  }

  toggleLobby() {
    this.setState({
      lobby: !this.state.lobby,
    });
  }

  checkIfSetOnTable() {
    const numberOfSets = this.countSets();
    if (numberOfSets > 0) {
      if(!this.state.started){
        const fails = this.state.fails;
        fails.splice(-1, 1, fails[fails.length - 1] + 1);
        this.setState({
          fails: fails,
          noSetFail: true
        });
      } 
      else {
        this.failedSelect();
      }
    }
    else {
      if (!this.state.started) {
        const cards = this.state.cards.slice();
        const remainingCards = this.state.remainingCards.slice();
        cards.push(...remainingCards.slice(0, this.noP));
        this.setState({
          cards: cards,
          remainingCards: remainingCards.slice(this.noP)
        },() => { 
          this.generateTitle();
        });
      } 
      else {
        this.noSet();
      };
    }
  }

  calculateElapsed (winner = null) {
    const stop = new Date();
    const elapsed = (stop.getTime() - this.state.startTime.getTime())/1000;
    if(!this.state.started) {
      //Single-player
      const successTimes = this.state.successTimes.slice();
      if (successTimes.length > 0) {
        /*compensate for animations delaying new deal */
        successTimes.push(Math.round((elapsed - 3 * this.animationTimeFactor)* 10)/10);
      } 
      else {
        successTimes.push(Math.round(elapsed * 10)/10)
      }
      this.setState ({
        successTimes: successTimes,
        startTime: new Date()
      });
    }
    else {
      //Multi-player
      const players = this.state.players.slice();
      for (const player of players) {
        if(player.ID === winner) {
          const times= player.times;
          if(player.times.length === 0){
            times.push(Math.round(elapsed * 10)/10);
          } else {
            times.push(Math.round((elapsed - 3 * this.animationTimeFactor)* 10)/10);
          };
          
          const currentScore = player.score;
          player.score = currentScore + 3;
          player.times = times;
          this.setState({
            players,
            winnerTime: {winner: winner === this.state.connectionID ? true: false, time: times[times.length-1]}
          });
        };
      };
    };
    
  }

  /* functions responsible for generating and changing Title component */

  generateRandom() {
    const cArr = [];
    const sArr = [];
    for (let i = 0; i < 3; i++){
      cArr.push(Math.floor(Math.random() * 3));
      sArr.push(Math.floor(Math.random() * 3));
    }
    return {cArr: cArr, sArr: sArr};
  }

  isTitleValidSet(ncData){
    const {cArr, sArr} = ncData;
    let valSet = new Set();
    for(const c of cArr){
      valSet.add(c);
    }
    if (valSet.size !== 1 && valSet.size !== 3){
      return false;
    }
    valSet.clear()
    for(const s of sArr){
      valSet.add(s);
    }
    if (valSet.size !== 1 && valSet.size !== 3){
      return false;
    }
    return true;
  }

  generateValid() {
    let ncData = this.generateRandom();
    while (!this.isTitleValidSet(ncData)){
      ncData = this.generateRandom();
    }
    return ncData;
  }

  generateInvalid() {
    let ncData = this.generateRandom();
    while (this.isTitleValidSet(ncData)){
      ncData = this.generateRandom();
    }
    return ncData;
  }

  generateTitle() {
    if (this.countSets(this.state.cards) === 0){
      this.setState({
        titleData: this.generateInvalid()
      });
    }
    else {
      this.setState({
        titleData: this.generateValid()
      });
    }
  }
  
  closeAlert() {
    this.setState({
      failedAttempt: false,
      noSetFail: false, 
      playerPrompt: false
    });
  }

  handlePlayerChange(event) {
    this.setState({
      playerNickname: event.target.value
    });  
  }

  /*debug functions*/

  removeCards() {
    this.setState({
      remainingCards: []
    });
  }

  showTime() {
    this.setState({
      showTime: true
    });
    setTimeout(() => this.setState({showTime: false}), 4000 * this.animationTimeFactor);
  }
  
  alert() {
    this.setState({
      playerPrompt:true,
      stats: true,
      leaderboard: false});
  }

  /* Web socket experiments */

  sendMessage() {
    const input = document.getElementById("messageText");
    
    try {
      this.ws.send(JSON.stringify({action: "message", message: `${input.value}`})); //send data to the server
      input.value = '';
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }

  joinGame(gameId) {
    
    try {
      this.ws.send(JSON.stringify({action : "joinGame", gameId: gameId})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }
  
  createGame() {
    
    try {
      this.ws.send(JSON.stringify({action: "createGame"})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }

  startGame() {
    try {
      const deck = this.fisherYatesShuffle(this.generateDeck());
      this.ws.send(JSON.stringify({action : "startGame", deck: deck})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }

  failedSelect() {
    //And failed noSet try
    try {
      this.ws.send(JSON.stringify({action: "failedSelect"})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }

  selectSet() {
    try {
      this.ws.send(JSON.stringify({action: "selectSet", selected: this.state.selectedCards})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }
  
  noSet() {
    try {
      this.ws.send(JSON.stringify({action: "noSet"})); //send data to the server
    } 
    catch (error) {
      console.log(error) // catch error
    }
  }

  connect() {
    this.ws = new WebSocket(`wss://qhurwv53tk.execute-api.eu-central-1.amazonaws.com/dev?player=${this.state.playerNickname}`)
    
    this.ws.onmessage = (event) => {
      /*Write dispatcher for chatmessage, lobby info, game info, start game, selected...*/
      const data = JSON.parse(event.data);
      console.log(data);
      let messages = this.state.webSocketChat.slice();
      let players = this.state.players.slice();

      for (const key in data) {
        switch(key) {

          case "lobbyInfo":
            this.setState({
              games: data.lobbyInfo
            });
            break;

          case "ownID":
            this.setState({
              connectionID: data.ownID
            });
            break;

          case "lobbyUpdate":
            const games = this.state.games.slice();
            games.push(data.lobbyUpdate);
            this.setState({
              games: games
            });
            break;

          case "createdGame":
            this.setState({
              currentGame: data.createdGame.gameID,
              players:[data.createdGame.players]
            });
            break;
          
          case "joinedGame":
            this.setState({
              currentGame: data.joinedGame.gameId,
              players: data.joinedGame.players
            });
            break;

          case "startedGame":
            this.setState({
              cards: data.startedGame.deck.slice(0, this.noP * 4),
              remainingCards: data.startedGame.deck.slice (this.noP * 4),
              startTime: new Date(),
              started: true
            });
            break;
            
          case "newPlayer":
            
            if (data.newPlayer.ID !== this.state.connectionID){
              players.push(data.newPlayer);
              this.setState({
                players
              });
            }
            break;

          case "playerDisconnected":
            for(const player of players) {
              if(player.ID === data.playerDisconnected) {
                messages.push({author:"Gameroom", content:`Player ${player.name} lost connection.`})
                players.splice(players.indexOf(player), 1);
                this.setState({
                  players,
                  webSocketChat: messages
                });
                break;
              };
            };
            break;

          case "message":
            messages.push(
              data.message
            );

            this.setState({
              webSocketChat: messages
            });
            break;

          case "failedSelect":
            for(const player of players){
              if(player.ID === data.failedSelect){
                const currentScore = player.score;
                player.score = currentScore - 1;
              }
            }
            this.setState({
              players
            });
            break;
          
          case "selectedSet":
            this.receivedValidSet(data.selectedSet);
            break;
          
          case "noSet":
            //Deal 3 new cards and allocate 3 points for the daredevil

            for(const player of players){
              if(player.ID === data.noSet) {
                const currentScore = player.score;
                player.score = currentScore + 3;
              };
            };
            const cards = this.state.cards.slice();
            const remainingCards = this.state.remainingCards.slice();
            cards.push(...remainingCards.slice(0, this.noP));
            this.setState({
              cards: cards,
              remainingCards: remainingCards.slice(this.noP),
              players
            },() => { 
              this.generateTitle();
            });
            break;

          default:
            console.log('ERR:Unrecognized message.')
            messages.push(<span>#ERR:Unrecognized message.#</span>);
            this.setState({
              webSocketChat: messages
            });
        }
      }
      
    }

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify({action:"lobbyInfo"}));
      console.log('connected')
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
    }
  }

  render() {
    
    return(
      <div>
        <Title colours={this.colours} ncData={this.state.titleData}/>

        <div className={!this.state.multiplayer ? 'button-wrapper' : 'hidden'}>
          <button className={!this.state.rules? 'toggle-rules button' : 'toggle-rules-selected button'} onClick={this.toggleRules}>{!this.state.rules? 'Show rules' : 'Hide rules'}</button>
          <button className={!this.state.noSetHint? 'noSet button short': 'noSet-hint button short'} onClick={this.checkIfSetOnTable}>No set!</button>
          <button className={!this.state.noSetHint? 'noSet button long': 'noSet-hint button long'} onClick={this.checkIfSetOnTable}>There is no SET!</button>
          
          <button className={!this.state.stats? 'toggle-stats button' : 'toggle-stats-selected button'} onClick={this.toggleStats}>{!this.state.stats? 'Show stats' : 'Hide stats'}</button>
          <div className={!this.state.stats? 'hidden': 'tab-buttons-wrapper'}>
            <div className='tab-buttons'>
              <button className={!this.state.leaderboard ? "current-btn chosen" : "current-btn"} onClick={this.turnOffLeaderboard}>your</button>
              <button className={this.state.leaderboard ? "leaderboard-btn chosen" : "leaderboard-btn"} onClick={this.turnOnLeaderboard}>best</button>
            </div>
          </div>
            
          <button className='reload button' onClick={this.reload}>Reload</button>
          <button className='hint button' disabled={this.state.noSetHint || this.state.hintedCards.length > 0} onClick={this.generateHint}>Hint</button>
        </div>

        <div className={this.state.multiplayer ? 'button-wrapper' : 'hidden'}>
          
          <button className={!this.state.rules? 'toggle-rules button' : 'toggle-rules-selected button'} onClick={this.toggleRules}>{!this.state.rules? 'Show rules' : 'Hide rules'}</button>
          <button className={!this.state.noSetHint? 'noSet button short': 'noSet-hint button short'} onClick={this.checkIfSetOnTable}>No set!</button>
          <button className={!this.state.noSetHint? 'noSet button long': 'noSet-hint button long'} onClick={this.checkIfSetOnTable}>There is no SET!</button>
          <button className='reload button' onClick={this.toggleLobby}>{this.state.currentGame ? 'Game' : 'Lobby'}</button>
          <button className='startGame button' onClick={this.startGame}>Start game!</button>

        
        
        </div>
        <Lobby lobby={this.state.lobby} sendMessage={this.sendMessage} createGame={this.createGame} joinGame={this.joinGame} messages={this.state.webSocketChat} games={this.state.games} currentGame={this.state.currentGame} playerNickname={this.state.playerNickname} players={this.state.players} nofRemainingCards={this.state.remainingCards.length}/>
        <Rules rules={this.state.rules}/>
        <Stats leaderboard={this.state.leaderboard} topScores={this.state.topScores} fastestGames={this.state.fastestGames} timeBasedLeaderboard={this.state.timeBasedLeaderboard} toggleLeaderboards={this.toggleLeaderboards} stats={this.state.stats} remainingCards={this.state.remainingCards} successTimes={this.state.successTimes} fails={this.state.fails}/>
        <div className='afterStats'>
          <CustomAlert playerPrompt={this.state.playerPrompt} playerNickname={this.state.playerNickname} handlePlayerChange={this.handlePlayerChange} handlePlayerSubmit={this.handlePlayerSubmit} success={this.state.finished} noSetFail={this.state.noSetFail} failedAttempt={this.state.failedAttempt} setsOnTable={this.countSets()} reload={this.reload} close={this.closeAlert} updateGameRecord={this.updateGameRecord}/>
        </div>
        <div className={this.state.successTimes.length < 5 && this.state.successTimes.length > 2 && this.state.playerNickname === ''? 'encouraging-info' : 'hidden'}>
          Your game is now qualified for the leaderboard. <b>Keep going!</b> You can <span className='enter-button' onClick={() => this.setState({playerPrompt: true})}>enter</span> your name now or after finishing whole deck.
        </div>
        <Table selectCard={this.selectCard} selectedCards={this.state.selectedCards} cards={this.state.cards} colours={this.colours} hintedCards={this.state.hintedCards} showTime={this.state.showTime} excludedFromScore={this.state.excludedFromScore}/>
        <ShowTime show={this.state.showTime} time={!this.state.started ? this.state.successTimes[this.state.successTimes.length - 1] : this.state.winnerTime.time} winner={!this.state.started ? true : this.state.winnerTime.winner}/>
        <Footer/>
        
        <div className='debugInfo'>
          <button className='delete-cards-btn' onClick={this.toggleMultiplayer}>Multiplayer</button>
          <br/>
          
          
         
          <button onClick={this.connect}>Connect</button>
          <button onClick={() => this.ws.close()}>Disconnect</button>
         
        </div>
      </div>
    );
  }
}

export default SetGame;
