import { one_ctl } from '../one_ctl.js';

// function one_ctl(raw_next) {
//     // для функций, которые принимают только одну ctl
//     if (raw_next.length > 1) {
//         console.warn("Too many links");
//     }
//     return raw_next[0]
// }

export function await_click({ where = "content" , count = 1}, raw_next, e) {
    return new Promise((resolve, reject) => {
        const target = document.getElementById(where); // Определяем область ожидания клика
        if (!target) {
            // если указана несуществующая область определения
            reject(new Error(`Element with id "${where}" not found`));
            return;
        };
        let clickCount = 0;
        const onClick = (e) => {
            // Вывести координаты мыши
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            console.log(`Mouse coordinates: X=${mouseX}, Y=${mouseY}`);
            clickCount++;
            if (clickCount >= count) {
                target.removeEventListener('click', onClick); // Удаляем обработчик события
                resolve(one_ctl(raw_next)); // Когда клик произошел, разрешаем промис
            }
        };
        target.addEventListener('click', onClick); // Добавляем обработчик клика
    });
}

export function await_time({time = 1000}, raw_next) {
    // time in ms
    return new Promise((resolve) => {
        setTimeout(() => {
            if(raw_next.length > 1){ console.warn("Too many links") }
            resolve(raw_next[0]);;
        }, time);
    });
}