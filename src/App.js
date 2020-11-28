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
        Try to find and select cards forming a set.
        A set consists of three cards satisfying <b>all</b> of these conditions:
        <ul>
          <li>They all have the same number or have three different numbers.</li>
          <li>They all have the same shape or have three different shapes.</li>
          <li>They all have the same shading or have three different shadings.</li>
          <li>They all have the same color or have three different colors.</li>
        </ul>
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
    const failedAttempts = this.props.fails.reduce((x,y) => x + y);
    const score = this.props.successTimes.length * 3 - failedAttempts;
    const lastTime = this.props.successTimes.length >= 1? this.props.successTimes[this.props.successTimes.length - 1] : '-';
    const bestTime = this.props.successTimes.length >= 1? Math.min(...this.props.successTimes) : '-';
    const avgTime = this.props.successTimes.length >= 1? Math.round((this.props.successTimes.reduce((x, y) => x + y) / this.props.successTimes.length)*10) / 10 : '-';
    return(
      <div className='stats'>
        <div className={className}>
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
      </div>
    );
  }
}

class Title extends React.Component {
  

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
class Card extends React.Component {

  render() {

    const number = this.props.ncss[0];
    const colour = this.props.ncss[1];
    const shape = this.props.ncss[2];
    const shading = this.props.ncss[3];
    const isSelected = !(this.props.selectedCards.indexOf(this.props.ncss) === -1)
    const isHinted = !(this.props.hintedCards.indexOf(this.props.ncss) === -1)
    const className = classNames({
      'card': true,
      'selected' : isSelected,
      'hinted': isHinted
    });

    const xLink = "#myShape" + shape;
    const myGradient = "url('#myGradient" + colour + "')";
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

    if(number==='0'){
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
      <div className={className} onClick={this.props.selectCard.bind(this, this.props.ncss)}>
        <svg className='svg-shapes-box' viewBox="0 0 400 200">
        <defs>
          
          <path id='myShape0' x='100' y='0' d="M181.081 36.920 C 166.924 44.221,165.015 53.585,173.750 72.878 C 179.514 85.609,180.380 91.380,178.029 101.377 C 169.073 139.460,175.236 158.729,200.000 170.063 C 231.747 184.594,257.710 163.195,238.714 138.154 C 227.051 122.780,226.573 120.104,231.907 100.000 C 238.278 75.985,235.948 59.675,224.514 48.240 C 212.912 36.639,192.130 31.222,181.081 36.920" />
          <rect id="myShape1" x='160' y = '30' width='80' height='140' rx='44' />
          <polygon id="myShape2" points='210,30 160,100 210,170 260,100' />

          <pattern id='diagonal-stripes0' x='0' y='0' width ='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='4' height='8' stroke='none' fill={colours['0']} />
          </pattern>

          <pattern id='diagonal-stripes1' x='0' y='0' width ='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='4' height='8' stroke='none' fill={colours['1']} />
          </pattern>

          <pattern id='diagonal-stripes2' x='0' y='0' width ='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(30)'>
            <rect c='0' y='0' width='4' height='8' stroke='none' fill={colours['2']} />
          </pattern>

          <linearGradient id="myGradient0" gradientTransform="rotate(90)">
            <stop offset="20%" stopColor="gold" />
            <stop offset="90%" stopColor="red" />
          </linearGradient>

          <linearGradient id="myGradient1" gradientTransform="rotate(130)">
            <stop offset="20%" stopColor="aquamarine" />
            <stop offset="90%" stopColor="blueviolet" />
          </linearGradient>

          <linearGradient id="myGradient2" gradientTransform="rotate(90)">
            <stop offset="20%" stopColor="darkgoldenrod" />
            <stop offset="90%" stopColor="darkgreen" />
          </linearGradient>

        </defs>
  
        
        {usePhrase}

        </svg>
      </div>
    
    );
  }
}

class Table extends React.Component {
  

  render() {
    let onTable = [];

    for(const card of this.props.cards){
      onTable.push(<Card key={card} ncss={card} selectCard={this.props.selectCard} selectedCards={this.props.selectedCards} colours={this.props.colours} hintedCards={this.props.hintedCards}/>)
    }
    return(
      
      <div className='table-wrapper'>
        {onTable}
      </div>
    );
  }
}

class SetGame extends React.Component {

  /*state: success, footer, responsivnes, score&time animations  showTimer, hideTimer
  */

  constructor(props){
    super(props);
    this.noP = 3;
    this.penalty = 10;
    const deck = this.fisherYatesShuffle(this.generateDeck());
    this.state = {
      rules: false,
      stats: false,
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
      hintLvl: 1  
    };
    this.colours = {'0': 'red',
                    '1': 'green',
                    '2': 'darkviolet'};
    this.toggleRules = this.toggleRules.bind(this);
    this.toggleStats = this.toggleStats.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.checkIfSetOnTable = this.checkIfSetOnTable.bind(this);
    this.removeCards = this.removeCards.bind(this);
    this.reload = this.reload.bind(this);
    this.generateHint = this.generateHint.bind(this);
  }

