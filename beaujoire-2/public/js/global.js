/********** Table de votes tomporaire ****************/
var votesTmp = [];

for (let i = 1; i <= 12; i++) {
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

