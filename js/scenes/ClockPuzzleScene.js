import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class ClockPuzzleScene extends Scene {
    constructor() {
        super('clock_puzzle');
    }
    
    getText(gameState) {
        if (gameState.getFlag('clock_puzzle_solved')) {
            return {
                text: `А в дверях стоял человек в чёрном. Лица не разглядеть — капюшон, перчатки.

— Ты сделал правильный выбор, отказавшись от встречи, — сказал он тихо. — Но это ничего не меняет.

Он исчез так же внезапно, как и появился.

Расследование подошло к концу. Улики указывают на заговор. Адвокат исчез, женщина у двери так и не заговорила, а стажёр... Кто он на самом деле?

Возможно, истина ещё ждёт своего часа.

Спасибо за игру!`,
                choices: [
                    new Choice('reset', 'Начать заново', 'reset', {}),
                    new Choice('main_menu', 'В главное меню', 'reset', {})
                ]
            };
        }
        
        const wrongAttempts = gameState.getFlag('clock_wrong_attempts') || [];
        
        let text = `Стажёр ушёл. Я сидел в тишине, перебирая бумаги. Мысли путались. Слишком много всего. Слишком много подозрений.

За окном давно стемнело. Я не заметил, как отключился свет. Моргнул один раз — и тут же вспыхнул снова. Я посмотрел на часы и увидел, что они остановились.

---

**ГОЛОВОЛОМКА: СТАРЫЕ ЧАСЫ**

Который час показывали часы во время остановки, если:

• Часовая стрелка — между 2 и 3
• Минутная стрелка — на 6?`;

        const choices = [];
        
        if (!wrongAttempts.includes('3:30')) {
            choices.push(new Choice('clock_wrong_330', '1. 3:30', 'clock_puzzle', {}));
        }
        if (!wrongAttempts.includes('3:00')) {
            choices.push(new Choice('clock_wrong_300', '2. 3:00', 'clock_puzzle', {}));
        }
        choices.push(new Choice('clock_correct', '3. 2:30', 'clock_puzzle', {}));
        
        if (wrongAttempts.includes('3:30') && wrongAttempts.includes('3:00')) {
            text += `\n\n*Остался только один вариант...*`;
        }

        return {
            text: text,
            choices: choices
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        const wrongAttempts = gameState.getFlag('clock_wrong_attempts') || [];
        
        if (choiceId === 'clock_correct') {
            gameState.setFlag('clock_puzzle_solved', true);
            if (wrongAttempts.length === 0) {
                gameState.updateStats({ professionalism: 2 });
            }
            return 'clock_puzzle';
        }
        
        if (choiceId === 'clock_wrong_330') {
            if (!wrongAttempts.includes('3:30')) {
                wrongAttempts.push('3:30');
                gameState.setFlag('clock_wrong_attempts', wrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! При 3:30 часовая стрелка уже на 3, а не между 2 и 3. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'clock_puzzle';
        }
        
        if (choiceId === 'clock_wrong_300') {
            if (!wrongAttempts.includes('3:00')) {
                wrongAttempts.push('3:00');
                gameState.setFlag('clock_wrong_attempts', wrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! При 3:00 часовая стрелка точно на 3, а не между 2 и 3. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'clock_puzzle';
        }
        
        if (choiceId === 'reset') return 'reset';
        return 'clock_puzzle';
    }
}