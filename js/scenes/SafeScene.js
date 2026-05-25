import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class SafeScene extends Scene {
    constructor() {
        super('safe_scene');
    }
    
    getText(gameState) {
        gameState.setFlag('safe_searched', true);
        
        let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Вы открыли сейф. Внутри, среди пыльных папок, лежал конверт. Не запечатанный.

На конверте — **ваше имя**.

Вы взяли его дрожащими пальцами. Внутри — фотография. Ваша. Сделанная сегодня у офиса.

На обороте надпись:

*«Ты не ищешь убийцу. Ты ищешь себя. Игра закончится, когда ты вспомнишь, что забыл 12 лет назад.»*

— Сэр, что это значит? — спросил стажёр.

— Не знаю, — ответили вы. — Но я собираюсь выяснить.`;

        if (!gameState.getFlag('full_search_done')) {
            text += `\n\nВы ещё не осмотрели весь кабинет.`;
            return {
                text: text,
                choices: [
                    new Choice('continue_search', '📚 Продолжить осмотр кабинета', 'full_search_scene', {})
                ]
            };
        }
        
        text += `\n\nВы обыскали всё, что можно. Пора возвращаться.`;
        gameState.setFlag('cabinet_searched', true);
        
        return {
            text: text,
            choices: [
                new Choice('back_to_brother', '🚗 Вернуться в офис', 'brother_meeting', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'continue_search') return 'full_search_scene';
        if (choiceId === 'back_to_brother') return 'brother_meeting';
        return 'safe_scene';
    }
}