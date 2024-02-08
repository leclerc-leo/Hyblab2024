const cards = Array.from(document.querySelectorAll('.jo-card-container'));

cards.forEach(card => {
    const others = cards.filter(c => c !== card);

    card.addEventListener('click', () => {
        others.forEach(c => {
            c.classList.toggle("hidden");
        });

        card.classList.toggle("actif");
        card.querySelector('p').classList.toggle("hidden");
    });
});