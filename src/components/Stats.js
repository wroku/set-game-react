import React from 'react';
import classNames from 'classnames';

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
              <th>{i + 1}</th><td>{record.player}</td> <td>{record.score}</td> <td>{record.time} s</td>
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

export default Stats;