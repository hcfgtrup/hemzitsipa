import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class BrotherCallScene extends Scene {
    constructor() {
        super('brother_call');
    }
    
    getText(gameState) {
        let text = `Я посидел ещё немного в кабинете, думая о деле. В голову ничего не приходило. Из моих раздумий меня вывел звонок моего телефона. Это был брат.

— Привет, ты как там? — В трубке сразу прозвучал голос моего брата. Он был, как всегда, бодр и весел, несмотря на то, что уже поздний вечер. — Я вернулся. Предлагаю встретиться, хотя бы ненадолго. Отказ не принимаю. Сейчас скину адрес, куда тебе подходить. До встречи!

Я ничего не успел ему сказать, как он отключился.

Что делать?`;

        return {
            text: text,
            choices: [
                new Choice('meet_brother', 'Идти на место встречи', 'brother_meeting', {}),
                new Choice('decline_brother', 'Пойти домой', 'bad_ending_home', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'meet_brother') return 'brother_meeting';
        if (choiceId === 'decline_brother') return 'bad_ending_home';
        return 'brother_call';
    }
}