import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class WifeSilentScene extends Scene {
    constructor() {
        super('wife_silent');
    }
    
    getText(gameState) {
        let text = `Я промолчал. Просто сидел и смотрел на неё, ожидая.

Женщина выдержала мой взгляд несколько секунд, затем отвела глаза.

— Вы не из тех, кто будет ходить вокруг да около, верно? — спросила она с лёгкой усмешкой.

— Не люблю тратить время, — ответил я.

Она кивнула, будто одобряя.

— Хорошо. Тогда я сразу скажу: он что-то скрывал. За неделю до пропажи он изменился. Стал рассеянным, часто смотрел на телефон, иногда уходил в кабинет и запирался.

— Вы знаете, с чем это связано?

— Нет, — она покачала головой. — Но я нашла кое-что. В его столе. Хотите посмотреть?`;

        return {
            text: text,
            choices: [
                new Choice('show_me', 'Покажите', 'wife_continue', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'show_me') return 'wife_continue';
        return 'wife_silent';
    }
}