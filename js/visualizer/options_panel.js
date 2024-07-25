// Боковая панель / Меню паузы

const panel = document.getElementById('panel');
const pauseBarrier = document.getElementById('pause-barrier')
let is_pause = false;


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (is_pause) { // если пауза
            // поставить стиль активного барьера
            pauseBarrier.classList.remove("active-pause-barrier");
            pauseBarrier.classList.add("inactive-pause-barrier");
            panel.style.left = "-20%";
            is_pause = false;
        } else {
            pauseBarrier.classList.remove("inactive-pause-barrier");
            pauseBarrier.classList.add("active-pause-barrier");
            panel.style.left = "0";
            is_pause = true;
        }
        
    }
    
});

