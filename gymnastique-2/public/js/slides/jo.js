const cards = Array.from(document.querySelectorAll('.jo-card-container'));

cards.forEach(card => {
    card.addEventListener('click', () => {
        const others = cards.filter(c => c !== card);

        others.forEach(c => {
            c.classList.toggle("hidden");
        });

        card.classList.toggle("actif");
        card.querySelector('p').classList.toggle("hidden");
    });
});