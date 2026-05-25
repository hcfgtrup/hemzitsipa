import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class CipherScene extends Scene {
    constructor() {
        super('cipher_scene');
    }
    
    getText(gameState) {
        if (gameState.getFlag('cipher_solved') && gameState.getFlag('dinner_completed')) {
            return {
                text: `🎉 Расшифровка подтверждена! "Игра продолжается" — это ключ ко всему делу.

Вы уже поужинали с братом. Теперь нужно осмотреть кабинет адвоката.`,
                choices: [
                    new Choice('to_cabinet', '🚗 Ехать в кабинет адвоката', 'cabinet_search', {})
                ]
            };
        }
        
        if (gameState.getFlag('cipher_solved')) {
            return {
                text: `🎉 Расшифровка подтверждена! "Игра продолжается" — это ключ ко всему делу.

Брат зовёт вас на ужин. Что вы решите?`,
                choices: [
                    new Choice('dinner_agree', '🍽️ Согласиться на ужин с братом', 'dinner_agree', {}),
                    new Choice('dinner_decline', '❌ Отказаться от ужина', 'dinner_decline', {})
                ]
            };
        }
        
        return {
            text: `— Цезарь! — неожиданно воскликнули вы.

— Что? — стажёр явно ничего не понял.

— Шифр Цезаря. Сдвиг на один. «Йдсб рспепмзбёута» расшифровывается как...

🔓 **Введите расшифрованную фразу:**`,
            choices: [
                new Choice('cipher_input', '🔓 Ввести ответ', 'cipher_scene', {}, true, 'Введите расшифрованную фразу')
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'cipher_input') {
            const normalized = userInput ? userInput.trim().toUpperCase() : '';
            if (normalized === 'ИГРА ПРОДОЛЖАЕТСЯ') {
                gameState.setFlag('cipher_solved', true);
                return 'cipher_scene';
            }
            return 'cipher_scene';
        }
        if (choiceId === 'dinner_agree') {
            return 'dinner_agree';
        }
        if (choiceId === 'dinner_decline') {
            return 'dinner_decline';
        }
        if (choiceId === 'to_cabinet') return 'cabinet_search';
        return 'cipher_scene';
    }
}