  reload(){
    const deck = this.fisherYatesShuffle(this.generateDeck());
    this.setState({
      rules: false,
      stats: false,
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
      hintLvl:1,
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
    const cards = this.state.cards;
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
          cardsToHint: cardsToHint
        });
      }
      
      
      for (let i = 0; i < this.state.hintLvl; i++){
        setTimeout(() => this.setState({hintedCards: this.state.cardsToHint.slice(0, i+1)}), i*500);
      }
      const delay = (this.state.hintLvl - 1) * 500;
      setTimeout(() => this.setState({hintedCards: []}), 3000 + delay);
      this.setState((state) => ({hintLvl: state.hintLvl === 3 ? 1: state.hintLvl + 1}));
    }
    const fails = this.state.fails;
    fails.splice(-1, 1, fails[fails.length - 1] + 1);
    this.setState({
      fails: fails
      });
  }

  selectCard(ncss) {
    let selectedCards = this.state.selectedCards;
    if (selectedCards.indexOf(ncss) === -1){
      if (selectedCards.length < 3){
        selectedCards.push(ncss);
      }
    }
    else {
      selectedCards.splice(selectedCards.indexOf(ncss), 1);
    }
    this.setState({
      selectCards: selectedCards
    });

    if (selectedCards.length === this.noP){
      this.lastSelected()
    }
  }

  lastSelected() {
    if(this.isValid(this.state.selectedCards)){
      this.calculateElapsed()
      alert(`hurray! Your time: ${this.state.successTimes[this.state.successTimes.length -1 ]}`);
      const cards = this.state.cards;
      const remainingCards = this.state.remainingCards;

      /* Usual game */
      if (remainingCards.length > 0){
        if (cards.length > 12) {
          for(const card of this.state.selectedCards){
            cards.splice(cards.indexOf(card), 1);
          }
          const fails = this.state.fails;
          fails.push(0);
          this.setState({
            cards: cards,
            fails: fails,
            noSetHint: false,
            hintedCards:[],
            cardsToHint:[],
            hintLvl:1,
          });
        }
        else {
          let i = 0;
          for(const card of this.state.selectedCards){
            cards.splice(cards.indexOf(card), 1, remainingCards[i]);
            i++;
          }
          const fails = this.state.fails;
          fails.push(0);
          this.setState({
            cards: cards,
            remainingCards: remainingCards.slice(this.noP),
            fails: fails,
            noSetHint: false,
            hintedCards:[],
            cardsToHint:[],
            hintLvl:1,
          });
        }
        this.generateTitle();
      }

      /* Near finish part */
      else {
        for(const card of this.state.selectedCards){
          cards.splice(cards.indexOf(card), 1);
        }
        this.setState({
          cards: cards
        });
        if (this.countSets() > 0){
          const fails = this.state.fails;
          fails.push(0);
          this.setState({
            fails: fails
          });
        }
        else {
          this.setState({
            finished: true
          });
        }
      }
    }
    else{
      alert('Not a valid set, knucklehead...');
      const fails = this.state.fails;
      fails.splice(-1, 1, fails[fails.length - 1] + 1);
      this.setState({
        fails: fails
      });
    }
    this.setState({selectedCards: []});
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
      rules:false
    });
  }

  checkIfSetOnTable() {
    const numberOfSets = this.countSets();
    if (numberOfSets > 0) {
      const fails = this.state.fails;
      fails.splice(-1, 1, fails[fails.length - 1] + 1);
      this.setState({
        fails: fails
      });
      const msg = numberOfSets === 1 ? 'There is exactly one set on the table.' : `There are ${numberOfSets} sets on the table.`; 
      alert(msg)
    }
    else {
      const cards = this.state.cards;
      const remainingCards = this.state.remainingCards;
      cards.push(...remainingCards.slice(0, this.noP));
      this.setState({
        cards: cards,
        remainingCards: remainingCards.slice(this.noP)
      });
      this.generateTitle();
    }
  }

  calculateElapsed (){
    const stop = new Date();
    const successTimes = this.state.successTimes;
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

  generateValid(){
    let ncData = this.generateRandom();
    while (!this.isTitleValidSet(ncData)){
      ncData = this.generateRandom();
    }
    return ncData;
  }

  generateInvalid(){
    let ncData = this.generateRandom();
    while (this.isTitleValidSet(ncData)){
      ncData = this.generateRandom();
    }
    return ncData;
  }

  generateTitle(){
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

  /*debug functions*/

  removeCards(){
    this.setState({
      remainingCards: []
    });
  }

  render() {
    return(
      <div>
       <Title colours={this.colours} ncData={this.state.titleData}/>
       <div className='button-wrapper'>
         <button className={!this.state.rules? 'toggle-rules button' : 'toggle-rules-selected button'} onClick={this.toggleRules}>{!this.state.rules? 'Show rules' : 'Hide rules'}</button>
         <button className={!this.state.noSetHint? 'noSet button': 'noSet-hint button'} onClick={this.checkIfSetOnTable}>There is no SET!</button>
         <button className={!this.state.stats? 'toggle-stats button' : 'toggle-stats-selected button'} onClick={this.toggleStats}>{!this.state.stats? 'Show stats' : 'Hide stats'}</button>
         <button className='reload button' onClick={this.reload}>Reload</button>
         <button className='hint button' disabled={this.state.noSetHint || this.state.hintedCards.length > 0} onClick={this.generateHint}>Hint</button>
       </div>
       <Rules rules={this.state.rules}/>
       <Stats stats={this.state.stats} remainingCards={this.state.remainingCards} successTimes={this.state.successTimes} fails={this.state.fails}/>
       <Table selectCard={this.selectCard} selectedCards={this.state.selectedCards} cards={this.state.cards} colours={this.colours} hintedCards={this.state.hintedCards}/>
       
        
        <div className='debugInfo'>
          <button className='delete-cards-btn' onClick={this.removeCards}>Remove remaining cards.</button>
          
          <span>{this.state.cardsToHint}</span>
          <br/>
          <span>{this.state.hintedCards}</span>
          <br/>
          <span>{this.state.hintLvl}</span>
        </div>
      </div>
    );
  }
}



export default SetGame;
