import { one_ctl } from '../one_ctl.js';
const DOMPurify = require('dompurify')(window);

export function text(kwargs = {}, raw_next) {
    return new Promise((resolve, reject) => {
        const paragraph = document.getElementById("text");
        const { text_content = "", ...rest } = kwargs;
        const cleaned_text = DOMPurify.sanitize(text_content, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'i', 'b'], // Разрешенные теги
            ALLOWED_ATTR: ['color', 'lang', 'dir', 'id', 'class', 'title'], // Разрешенные атрибуты
        });
        paragraph.innerHTML = cleaned_text;
        for (const [method, value] of Object.entries(rest)) {
            paragraph.style[method] = value;
        }
        // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
        resolve(one_ctl(raw_next));
    });
}
