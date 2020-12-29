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
            <th>#</th><th>Player</th><th>Score</th> 
            <th>Time 
              <span onClick={this.props.toggleLeaderboards} className='right'>
                <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                  <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </span>
            </th>
        </tr>
      ];
  
      if (this.props.topScores.length > 0){
        for(let i = 0; i < this.props.topScores.length; i ++){
          let record = this.props.topScores[i];
          topScores.push(
            <tr className='recordrow' key={record.key}>
              <th>{i + 1}</th><td>{record.player}</td><td>{record.score}</td><td>{record.time} s</td>
            </tr>
          )
        } 
      }
      
      const fastestGames = [
        <tr className='titlerow' key='titlerow'>
            <th>#</th><th>Player</th><th>Average time</th> 
            <th>Score
              <span onClick={this.props.toggleLeaderboards} className='right'>
                <svg height="14pt" width="14pt" viewBox="0 0 368 368"  xmlns="http://www.w3.org/2000/svg">
                  <path d="m360 128h-88v-120c0-4.425781-3.574219-8-8-8h-160c-4.425781 0-8 3.574219-8 8v120h-88c-4.425781 0-8 3.574219-8 8v224c0 4.425781 3.574219 8 8 8h352c4.425781 0 8-3.574219 8-8v-224c0-4.425781-3.574219-8-8-8zm-8 16v144h-80v-144zm-240-128h144v272h-144zm-16 128v144h-80v-144zm-80 160h80v48h-80zm96 0h144v48h-144zm160 48v-48h80v48zm0 0"/>
                  <path d="m152 176h64c4.425781 0 8-3.574219 8-8s-3.574219-8-8-8h-24v-88c0-3.230469-1.945312-6.160156-4.9375-7.390625-2.992188-1.25-6.429688-.554687-8.71875 1.734375l-16 16c-3.128906 3.128906-3.128906 8.183594 0 11.3125s8.183594 3.128906 11.3125 0l2.34375-2.34375v68.6875h-24c-4.425781 0-8 3.574219-8 8s3.574219 8 8 8zm0 0"/></svg>
              </span>
            </th>
        </tr>
      ];
  
      if (this.props.fastestGames.length > 0){
        for(let i = 0; i < this.props.fastestGames.length; i ++){
          let record = this.props.fastestGames[i];
          fastestGames.push(
            <tr className='recordrow' key={record.key}>
              <th>{i + 1}</th><td>{record.player}</td><td>{Math.round((record.time/record.score)*30)/10} s</td><td>{record.score}</td>
            </tr>
          )
        } 
      }

      const chosenLeaderboard = this.props.timeBasedLeaderboard ? fastestGames : topScores;
      
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
                <tbody>
                  {chosenLeaderboard}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }

export default Stats;