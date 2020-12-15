import './App.css';
import React from 'react';
import classNames from 'classnames';



class Rules extends React.Component {
  
  render() {
    const className = classNames({
      'info': true,
      'hidden': !this.props.rules
    });

    return(
      <div className='rules'>
        <div className={className}>
          <div className='important'>
        Try to find and select cards forming a set.
        A set consists of <b>3 cards satisfying all of these conditions:</b>
        <ul>
          <li>They all have the same number or have three different numbers.</li>
          <li>They all have the same shape or have three different shapes.</li>
          <li>They all have the same shading or have three different shadings.</li>
          <li>They all have the same color or have three different colors.</li>
        </ul>
        </div>
        For example, letters S, E and T have diffrent shapes and each of these occurs only once in the title above.
        Their colours and shadings also satisfies our conditions. At least on the first deal, later - it depends...
        What brings us to the last matter - if you think that there is no set on the table you can ask for 3 additional cards using red button.
        More info on <a href='https://en.wikipedia.org/wiki/Set_(card_game)'>Wikipedia</a>. 
        </div>
      </div>
    );
  }
}

class Stats extends React.Component {

  render(){
    const className = classNames({
      'details': true,
      'hidden': !this.props.stats
    });
    const classNameCurrent = classNames({
      'currentStatrs': true,
      'hidden': this.props.leaderboard
    });
    const classNameBest = classNames({
      'leaderboard': true,
      'hidden': !this.props.leaderboard
    });

    const failedAttempts = this.props.fails.reduce((x,y) => x + y);
    const score = this.props.successTimes.length * 3 - failedAttempts;
    const lastTime = this.props.successTimes.length >= 1? this.props.successTimes[this.props.successTimes.length - 1] : '-';
    const bestTime = this.props.successTimes.length >= 1? Math.min(...this.props.successTimes) : '-';
    const avgTime = this.props.successTimes.length >= 1? Math.round((this.props.successTimes.reduce((x, y) => x + y) / this.props.successTimes.length)*10) / 10 : '-';
    let content;

    const topScores = [
      <tr className='titlerow' key='titlerow'>
          <th>#</th><th>Player</th> <th>Score</th> <th>Time</th>
      </tr>
    ];

    if (this.props.topScores.length > 0){
      for(let i = 0; i < this.props.topScores.length; i ++){
        let record = this.props.topScores[i];
        topScores.push(
          <tr className='recordrow' key={record.key}>
            <th>{i + 1}</th><th>{record.player}</th> <th>{record.score}</th> <th>{record.time}s</th>
          </tr>
        )
      } 
    }

    
    return(

      <div className='stats'>
        <div className={className}>
          <div className={classNameCurrent}>
            <div className='row'>
              <div className='column first'>
                <p>Score: </p>
                <p>Remaining cards: </p>
                <p>Failed attempts: </p>
              </div>
              <div className='column values1'>
                <p>{score}</p>
                <p>{this.props.remainingCards.length}</p>
                <p>{failedAttempts}</p>
              </div>
              <div className='column second'>
                <p>Last time:</p>
                <p>Best time:</p>
                <p>Average time:</p>
              </div>
              <div className='column values2'>
                <p>{lastTime}</p>
                <p>{bestTime}</p>
                <p>{avgTime}</p>
              </div>
            </div>
          </div>
          <div className={classNameBest}>
            <table className="topScoreTable">
              {topScores}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class Title extends React.Component {

  /* Svg title, randomly generated in SetGame component to form valid or invalid set, depending on the situation on the table */
  
  render() {
    const {cArr, sArr} = this.props.ncData;
    const usePhrases = [];
    const colours = this.props.colours;
    const coords = [{x:'-3680', y: '3490'},
                    {x:'-2370', y: '2140'},
                    {x:'-2950', y: '3490'}]

    for(let i = 0; i < 3; i++){
      const xLink = '#letter' + i.toString();
      let fill;
      let stroke;

      if(sArr[i] === 0){
        fill = 'none';
        stroke = colours[cArr[i].toString()];
      }
      else if(sArr[i] === 1){
        fill = "url('#diagonal-stripes-t" + cArr[i].toString() + "')";
        stroke = 'none';
      }
      else {
        fill = colours[cArr[i].toString()];
        stroke = 'none';
      }
      usePhrases.push(
        <use key={i} x={coords[i].x} y={coords[i].y} xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />
      )
    }

    return(
      <div className='title-wrapper'>
        <svg className='title-box' viewBox='0 0 420 80'>
          <defs>
            <path id='letter0' d='M4737 2842 l-57 -58 0 -114 0 -114 57 -58 57 -58 112 0 c127 0 137 -5 132 -67 l-3 -38 -63 -3 c-75 -4 -92 7 -92 54 l0 34 -100 0 -100 0 0 -73 0 -73 63 -62 63 -62 158 0 159 0 64 63 63 64 0 104 0 105 -63 62 -63 62 -106 0 c-120 0 -138 8 -138 64 0 46 16 56 86 56 68 0 74 -5 74 -66 l0 -35 103 3 102 3 3 69 3 69 -63 64 -62 63 -166 0 -166 0 -57 -58z'></path>
            <path id='letter1' d='M4204 4237 c-3 -8 -4 -47 -2 -88 3 -68 5 -74 26 -77 22 -3 22 -4 22 -203 l0 -199 -25 0 c-25 0 -25 -1 -25 -85 l0 -85 275 0 275 0 0 100 0 100 -85 0 c-69 0 -85 -3 -85 -15 0 -12 -14 -15 -65 -15 l-66 0 3 57 c2 34 8 58 16 61 6 2 12 -3 12 -12 0 -13 14 -16 85 -16 l85 0 0 115 0 115 -80 0 c-62 0 -82 -3 -86 -15 -4 -8 -12 -15 -20 -15 -10 0 -14 15 -14 55 l0 55 65 0 c37 0 65 -4 65 -10 0 -6 35 -10 85 -10 l85 0 0 100 0 100 -270 0 c-217 0 -272 -3 -276 -13z'></path>
            <path id='letter2' d='M5550 2795 l0 -105 85 0 c78 0 85 2 85 20 0 13 7 20 20 20 19 0 20 -7 20 -199 0 -190 -1 -199 -20 -204 -18 -5 -20 -14 -20 -91 l0 -87 148 3 147 3 0 85 c0 81 -1 85 -22 88 -23 3 -23 4 -23 203 0 188 1 199 19 199 10 0 21 -9 24 -20 5 -19 12 -21 89 -18 l83 3 0 100 0 100 -317 3 -318 2 0 -105z'></path>
            
            <pattern id='diagonal-stripes-t0' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['0']} />
            </pattern>
            <pattern id='diagonal-stripes-t1' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['1']} />
            </pattern>
            <pattern id='diagonal-stripes-t2' x='0' y='0' width ='24' height='24' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='12' height='24' stroke='none' fill={colours['2']} />
            </pattern>
          </defs>
          <g transform="translate(0.000000, 640.000000) scale(0.100000, -0.100000)">
            {usePhrases}
          </g>
        </svg>
      </div>
    );
  }
}

function ShowTime(props) {
  /* Component responsible for showing animated guess time in seconds */
  
  const className = classNames({
    'time-wrapper': true,
    'show': props.show})
    
  return(
    <div className={className}>
      <div className='lastTime'>
        <span>
          <svg width="0.8em" height="0.8em" viewBox="0 0 16 16" className="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
            <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          &nbsp;{props.time}s
        </span>
      </div>
    </div>
  );
}

class CustomAlert extends React.Component {

