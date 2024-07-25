import { one_ctl } from '../one_ctl.js';

export function fill({area = "content", text="", background=""}, raw_next){
    return new Promise((resolve, reject) => {
        const interaction_area = document.getElementById(area); // Определение области заливки
        if (!interaction_area){
            console.error("AttributeError: Uncnown area to fill:", area)
        }
        if (text){
            interaction_area.style.color = text;
        }
        if (background){
            interaction_area.style.backgroundColor = background;
        }
        resolve(one_ctl(raw_next));
    });
}