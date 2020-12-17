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

export default Rules;