  render() {
    const alertWrapperClass = classNames({
      'alert-wrapper': true,
      'hidden': !(this.props.success || this.props.failedAttempt || this.props.noSetFail)
    });
    const alertStatusClass = classNames({
        'alert-absolute': true,
        'failedAttempt': this.props.failedAttempt,
        'success': this.props.success,
        'noSetFail': this.props.noSetFail,
      });

    let infoMain, infoAdd;
    let button = <button className="alert-btn" onClick={this.props.close}>OK</button>  
    if (this.props.failedAttempt){
      infoMain = 'This is not a valid set.'
      infoAdd = this.props.setsOnTable !== 0 ? "Try again or use a hint if you are stuck." : "If you think that there is no set on the table, use red button to deal 3 more cards.";
    }
    else if(this.props.noSetFail){
      infoMain = this.props.setsOnTable === 1 ? 'There is exactly one valid set on the table.' : `There are ${this.props.setsOnTable} valid sets on table.`;
      infoAdd = `If you are not sure whether to use No Set button, take a good look on the current title. Letters forming proper 'set' indicate presence of valid set on he table.`
    }
    else if (this.props.success){
      infoMain = `Congratulations!`
      infoAdd = 'You can see your stats above. Good job!'
      button = <button className="alert-btn" onClick={this.props.reload}>PLAY AGAIN</button>
    
    }
    return(
      <div className={alertWrapperClass}>
				<div className={alertStatusClass}>
					<h2 className="alert-main">{infoMain}</h2>
          <h4 className='alert-additional'>{infoAdd}</h4>
          {button}
				</div>
				<div className="alert-overlay"></div>
			</div>
    );

  }
}

class Card extends React.Component {

