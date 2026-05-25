import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class BrotherDeclineScene extends Scene {
    constructor() {
        super('brother_decline');
    }
    
    getText(gameState) {
        return {
            text: `<img src="assets/locations/detective_home.jpg" class="location-image" alt="Дом детектива">

Вы отказались от встречи и пошли домой.

Всю дорогу вы думали о деле. Что-то было не так.

Утром вам позвонил стажёр:

— Шеф... водителя нашли мёртвым.

Вы сжали челюсть. Игра начиналась.`,
            choices: [
                new Choice('to_murder', '💀 Ехать на место убийства', 'murder_scene', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'to_murder') return 'murder_scene';
        return 'brother_decline';
    }
}