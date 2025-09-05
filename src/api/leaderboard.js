import axios from 'axios';

const instance = axios.create({
  baseURL: '/leaderboard/',
  headers: {
    'Content-Type': 'application/json', 
  },
});


const Leaderboard = {

    fetchLeaderboard() {
        instance.get('/records/?top=3')
        .then((response) => {
            // handle success
            this.setState({
            topScores: response.data
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
        });


        instance.get('/records/?top=3&avg_time_based=true')
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
        
        const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
        const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;
        const nickname = !this.state.playerNickname ? 'Anonym' : this.state.playerNickname;
        instance.post('/records/',{
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
        const currentId = this.state.gameId;
        if (currentId === 0) {
          console.log('Update called before creating record.')
          return
        }
        const currentScore = this.state.successTimes.length * 3 - this.state.fails.reduce((x,y) => x + y);
        const totalTime = Math.round(this.state.successTimes.reduce((x,y) => x + y) * 10)/10;

        const nickname = !this.state.playerNickname ? 'Anonym' : this.state.playerNickname;
    
        instance.put(`records/${currentId}`,{
          
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