

/********** Global functions ****************/

const globals = {} ;

globals.tabVotes = JSON.parse(localStorage.getItem('votes')) ;

globals.shown = JSON.parse(localStorage.getItem('shown')) ;
console.log(globals.shown)

globals.setShown = function(value){
    localStorage.setItem('shown', value.toString());
}
// Function to retrieve the session token from cookies
globals.getSessionToken = async function() {
    try {
        const response = await fetch('api/get-session-token');
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


/********** datafetch functions ****************/

globals.getPlayersByPosition  = async function(positionId) {
    try {
        const response = await fetch(`api/players/${positionId}`);
        const data = await response.json();
        return data.players;
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}


globals.getPlayersById = async function(playerId) {
    let retryCount = 10; // Number of retry attempts

    do {
        try {
            const response = await fetch(`api/player/${playerId}`);
            const data = await response.json();

            if (Object.keys(data.player).length !== 0) {
                // Check if the response is not empty
                return data.player;
            }

            // If the response is empty, log and retry
            console.warn('Empty response received. Retrying...');
        } catch (error) {
            console.error('Error fetching player:', error);
        }

        // Decrement the retry count and wait for a short duration before retrying
        retryCount--;
        await new Promise(resolve => setTimeout(resolve, 1000));
    } while (retryCount > 0);

    console.error('Max retries reached. Unable to fetch non-empty player data.');
    return null; // or handle accordingly
}

globals.saveVotes = async function(token, votes) {
    try {
        const response = await fetch('api/votes/saveVotes', {
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
        const response = await fetch(`api/stats/${playerId}/${positionId}`);
        const data = await response.json();
        return data.player;
    } catch (error) {
        console.error('Error fetching player:', error);
        return [];
    }
};

globals.getTopPlayer = async function (positionId) {
    try {
        const response = await fetch(`api/top/${positionId}`);
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