  render() {

    const number = this.props.ncss[0];
    const colour = this.props.ncss[1];
    const shape = this.props.ncss[2];
    const shading = this.props.ncss[3];
    const isSelected = !(this.props.selectedCards.indexOf(this.props.ncss) === -1)
    const isHinted = !(this.props.hintedCards.indexOf(this.props.ncss) === -1)
    const isExcluded = !(this.props.excludedFromScore.indexOf(this.props.ncss) === -1)
    const classNameCard = classNames({
      'card': true,
      'selected' : isSelected,
      'hinted': isHinted
    });

    const classNameScore = classNames({
      'score-wrapper': true,
      'animate': this.props.showTime && isSelected && !isExcluded
    });

    const xLink = "#myShape" + shape;
    const colours = this.props.colours;
    let usePhrase;
    let fill;
    let stroke;

    if(shading === '0'){
      fill = 'none';
      stroke = colours[colour];
    }
    else if(shading === '1'){
      fill = "url('#diagonal-stripes" + colour + "')";
      stroke = 'none';
    }
    else {
      fill = colours[colour];
      stroke = 'none';
    }

    if(number === '0'){
      usePhrase = <g>
                    <use x="-10" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />;
                  </g>
    }
    else if(number==='1'){
      usePhrase = <g>
                    <use x="-70" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} /> 
                    <use x="+50" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />
                  </g>
          
    }
    else{
      usePhrase = <g>
                    <use x="-130" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} /> 
                    <use x="-10" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />
                    <use x="+110" y="0" xlinkHref={xLink} stroke={stroke} strokeWidth='8' fill={fill} />
                  </g>
    }

    return (
      <div className={classNameCard} onClick={this.props.selectCard.bind(this, this.props.ncss)}>
        <svg className='svg-shapes-box' viewBox="0 0 400 200">
          <defs>
            
            <path id='myShape0' x='0' y='0' d="M181.081 36.920 C 166.924 44.221,165.015 53.585,173.750 72.878 C 179.514 85.609,180.380 91.380,178.029 101.377 C 169.073 139.460,175.236 158.729,200.000 170.063 C 231.747 184.594,257.710 163.195,238.714 138.154 C 227.051 122.780,226.573 120.104,231.907 100.000 C 238.278 75.985,235.948 59.675,224.514 48.240 C 212.912 36.639,192.130 31.222,181.081 36.920" />
            <rect id="myShape1" x='170' y = '30' width='80' height='140' rx='44' />
            <polygon id="myShape2" points='210,30 160,100 210,170 260,100' />

            <pattern id='diagonal-stripes0' x='0' y='0' width ='10' height='10' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
              <rect c='0' y='0' width='5' height='10' stroke='none' fill={colours['0']} />
            </pattern>

            <pattern id='diagonal-stripes1' x='0' y='0' width ='10' height='10' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
              <rect c='0' y='0' width='5' height='10' stroke='none' fill={colours['1']} />
            </pattern>

            <pattern id='diagonal-stripes2' x='0' y='0' width ='10' height='10' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
              <rect c='0' y='0' width='5' height='10' stroke='none' fill={colours['2']} />
            </pattern>

          </defs>
        
          {usePhrase}
        
        </svg>

        <div className={classNameScore}>
          <div className='scorePoint'>+1</div>
        </div>  
      </div>
    );
  }
}

function Table(props) {
  
  let onTable = [];
  for(const card of props.cards){
    onTable.push(<Card key={card} ncss={card} selectCard={props.selectCard} selectedCards={props.selectedCards} colours={props.colours} hintedCards={props.hintedCards} showTime={props.showTime} excludedFromScore={props.excludedFromScore}/>)
  }
  
  return(
    
    <div className='table-wrapper'>
      {onTable}
    </div>
  );
}

