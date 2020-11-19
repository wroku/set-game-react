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
          Below are displayed 12 cards in 3 rows. Each contains 1-3 symbols with distinct properities such as shape, color and shading. There are 3 diffrent possibilities for each property. To win a round you have to select three cards containing symbols forming a SET. Meaning, they all have the same or have three different, numbers, shapes, colors and shadings. Conditions can be mixed, eg. three cards with exactly one symbol in red colour, but with diffrent shadings and shapes. 
        </p>
      </div>
    );
  }

}

class Card extends React.Component {

  render() {
    const isSelected = !(this.props.selectedCards.indexOf(this.props.ncss) === -1)
    const className = classNames({
      'card': true,
      'selected' : isSelected
    });

    return (
    <span className={className} onClick={this.props.selectCard.bind(this, this.props.ncss)}>Card {this.props.ncss} </span>
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
      <div>
        {onTable}
      </div>
    );
  }
}

class SetGame extends React.Component {

  /* state: success, reload, set is set, button there is no set, 
   functions: validate, generate deck, shuffle, pick, chcek if set
   OOP, rozszerzalne zasady, hard-coded constraints: selectCard:3  */

  constructor(props){
    super(props);
    this.noP = 3;
    const deck = this.fisherYatesShuffle(this.generateDeck());
    this.state = {
      rules: false,
      success: false,
      selectedCards: [],
      cards: deck.slice(0, this.noP * 4),
      remainingCards: deck.slice (this.noP * 4)  
    };
    
    this.toggleRules = this.toggleRules.bind(this);
    this.selectCard = this.selectCard.bind(this);
    
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
        j = Math.floor(Math.random() * (i+1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
      }
      return arr;
  }

  checkForSets() {
    const cards = this.state.cards;
    const combinations = [];
    for (let i1 = 0; i1 < cards.length; i1++){
      for (let i2 = i1 + 1; i2 < cards.length; i2++){
        for (let i3 = i2 + 1; i3 < cards.length; i3++){
            combinations.push([cards[i1], cards[i2], cards[i3]]);
        }
      }
    }
    console.log(combinations);
  }

  selectCard(ncss) {

    let selectedCards = this.state.selectedCards;
    if (selectedCards.indexOf(ncss) === -1){
      if (selectedCards.length < 3){
        selectedCards.push(ncss);
      }
    }
    else {
      selectedCards.pop(ncss);
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
      alert('hurray!');

      const cards = this.state.cards;
      const remainingCards = this.state.remainingCards;
      let i = 0;
      for(const card of this.state.selectedCards){
        cards.splice(cards.indexOf(card), 1, remainingCards[i]);
        i++;
      }
      this.setState({
        cards: cards,
        remainingCards: remainingCards.slice(this.noP)
      });
    }
    else{
      alert('Not a valid set, knucklehead...');
      this.checkForSets();
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


  render() {
    return(
      <div>
       <h1><span>Set Game</span></h1>
       <Rules rules={this.state.rules} toggleRules={this.toggleRules} />
       <Table selectCard={this.selectCard} selectedCards={this.state.selectedCards} cards={this.state.cards}/>
        <span>{this.state.cards.length}</span>
        <br></br>
        <span>{this.state.remainingCards.length}</span>
      </div>
    );
  }
}



export default SetGame;
