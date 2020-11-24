import './App.css';
import React from 'react';
import classNames from 'classnames';



class Rules extends React.Component {
  
  render() {
    const className = classNames({
      'info': true,
      'hidden': !this.props.rules
    });
    const rulesActionText = !this.props.rules? 'Show rules' : 'Hide rules' ;

    return(
      <div className='rules'>
        <span className='rules-toggle' onClick={this.props.toggleRules}>{rulesActionText}</span>
        <p className={className}>
        Try to find and select cards forming a set.
        A set consists of three cards satisfying <b>all</b> of these conditions:
        <ul>
          <li>They all have the same number or have three different numbers.</li>
          <li>They all have the same shape or have three different shapes.</li>
          <li>They all have the same shading or have three different shadings.</li>
          <li>They all have the same color or have three different colors.</li>
        </ul>
        If you think that there is no set on the table you can ask for 3 additional cards. 
        </p>
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
    const className = classNames({
      'card': true,
      'selected' : isSelected
    });

    const xLink = "#myShape" + shape;
    const myGradient = "url('#myGradient" + colour + "')";
    const colours = {'0': 'red',
                     '1': 'green',
                     '2': 'darkviolet'};
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
        <span className='cardspan'>Card {this.props.ncss}</span>
        <svg className='svg-shapes-box' viewBox="0 0 400 200">
        <defs>
          
          <path id='myShape0' x='100' y='0' d="M181.081 36.920 C 166.924 44.221,165.015 53.585,173.750 72.878 C 179.514 85.609,180.380 91.380,178.029 101.377 C 169.073 139.460,175.236 158.729,200.000 170.063 C 231.747 184.594,257.710 163.195,238.714 138.154 C 227.051 122.780,226.573 120.104,231.907 100.000 C 238.278 75.985,235.948 59.675,224.514 48.240 C 212.912 36.639,192.130 31.222,181.081 36.920" />          <rect id="myShape1" x='160' y = '30' width='80' height='140' rx='44' />
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

    /*
    onTable.push(<Card key='1111' ncss='1111' selectCard={this.props.selectCard} selectedCards={this.props.selectedCards}/>)
    onTable.push(<Card key='1112' ncss='1112' selectCard={this.props.selectCard} selectedCards={this.props.selectedCards}/>)
    onTable.push(<Card key='1113' ncss='1113' selectCard={this.props.selectCard} selectedCards={this.props.selectedCards}/>)
    */
    
    for(const card of this.props.cards){
      onTable.push(<Card key={card} ncss={card} selectCard={this.props.selectCard} selectedCards={this.props.selectedCards}/>)
    }
    return(
      
      <div class='table-wrapper'>
        {onTable}
      </div>
    );
  }
}

class SetGame extends React.Component {

  /*state: success, reload, set is set, showTimer, hideTimer
    implement unlikely event of finishing deck.
   OOP, rozszerzalne zasady, hard-coded constraints: selectCard:3  */

  constructor(props){
    super(props);
    this.noP = 3;
    this.penalty = 10;
    const deck = this.fisherYatesShuffle(this.generateDeck());
    this.state = {
      rules: false,
      startTime: new Date(),
      successTimes: [],
      fails: [0],
      selectedCards: [],
      cards: deck.slice(0, this.noP * 4),
      remainingCards: deck.slice (this.noP * 4)  
    };
    
    this.toggleRules = this.toggleRules.bind(this);
    this.selectCard = this.selectCard.bind(this);
    this.checkIfSetOnTable = this.checkIfSetOnTable.bind(this);
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

  countSets() {
    const cards = this.state.cards;
    let setCounter = 0;
    for (let i1 = 0; i1 < cards.length; i1++){
      for (let i2 = i1 + 1; i2 < cards.length; i2++){
        for (let i3 = i2 + 1; i3 < cards.length; i3++){
          const possibleSet = [cards[i1], cards[i2], cards[i3]];
          if (this.isValid(possibleSet)){  
            setCounter ++;
          }
        }
      }
    }
    return setCounter;
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

      if (cards.length > 12) {
        for(const card of this.state.selectedCards){
          cards.splice(cards.indexOf(card), 1);
        }
        const fails = this.state.fails;
        fails.push(0);
        this.setState({
          cards: cards,
          fails: fails
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
          fails: fails
        });
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
    this.setState({rules: !this.state.rules});
  }

  checkIfSetOnTable() {
    if (this.countSets() > 0) {
      const fails = this.state.fails;
      fails.splice(-1, 1, fails[fails.length - 1] + 1);
      this.setState({
        fails: fails
      });
      const msg = this.countSets() === 1 ? 'There is exactly one set on the table.' : `There are ${this.countSets()} sets on the table.`; 
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

  render() {
    return(
      <div>
       <h1><span>Set Game</span></h1>
       <Rules rules={this.state.rules} toggleRules={this.toggleRules} />
       <div className='button-wrapper'>
         <button className='noSet-button' onClick={this.checkIfSetOnTable}>There is no SET!</button>
       </div>
       
       <Table selectCard={this.selectCard} selectedCards={this.state.selectedCards} cards={this.state.cards}/>
        <div className='debugInfo'>
          <span>{this.state.cards.length}</span>
          <br/>
          <span>{this.state.remainingCards.length}</span>
          <br/>
          <span>{this.countSets()}</span>
          <br/>
          <span>{this.state.fails}</span>
          <br/>
          <span>{this.state.successTimes}</span>
        </div>
      </div>
    );
  }
}



export default SetGame;
