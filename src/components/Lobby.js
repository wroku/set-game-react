import React from 'react';
import classNames from 'classnames';

class Lobby extends React.Component {
  
    handleKeySend = e => {
      if(e.key ==="Enter") {
        this.props.sendMessage();
      };
    };
  
    componentDidUpdate() {
      const chatBox = document.getElementById('scrollableBox');
      chatBox.scrollTop = chatBox.offsetHeight + this.props.messages.length * 30;
    }
  
    render() {
      const className = classNames({
        'lobby': true,
        'hidden': !this.props.lobby
      });
  
      const chatMessages = [];
      for (let i=0; i < this.props.messages.length; i++) {
  
        let playerColour = 'grey';
        for(const player of this.props.players){
          if(player.ID === this.props.messages[i].author){
            playerColour = player.colour;
          };
        };
        //ehmm.. playerColour = this.props.players.find(player => player.ID === this.props.messages[i].author).colour;
        
        const chatTextClassName = classNames({
          'chat-text':true,
          'own': this.props.messages[i].author === this.props.connectionID,
          [`${playerColour}`]: true
        });
  
        const chatMessageClassName = classNames({
          'chat-message': true,
          'sended': this.props.messages[i].author === this.props.connectionID,
          'last' : i === this.props.messages.length - 1
        });
  
        chatMessages.push(
          <div key={i} className={chatMessageClassName}>
              <div className={chatTextClassName}>
                {this.props.messages[i].content}
            </div>
          </div>
        );
      };
  
      const lobbyGames = [];
      let gameName = '';
      for(const game of this.props.games){
        if(game.ID === this.props.currentGame){
          gameName = game.gameName;
        };
        lobbyGames.push(
          <div className='lobby-game' key={game.ID}>
            <span>{game.gameName} {game.started ? "ongoing" : <span className='joinGame' onClick={() => this.props.joinGame(game.ID)}>Join</span>}</span>
          </div>
        );
      };
      if (lobbyGames.length === 0) {
        lobbyGames.push(<div className='lobby-game'><span>No active games.</span></div>)
      }
  
      const scores = [];
      
      const sortedPlayers = this.props.players.sort((a, b) => b.score - a.score);
      for (const player of sortedPlayers){
        scores.push(
          <tr className='player-row' key={player.ID}>
            <th className={`player-name ${player.colour}`}>{player.name}</th>
  
            <th className={`player-avg-time ${player.colour}`}>{player.times.length > 0 ? Math.round((player.times.reduce((x, y) => x + y)/player.times.length)*10)/10 : '-'}</th>
            <th className={`player-score ${player.colour}`}>{player.score}</th>
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
              <div className='lobby-games'>
                {lobbyGames}
              </div>
              
              <div className='bottom-lobby-wrapper'>
                
                Awaiting users: <b>{this.props.nofWaitingUsers}</b> 
                
                <button className='createGame' onClick={this.props.promptForGameName}>Create game</button>
              </div>
            </div>
  
            <div className={this.props.currentGame ? 'current-game': 'current-game hidden'}>
              <div className='gamesBox-title-wrapper'>
                {gameName} 
                <svg className={!this.props.started ? "close-icon" : 'close-icon hidden'} onClick={this.props.leaveGame} x="0px" y="0px" viewBox="0 0 26 26" >
                  <g>
                    <path d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
                      C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
                      L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
                      L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
                      c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
                      C19.033,16.725,19.033,17.138,18.78,17.394z"/>
                  </g>
                </svg>
  
              </div>
              <div className='game-info'>
                Remaining cards: {this.props.started ? this.props.nofRemainingCards : '-'}
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
              
              <div id='scrollableBox' className='messages'>
                {chatMessages}
                <div className='hateDot'>.</div>
              </div>
              
              <div className='input-wrapper'>
                <input type="text"  id="messageText" autoComplete="off" onKeyPress={this.handleKeySend}/>
                <button className='sendBtn' onClick={this.props.sendMessage}>Send</button>
              </div>
              
            </div>
          </div>
        </div>
      );
    }
  }

  export default Lobby;