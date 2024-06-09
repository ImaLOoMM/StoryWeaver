function await_click({where = "content"}, raw_next){
    return new Promise((resolve, reject) => {
         // Определение области ожидания клика
        target = document.getElementById(where);
        const onClick = () => {
             // После выхода из функции обработчик клика больше не пригодится. Удаляем
            target.removeEventListener('click', onClick);
             // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
            if(raw_next.length > 1){ console.warn("Too many links") }
            resolve(raw_next[0]);
        };
         // обработчик клика
        target.addEventListener('click', onClick);
    });
}

export { await_click };