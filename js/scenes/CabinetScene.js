import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class CabinetScene extends Scene {
    constructor() {
        super('cabinet_search');
    }
    
    getText(gameState) {
        if (gameState.getFlag('cabinet_searched')) {
            return {
                text: `Вы уже полностью осмотрели кабинет адвоката. Пора возвращаться.`,
                choices: [
                    new Choice('back_to_brother', '🚗 Вернуться в офис', 'brother_meeting', {})
                ]
            };
        }
        
        return {
            text: `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Вы поднялись в кабинет адвоката. Дубовый стол, кожаное кресло, шкафы с папками. В углу — небольшой сейф, дверца приоткрыта.

— Он так и стоял открытым? — спросили вы.

— Да, — ответила женщина. — Я не закрывала.

Что будете делать?`,
            choices: [
                new Choice('open_safe', '🔐 Осмотреть сейф', 'safe_scene', {}),
                new Choice('search_room', '📚 Осмотреть весь кабинет', 'full_search_scene', { professionalism: 1 })
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'open_safe') return 'safe_scene';
        if (choiceId === 'search_room') return 'full_search_scene';
        if (choiceId === 'back_to_brother') return 'brother_meeting';
        return 'cabinet_search';
    }
}