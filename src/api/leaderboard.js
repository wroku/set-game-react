const Leaderboard = {

    fetchLeaderboard() {
        const axios = require('axios');  
        axios.get('https://consp8.deta.dev/records/?top=3')
        .then((response) => {
            // handle success
            this.setState({
            topScores: response.data
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

        const axios2 = require('axios');  
        axios2.get('https://consp8.deta.dev/records/?top=3&avg_time_based=true')
        .then((response) => {
            // handle success
            this.setState({
            fastestGames: response.data
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

    },

    addGameToLeaderboard() {
        const axios = require('axios');
        
        const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
        const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;
        const nickname = !this.state.playerNickname ? 'Anonym' : this.state.playerNickname;
        axios.post('https://consp8.deta.dev/records/',{
          player: nickname,
          score: currentScore,
          time: totalTime
        })
        .then((response) => {
          console.log(response);
          this.setState({
            gameId: response.data['key']
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    
    updateGameRecord() {
        const axios = require('axios');
        const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
        const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;
        const currentId = this.state.gameId;
        const nickname = !this.state.playerNickname ? 'Anonym' : this.state.playerNickname;
    
        axios.put(`https://consp8.deta.dev/records/${currentId}`,{
          
          player: nickname,
          score: currentScore,
          time: totalTime
        })
        .then(function(response){
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
}



export {Leaderboard};