class SetGame extends React.Component {

  /* Main stateful component  */

  constructor(props){
    super(props);
    this.noP = 3;
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
      gameId: 0
    };
    
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleStats = this.toggleStats.bind(this);
    this.turnOnLeaderboard = this.turnOnLeaderboard.bind(this);
    this.turnOffLeaderboard = this.turnOffLeaderboard.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.checkIfSetOnTable = this.checkIfSetOnTable.bind(this);
    this.reload = this.reload.bind(this);
    this.generateHint = this.generateHint.bind(this);
    
    /* Leaderboard feature */
    this.fetchLeaderboard = this.fetchLeaderboard.bind(this);
    this.addGameToLeaderboard = this.addGameToLeaderboard.bind(this);
    this.updateGameRecord = this.updateGameRecord.bind(this);
    this.postExperiment = this.postExperiment.bind(this);

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
      gameId: 0 
    });
  }

  postExperiment() {
    const axios = require('axios');

    axios.post('http://127.0.0.1:8000/records/',{
      id: 3,
      player: `Anon`,
      score: 5,
      time: 66
    })
    .then(function(response){
      console.log(`POSTRESP:${response}`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetchLeaderboard(callback) {
    const axios = require('axios');  
    axios.get('https://consp8.deta.dev/records/?top=5')
    .then((response) => {
      // handle success
      this.setState({
        topScores: response.data
      }, () => {
        if(typeof callback == 'function') {
          callback();
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
  }

  addGameToLeaderboard() {
    const axios = require('axios');
    
    const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
    const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;
    
    axios.post('https://consp8.deta.dev/records/',{
      player: "Anonym",
      score: currentScore,
      time: totalTime
    })
    .then((response) => {
      console.log(response);
      this.setState({
        gameId: response.data['key']
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateGameRecord() {
    const axios = require('axios');
    const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
    const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;
    const currentId = this.state.gameId;
    axios.put(`https://consp8.deta.dev/records/${currentId}`,{
      
      player: `Anonym`,
      score: currentScore,
      time: totalTime
    })
    .then(function(response){
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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

  findValidSetsOnTable(){
    /* go through all possible combinations of cards on the table looking for valid sets.*/
    
    const cards = this.state.cards.slice();
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
    return this.findValidSetsOnTable().length;
  }

  generateHint(){
    /* Suggest noSet button or random valid set (in random order), taking care of incrementing hints one card at the time, 
    adding fails for score subtracting and updating excludeFromScore accordingly for proper "+1" animations. Timeout functions 
    ensure that css animations hooked to particular card or button have enough time to be displayed. */
    
    if (this.countSets() === 0){
      this.setState({
        noSetHint: true
      });
      setTimeout(() => this.setState({noSetHint: false}), 3000);
    }
    else {
      if(this.state.hintLvl === 1){
        const cardsToHint = this.fisherYatesShuffle(this.fisherYatesShuffle(this.findValidSetsOnTable())[0]);
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
        setTimeout(() => this.setState({hintedCards: this.state.cardsToHint.slice(0, i+1)}), i*500);
      }
      const delay = (this.state.hintLvl - 1) * 500;
      setTimeout(() => this.setState({hintedCards: []}), 3000 + delay);
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
              this.lastSelected();
        }
    });
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
        if (this.state.gameId === 0){
          /* Add new record after fetching actual leaderboard */
          this.fetchLeaderboard(this.addGameToLeaderboard);
        }
        else {
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
          }
        }
        else {
          /* Deal three new cards and delete them from remaining deck*/
          let i = 0;
          for (const card of this.state.selectedCards){
            cards.splice(cards.indexOf(card), 1, remainingCards[i]);
            i++;
          }
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
        }), 3000);
      }

      /* Near finish part */
      else {
        for (const card of this.state.selectedCards) {
          cards.splice(cards.indexOf(card), 1);
        }
        setTimeout(() => this.setState({
          cards: cards
          },() => {
            this.generateTitle();
          }), 3000);

        if (this.countSets() === 0) {
          setTimeout(() => {
            this.setState({
              finished: true,
              stats: true
            });
          }, 3300);
        }
      }
      setTimeout(() => this.setState({selectedCards: []}), 3000)
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
      }
      if(valSet.size !== 1 && valSet.size !== this.noP){
        return false;
      } 
    }
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
  turnOffLeaderboard() {
    this.setState({
      leaderboard: false,
    });
  }

  checkIfSetOnTable() {
    const numberOfSets = this.countSets();
    if (numberOfSets > 0) {
      const fails = this.state.fails;
      fails.splice(-1, 1, fails[fails.length - 1] + 1);
      this.setState({
        fails: fails,
        noSetFail: true
      });
      
    }
    else {
      const cards = this.state.cards.slice();
      const remainingCards = this.state.remainingCards;
      cards.push(...remainingCards.slice(0, this.noP));
      this.setState({
        cards: cards,
        remainingCards: remainingCards.slice(this.noP)
      },() => { 
        this.generateTitle();
      });
      
    }
  }

  calculateElapsed (){
    const stop = new Date();
    const successTimes = this.state.successTimes.slice();
    const elapsed = (stop.getTime() - this.state.startTime.getTime())/1000;
    successTimes.push(Math.round(elapsed * 10)/10);
    this.setState ({
      successTimes: successTimes,
      startTime: new Date()
    });
  }

  /* functions responsible for generating and changing Title component */

  generateRandom(){
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
      noSetFail: false});
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
    setTimeout(() => this.setState({showTime: false}), 4000);
  }
  
  alert() {
    this.setState({
      finished: true,
      stats: true});
  }

  render() {
    
    return(
      <div>
       <Title colours={this.colours} ncData={this.state.titleData}/>
       <div className='button-wrapper'>
         <button className={!this.state.rules? 'toggle-rules button' : 'toggle-rules-selected button'} onClick={this.toggleRules}>{!this.state.rules? 'Show rules' : 'Hide rules'}</button>
         <button className={!this.state.noSetHint? 'noSet button short': 'noSet-hint button short'} onClick={this.checkIfSetOnTable}>No set!</button>
         <button className={!this.state.noSetHint? 'noSet button long': 'noSet-hint button long'} onClick={this.checkIfSetOnTable}>There is no SET!</button>
         
          <button className={!this.state.stats? 'toggle-stats button' : 'toggle-stats-selected button'} onClick={this.toggleStats}>{!this.state.stats? 'Show stats' : 'Hide stats'}</button>
          <div className={!this.state.stats? 'hidden': 'x'}>
            <div className='y'>
              <button className={!this.state.leaderboard ? "one chosen" : "one"} onClick={this.turnOffLeaderboard}>your</button>
              <button className={this.state.leaderboard ? "two chosen" : "two"} onClick={this.turnOnLeaderboard}>best</button>
            </div>
          </div>
         
         <button className='reload button' onClick={this.reload}>Reload</button>
         <button className='hint button' disabled={this.state.noSetHint || this.state.hintedCards.length > 0} onClick={this.generateHint}>Hint</button>
       </div>
       <Rules rules={this.state.rules}/>
       <Stats leaderboard={this.state.leaderboard} topScores={this.state.topScores} stats={this.state.stats} remainingCards={this.state.remainingCards} successTimes={this.state.successTimes} fails={this.state.fails}/>
       <div className='afterStats'>
          <CustomAlert success={this.state.finished} noSetFail={this.state.noSetFail} failedAttempt={this.state.failedAttempt} setsOnTable={this.countSets()} reload={this.reload} close={this.closeAlert}/>
       </div>
       <Table selectCard={this.selectCard} selectedCards={this.state.selectedCards} cards={this.state.cards} colours={this.colours} hintedCards={this.state.hintedCards} showTime={this.state.showTime} excludedFromScore={this.state.excludedFromScore}/>
       <ShowTime show={this.state.showTime} time={this.state.successTimes[this.state.successTimes.length - 1]}/>
        
        
        <div className='debugInfo'>
        
          <button className='delete-cards-btn' onClick={this.removeCards}>Remove remaining cards.</button>
          <br/>
          <button className='show-time-btn' onClick={this.fetchLeaderboard}>FETCH</button>
          <button onClick={this.postExperiment}>POST</button>
          <span>{this.state.cardsToHint}</span>
          <br/>
          <span>Exc:{this.state.excludedFromScore}</span>
          <br/>
          <span>Sel:{this.state.selectedCards}</span>
        </div>
      </div>
    );
  }
}

export default SetGame;
