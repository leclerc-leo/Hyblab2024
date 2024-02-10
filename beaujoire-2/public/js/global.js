/********** Table de votes tomporaire ****************/
var votesTmp = [];

for (let i = 0; i <= 11; i++) {
    votesTmp.push(0);
}
if (!(localStorage.getItem('votes'))){
    localStorage.setItem('votes', JSON.stringify(votesTmp));
}

/********** Global functions ****************/

const globals = {} ;

// Function to retrieve the session token from cookies
globals.getSessionToken = function() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'sessionToken') {
            return value;
        }
    }
    return null;
}
/********** vote handling functions ****************/

// function to checkVotes :
globals.checkAllVotes = function(votes){
    for (let i = 0; i <= 11; i++) {
        if (votes[i] === 0) {
            return false;
        }
    }
    return true ;
}

globals.updateVotes = function(votes){
    localStorage.setItem('votes', JSON.stringify(votes));
}

globals.tabVotes = JSON.parse(localStorage.getItem('votes')) ;

/********** datafetch functions ****************/

globals.getPlayersByPosition  = async function(positionId) {
    try {
        const response = await fetch(`/beaujoire-2/api/players/${positionId}`);
        const data = await response.json();
        return data.players;
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}


globals.getPlayersById = async function(playerId) {
    try {
        const response = await fetch(`/beaujoire-2/api/player/${playerId}`);
        const data = await response.json();
        return data.player;
    } catch (error) {
        console.error('Error fetching player:', error);
        return [];
    }
}

//globals.getVotedPlayers