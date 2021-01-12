import React from 'react';
import classNames from 'classnames';


  
class CustomAlert extends React.Component {

    render() {
        const alertWrapperClass = classNames({
            'alert-wrapper': true,
            'hidden': !(this.props.success || this.props.failedAttempt || this.props.noSetFail || this.props.playerPrompt || this.props.gameNamePrompt)
        });
        const alertStatusClass = classNames({
            'alert-absolute': true,
            'failedAttempt': this.props.failedAttempt,
            'success': this.props.success,
            'noSetFail': this.props.noSetFail,
            'nicknamePrompt': (!this.props.success && this.props.playerPrompt) || this.props.gameNamePrompt
        });

        let infoMain, infoAdd;
        let button = <button className="alert-btn" onClick={this.props.close}>OK</button>  
        
        if (this.props.failedAttempt) {
            infoMain = 'This is not a valid set.'
            infoAdd = this.props.setsOnTable !== 0 ? "Try again or use a hint if you are stuck." : "If you think that there is no set on the table, use red button to deal 3 more cards.";
        }
        else if(this.props.noSetFail) {
            infoMain = this.props.setsOnTable === 1 ? 'There is exactly one valid set on the table.' : `There are ${this.props.setsOnTable} valid sets on table.`;
            infoAdd = `If you are not sure whether to use No Set button, take a good look on the current title. Letters forming proper 'set' indicate presence of valid set on he table.`
        }
        else if (this.props.playerPrompt) {
            /* Clicking OK button should also in this case update game record with new player name, because this prompt can be displayed after last selected set */
            infoMain = `Provide your nickname:`
            infoAdd = <form>
                        <input className='name-input' type="text" maxLength="64" value={this.props.playerNickname} onChange={this.props.handlePlayerChange} />
                      </form>
            button = <button className="alert-btn" onClick={() => {this.props.close(); this.props.updateGameRecord();}}>OK</button>  
        }
        else if (this.props.gameNamePrompt) {
          /* Clicking OK button should also in this case update game record with new player name, because this prompt can be displayed after last selected set */
          infoMain = `Name your gameroom:`
          infoAdd = <form>
                      <input className='name-input' type="text" maxLength="64" value={this.props.newGameName} onChange={this.props.handleGameNameChange} />
                    </form>
          button = <button className="alert-btn" onClick={() => {this.props.close(); this.props.createGame()}}>CREATE</button>  
        }
        else if (this.props.success && this.props.started) {
            //Multiplayer endgame
            infoMain = `Congratulations!`
            infoAdd = `And the winner is... ${this.props.winner.name}! You can see game stats above. Good job!`
            button = <button className="alert-btn" onClick={this.props.returnToLobby}>PLAY AGAIN</button>
        } 
        else if (this.props.success) {
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

function ShowTime(props) {
    /* Component responsible for showing animated guess time in seconds */
    
    const className = classNames({
      'time-wrapper': true,
      'show': props.show})
      
    return(
      <div className={className}>
        <div className={props.winner ? 'lastTime' : 'lastTime forLooser'}>
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

function Countdown(props) {
  
    return(
      <div className={props.value || props.value === 0 ? 'countdown' : 'countdown hidden'}>
        <div className='countdown-text'>{props.value !== 0 ? props.value : "START!"}</div>
        <div className="alert-overlay"></div>
      </div>
     
    );
}

export {CustomAlert, ShowTime, Countdown};
  