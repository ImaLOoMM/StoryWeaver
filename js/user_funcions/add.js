export function text(kwargs = {}, raw_next){
    return new Promise((resolve, reject) => {
        const paragraph = document.getElementById("text");
        const { text_content = "", ...rest } = kwargs;
        const cleaned_text = DOMPurify.sanitize(text_content, {
            ALLOWED_TAGS: ['p', 'strong', 'em', 'i', 'b'], // Разрешенные теги
            ALLOWED_ATTR: ['color', 'land', 'dir', 'id', 'class', 'title'], // Разрешенные атрибуты
          });
        paragraph.innerHTML = cleaned_text;
        for (const [method, value] of Object.entries(rest)) {
            paragraph.style[method] = value;
        }
         // Нет никаких вариаций, поэтому выбирается первый элемент во избежание ошибок
        if (raw_next.length > 1){console.warn("Too many links") }
        resolve(raw_next[0]);
    });
}