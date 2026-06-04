import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class StartScene extends Scene {
    constructor() {
        super('start');
    }
    
    getText(gameState) {
        const playerName = gameState.playerName || '_______';
        
        let text = `<img src="assets/locations/office.jpg" class="location-image" alt="Кабинет детектива">

День выдался солнечный. Ленивый свет пробивался сквозь жалюзи, полосами ложась на стол, заваленный папками.

Я сидел за столом, разглядывая папку с отчётами, когда в дверь осторожно постучали.

— Войдите, — бросил я, не поднимая взгляда.

Дверь приоткрылась, и в кабинет просунулся молодой парень — стажёр. Неловкий, в слишком новом пиджаке, с папкой под мышкой. Он быстро закрыл за собой дверь, сделал шаг вперёд.

— Эм... начальник, у нас новое дело. Сказали, что передать нужно вам. — Голос дрогнул, будто он боялся сказать что-то не так.

Я наконец поднял глаза. Парень выглядел так, будто только вчера вышел из университета: неуверенный, но с искоркой любопытства. Он протянул папку обеими руками.

— Я же просил обращаться ко мне как "${playerName}", — сказали вы.

Введите ваше имя (оно будет использоваться в игре):`;

        return {
            text: text,
            choices: [
                new Choice('set_name', 'Ввести имя', 'start', {}, true, 'Введите ваше имя')
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'set_name') {
            if (userInput && userInput.trim()) {
                gameState.playerName = userInput.trim().toUpperCase();
                localStorage.setItem('playerName', gameState.playerName);
            }
            return 'office';
        }
        return 'start';
    }
}