import { one_ctl } from '../one_ctl.js';
const { sanitize } = window.api;

export function text(kwargs = {}, raw_next) {
    return new Promise((resolve, reject) => {
        const paragraph = document.getElementById("text");
        const { textContent = "", ...rest } = kwargs;
        const cleaned_text = sanitize(textContent, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'i', 'b', 'u', 's', 'span', 'small', 'big', 'mark', 'sub', 'sup', 'abbr'], // Разрешенные теги
            ALLOWED_ATTR: ['color', 'lang', 'dir', 'id', 'class', 'title'], // Разрешенные атрибуты
        });
        if (textContent != cleaned_text) {
            console.warn("cleared to:", cleaned_text);
        };
        paragraph.innerHTML = cleaned_text;
        for (const [method, value] of Object.entries(rest)) {
            paragraph.style[method] = value;
        }
        // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
        resolve(one_ctl(raw_next));
    });
}
