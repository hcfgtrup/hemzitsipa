import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class AfterAltDinnerScene extends Scene {
    constructor() {
        super('after_alt_dinner');
    }
    
    getText(gameState) {
        let text = `После ужина с братом вы вернулись в офис. Странное чувство не покидало вас. Брат вёл себя слишком спокойно, слишком уверенно.

— Сэр, — стажёр прервал ваши мысли, — что будем делать дальше?

Вы посмотрели на доску с уликами. Нити, фотографии, вопросы без ответов.

— Нужно осмотреть кабинет адвоката, — сказали вы. — Там должны быть ответы.`;

        return {
            text: text,
            choices: [
                new Choice('to_cabinet', 'Ехать в кабинет адвоката', 'cabinet_search', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'to_cabinet') return 'cabinet_search';
        return 'after_alt_dinner';
    }
}