const Multiplayer = {
    lastSelectedMultiplayer() {
        if (this.isValid(this.state.selectedCards)) {
          this.selectSet();
        } else {
          this.failedSelect();
          this.setState({
            selectedCards: []
          });
        }
      },
    
    receivedValidSet(selectedSet) {
        const author = selectedSet.author;
        const set = selectedSet.set;
        const cards = this.state.cards.slice();
        let remainingCards = this.state.remainingCards.slice();
        this.calculateElapsed(author);
        this.showTime();

        if (author !== this.state.connectionID) {
            this.setState({
            received: set
            });
        };

        if (remainingCards.length > 0) {
            if (cards.length > 12) {
            for (const card of set){
                cards.splice(cards.indexOf(card), 1);
            };
            } 
            else {
            let i = 0;
            for (const card of set) {
                cards.splice(cards.indexOf(card), 1, remainingCards[i]);
                i++;
            };
            remainingCards = remainingCards.slice(this.noP);
            }
        } 
        else {
            for (const card of set) {
            cards.splice(cards.indexOf(card), 1);
            };
            //Alert with winner?
            if (this.findValidSets(cards).length === 0) {
            setTimeout(() => this.setState({
                cards: cards,
                finished: true,
                winner: this.state.players.sort((a, b) => b.score - a.score)[0]
            }), 3000 * this.animationTimeFactor);
            };
        };

        setTimeout(() => this.setState({
            cards: cards,
            remainingCards: remainingCards,
            selectedCards: [],
            received: []
        }, () => {
            this.generateTitle();
        }), 3000 * this.animationTimeFactor);
    },
    
    sendMessage() {
        const input = document.getElementById("messageText");
        
        try {
          this.ws.send(JSON.stringify({action: "message", message: `${input.value}`})); //send data to the server
          input.value = '';
        } 
        catch (error) {
          console.log(error) // catch error
        }
      },
    
    joinGame(gameId) {
    
        try {
            this.ws.send(JSON.stringify({action : "joinGame", gameId: gameId})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },
    
    createGame() {
    
        try {
            this.ws.send(JSON.stringify({action: "createGame", gameName: this.state.newGameName})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },

    startGame() {
        try {
            const deck = this.fisherYatesShuffle(this.generateDeck());
            this.ws.send(JSON.stringify({action : "startGame", deck: deck})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },

    failedSelect() {
    //And failed noSet try
        try {
            this.ws.send(JSON.stringify({action: "failedSelect"})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },

    selectSet() {
        try {
            this.ws.send(JSON.stringify({action: "selectSet", selected: this.state.selectedCards})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },
    
    noSet() {
        try {
            this.ws.send(JSON.stringify({action: "noSet"})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },

    leaveGame() {
        try {
            this.ws.send(JSON.stringify({action: "leaveGame"})); //send data to the server
        } 
        catch (error) {
            console.log(error) // catch error
        }
    },

    returnToLobby() {
        this.leaveGame();
        const deck = this.fisherYatesShuffle(this.generateDeck());
        this.setState({
            currentGame: false,
            lobby: true,
            rules: false,
            started: false,
            players: [],
            finished: false,
            cards: deck.slice(0, this.noP * 4),
            remainingCards: deck.slice (this.noP * 4),
        });
    },

    connect() {
        this.ws = new WebSocket(`wss://qhurwv53tk.execute-api.eu-central-1.amazonaws.com/dev?player=${this.state.playerNickname}`)
        
        this.ws.onmessage = (event) => {
            /*Write dispatcher for chatmessage, lobby info, game info, start game, selected...*/
            const data = JSON.parse(event.data);
            console.log(data);
            let messages = this.state.webSocketChat.slice();
            let players = this.state.players.slice();
            const games = this.state.games.slice();

            for (const key in data) {
            switch(key) {

                case "lobbyInfo":
                this.setState({
                    games: data.lobbyInfo
                });
                break;

                case "ownID":
                this.setState({
                    connectionID: data.ownID
                });
                break;
                
                case "waitingUsers":
                this.setState({
                    waitingUsers: data.waitingUsers
                });
                break;

                case "correctWaitingUsers":
                const currentWaitingUsers = this.state.waitingUsers;
                this.setState({
                    waitingUsers: currentWaitingUsers + data.correctWaitingUsers
                });
                break;

                case "lobbyUpdate":
                games.push(data.lobbyUpdate);
                this.setState({
                    games: games
                });
                break;

                case "createdGame":
                const player = data.createdGame.players;
                player.colour = this.playersColours[0];
                games.push({ID:data.createdGame.gameID, gameName:data.createdGame.gameName, started:false});
                this.setState({
                    games,
                    currentGame: data.createdGame.gameID,
                    players:[player],
                    webSocketChat:[{author:'Gameroom', content: `You have created ${this.state.newGameName} game. Wait for at least one player to start!`}],
                });
                break;
                
                case "joinedGame":
                const gamePlayers = data.joinedGame.players;
                gamePlayers.map(player => player.colour = this.playersColours[gamePlayers.indexOf(player)]);
                this.setState({
                    currentGame: data.joinedGame.gameId,
                    players: gamePlayers
                });
                break;

                case "startedGame":
                this.setState({
                    countdown: 3
                });
                const tick = setInterval(() => this.setState((state) => ({
                    countdown: state.countdown - 1
                })), 1000);

                setTimeout(() => this.setState({
                    cards: data.startedGame.deck.slice(0, this.noP * 4),
                    remainingCards: data.startedGame.deck.slice (this.noP * 4),
                    startTime: new Date(),
                    started: true,
                    countdown: 3
                }, () => {clearInterval(tick); this.setState({countdown:false})}), 4000 * this.animationTimeFactor);
                break;

                case "leftGame":
                
                this.setState({
                    currentGame: false,
                });
                this.ws.send(JSON.stringify({action:"lobbyInfo"}));
                break;

                case "playerLeft":
                players = players.filter(player => player.ID !== data.playerLeft);
                this.setState({
                    players
                });
                break;

                case "newPlayer":
                const newPlayer = data.newPlayer;
                
                if (data.newPlayer.ID !== this.state.connectionID){
                    players.push(newPlayer);
                    players.map(player => player.colour = this.playersColours[players.indexOf(player)]);
                    this.setState({
                    players
                    });
                }
                console.log(players);
                break;

                case "playerDisconnected":
                for(const player of players) {
                    if(player.ID === data.playerDisconnected) {
                    messages.push({author:"Gameroom", content:`Player ${player.name} lost connection.`})
                    players.splice(players.indexOf(player), 1);
                    this.setState({
                        players,
                        webSocketChat: messages
                    });
                    break;
                    };
                };
                break;

                case "message":
                messages.push(
                    data.message
                );

                this.setState({
                    webSocketChat: messages
                });
                break;

                case "failedSelect":
                for(const player of players){
                    if(player.ID === data.failedSelect){
                    const currentScore = player.score;
                    player.score = currentScore - 1;
                    }
                }
                this.setState({
                    players
                });
                break;
                
                case "selectedSet":
                this.receivedValidSet(data.selectedSet);
                break;
                
                case "noSet":
                //Deal 3 new cards and allocate 3 points for the daredevil

                for(const player of players){
                    if(player.ID === data.noSet) {
                    const currentScore = player.score;
                    player.score = currentScore + 3;
                    };
                };
                const cards = this.state.cards.slice();
                const remainingCards = this.state.remainingCards.slice();
                cards.push(...remainingCards.slice(0, this.noP));
                this.setState({
                    cards: cards,
                    remainingCards: remainingCards.slice(this.noP),
                    players
                },() => { 
                    this.generateTitle();
                });
                break;

                default:
                console.log('ERR:Unrecognized message.');
            }
            }
            
        }

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({action:"lobbyInfo"}));
            this.setState({
            webSocketChat:[{author:'Gameroom', content: 'Welcome to the lobbby! Create your game or join to existing one. You can also play single-player version while waiting for friends to join you.'}]
            });
            console.log('connected');
        }

        this.ws.onclose = () => {
            console.log('disconnected');
            this.setState({
            currentGame: false,
            games:[],
            connectionID: 0,
            waitingUsers:0,
            });
        }
    }
}

export default Multiplayer;
