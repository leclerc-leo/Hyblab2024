const hide_block = (block) => {
    block.style.width = '0';
    block.style.height = '0';
    block.style.bottom = '50%';
    block.style.left = '50%';
    block.style.overflow = 'hidden';
    block.style.borderRadius = '50%';
    block.style.opacity = '0';
};

const handle_return = (swiper,swiper_controls, page_controls, return_button) => {
    const category = return_button.id.split('-')[0];
        
    const block = document.querySelector(`#${category}-page`);
    
    if (block == null) return;
    
    swiper_controls.classList.toggle('hidden');
    page_controls.classList.toggle('hidden');
    
    hide_block(block);
    
    return_button.id = 'return';
    
    swiper.enable();
}

const remove_listeners = id => {
    const el = document.querySelector(`${id}`),
            elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

const move_background = (x, b = false) => {
    const background = document.querySelector('.background');

    if (b) background.style.transition = 'left 0.3s ease-in-out';
    else background.style.transition = 'none';

    x = (100 - x) * 1.5 - 25;
    background.style.left = `${x}%`;
}

const handle_orientation = (event) => { 
    const y = Math.min(event.gamma, 90) + 90;
    const maxs = {
        'high': 30,
        'med': 20,
        'low': 10
    }

    for (const [key, max] of Object.entries(maxs)) {
        document.querySelectorAll(`.background-move-${key}`).forEach( element => {
            element.style.left = `${(max * y) / 180 - max}px`;
        });
    }
}