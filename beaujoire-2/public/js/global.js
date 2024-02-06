/********** Table de votes tomporaire ****************/
var votesTmp = [];

for (let i = 1; i <= 12; i++) {
    votesTmp.push(0);
}

localStorage.setItem('votes', JSON.stringify(votesTmp));

/********** Table de votes tomporaire ****************/