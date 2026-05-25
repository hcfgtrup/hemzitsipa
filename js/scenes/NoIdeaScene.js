import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class NoIdeaScene extends Scene {
    constructor() {
        super('no_idea_scene');
    }
    
    getText(gameState) {
        return {
            text: `<img src="assets/locations/morgue.jpg" class="location-image" alt="Морг">

— У меня нет никаких идей, — признались вы.

Новичок помолчал, потом неуверенно произнёс:
— Может, это Цезарь? И салат, и человек с венком...

Вы резко подняли голову.
— Точно! Цезарь! А цифра 1 — сдвиг для шифра!

— Поехали в офис расшифровывать записку, — сказали вы.`,
            choices: [
                new Choice('go_to_cipher_from_noidea', '🔍 Ехать в офис', 'cipher_scene', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'go_to_cipher_from_noidea') return 'cipher_scene';
        return 'no_idea_scene';
    }
}