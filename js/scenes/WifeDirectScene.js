import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class WifeDirectScene extends Scene {
    constructor() {
        super('wife_direct');
    }
    
    getText(gameState) {
        let text = `— Когда вы в последний раз видели мужа и в каком он был состоянии? — спросил я без предисловий.

Женщина не удивилась. Видимо, привыкла к такому тону.

— Утром, около восьми. Он собирался на работу. Был... нормальным. Обычным. Нервничал перед важным делом, но это всегда так.

— Ничего необычного не заметили?

Она задумалась.

— Нет... хотя, — она запнулась, — за день до этого он был странным. Вернулся домой поздно, сказал, что всё в порядке, но я видела — он врал и что-то прятал, но я это нашла...`;

        return {
            text: text,
            choices: [
                new Choice('ask_what_he_hid', 'Что он прятал?', 'wife_continue', { professionalism: 1 })
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'ask_what_he_hid') return 'wife_continue';
        return 'wife_direct';
    }
}