

/********** Global functions ****************/

const globals = {} ;

// Function to retrieve the session token from cookies
globals.getSessionToken = async function() {
    try {
        const response = await fetch('/beaujoire-2/api/get-session-token');
        const data = await response.json();
        return data.sessionToken;
    } catch (error) {
        console.error('Error fetching the session Token:', error);
        return [];
    }
}

async function getSessionTokenValue(){
    globals.sessionToken = await globals.getSessionToken();
    console.log(globals.sessionToken);
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

globals.saveVotes = async function(token, votes) {
    try {
        const response = await fetch('/beaujoire-2/api/votes/saveVotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                votes: votes,
            }),
        });

        const data = await response.json();
        return data.success; // Assuming the server responds with a success property
    } catch (error) {
        console.error('Error saving votes:', error);
        return false;
    }
};

globals.getPlayerStats = async function(playerId, positionId) {
    try {
        const response = await fetch(`/beaujoire-2/api/stats/${playerId}/${positionId}`);
        const data = await response.json();
        return data.player;
    } catch (error) {
        console.error('Error fetching player:', error);
        return [];
    }
};

globals.getTopPlayer = async function (positionId) {
    try {
        const response = await fetch(`/beaujoire-2/api/top/${positionId}`);
        const data = await response.json();

        if (data.success) {
            return data.topPlayer;
        } else {
            console.error('Error:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error fetching top player:', error);
        return null;
    }
};