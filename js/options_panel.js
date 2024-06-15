document.addEventListener('DOMContentLoaded', function () {
    const panel_btn = document.getElementById('panel_button');
    const panel = document.getElementById('panel');
    const oc_arrow = document.getElementById('oc_arrow');
    // const content = document.getElementById('content')
    let is_options_panel_opened = false;

    panel_btn.addEventListener('click', function () {
        if (is_options_panel_opened){
            /*Закрыть окно*/
            var elements = document.querySelectorAll('#everywhere *');
                elements.forEach(function(element) {
                    element.style.filter = "";
            });
            panel.style.left = '-20%';
            panel_btn.style.left = '0%'
            oc_arrow.classList.remove('left-arrow');
            is_options_panel_opened = false;
        } else {
            // content.style.filter = "blur(10px)"
            var elements = document.querySelectorAll('#everywhere *');
                elements.forEach(function(element) {
                    element.style.filter = "blur(5px)";
            });
            
            panel.style.left = '0px';
            panel_btn.style.left = '20%'
            oc_arrow.classList.add('left-arrow');
            is_options_panel_opened = true;
        }
        setTimeout(function () {
            panel_btn.disabled = false;
        }, 300);
    });

    // hideButton.addEventListener('click', function () {
    //     panel.style.left = '-200px';
    // });
});

