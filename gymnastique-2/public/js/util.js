const hide_block = (block, button) => {
    block.style.width = '0';
    block.style.height = '0';
    block.style.bottom = button.style.bottom;
    block.style.left = button.style.left;
    block.style.overflow = 'hidden';
    block.style.borderRadius = '50%';
    block.style.opacity = '0';
};

const handle_exit = (swiper,swiper_controls, page_controls, exit_button, home_button) => {
    const category = exit_button.id.split('-')[0];
        
    const button = document.querySelector(`#${category}-button`);
    const block = document.querySelector(`#${category}-page`);
    
    if (block == null) return;
    
    swiper_controls.classList.toggle('hidden');
    page_controls.classList.toggle('hidden');
    
    hide_block(block, button);
    
    exit_button.id = 'exit';
    home_button.id = 'home';
    
    swiper.enable();
}

const handle_home = (swiper, swiper_controls, page_controls, home_button) => {
    const category = home_button.id.split('-')[0];
  
    const button = document.querySelector(`#${category}-button`);
    const block = document.querySelector(`#${category}-page`);

    if (block == null) return;
  
    swiper_controls.classList.toggle('hidden');
    page_controls.classList.toggle('hidden');
  
    block.style.visibility = 'hidden'; // pour éviter de jouer l'animation de sortie
    hide_block(block, button);
  
    swiper.enable();
    swiper.slideTo(1);
}

const remove_listeners = id => {
    const el = document.querySelector(`${id}`),
            elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}

const move_background = (x) => {
    const background = document.querySelector('.background');
    const active = document.querySelector('.swiper-slide-active');

    const left = - background.offsetWidth * x / 100 + active.offsetWidth * x / 100;

    background.style.left = `${left}px`;
}