import React from 'react';
import classNames from 'classnames';

class Card extends React.Component {

    render() {
  
      const number = this.props.ncss[0];
      const colour = this.props.ncss[1];
      const shape = this.props.ncss[2];
      const shading = this.props.ncss[3];
      const isSelected = !(this.props.selectedCards.indexOf(this.props.ncss) === -1)
      const isHinted = !(this.props.hintedCards.indexOf(this.props.ncss) === -1)
      const isExcluded = !(this.props.excludedFromScore.indexOf(this.props.ncss) === -1)
      const wasReceived = !(this.props.received.indexOf(this.props.ncss) === -1)
      const classNameCard = classNames({
        'card': true,
        'selected' : isSelected,
        'hinted': isHinted,
        'animate-card-multiplayer': wasReceived,
      });
  
      const classNameScore = classNames({
        'score-wrapper': true,
        'animate': this.props.showTime && isSelected && !isExcluded,
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
        onTable.push(<Card key={card} ncss={card} selectCard={props.selectCard} selectedCards={props.selectedCards} colours={props.colours} hintedCards={props.hintedCards} showTime={props.showTime} excludedFromScore={props.excludedFromScore} received={props.received} />)
    }

    return(
        <div className='table-wrapper'>
            {onTable}
        </div>
    );
}

export default Table;