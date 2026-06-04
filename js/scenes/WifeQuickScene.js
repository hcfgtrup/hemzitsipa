import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class WifeQuickScene extends Scene {
    constructor() {
        super('wife_quick');
    }
    
    getText(gameState) {
        let text = `<img src="assets/locations/wife_apartment.jpg" class="location-image" alt="Квартира жены адвоката">

— Задавайте свои вопросы. Я отвечу на всё, что смогу.`;

        return {
            text: text,
            choices: [
                new Choice('sympathy', 'Мне очень жаль, что вам пришлось через это пройти. Мы сделаем всё возможное, чтобы найти вашего мужа', 'wife_sympathy', { personalFeelings: 1 }),
                new Choice('direct', 'Когда вы в последний раз видели мужа и в каком он был состоянии?', 'wife_direct', { professionalism: 1 }),
                new Choice('silent', 'Возьмите паузу, дайте ей заговорить первой', 'wife_silent', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'sympathy') return 'wife_sympathy';
        if (choiceId === 'direct') return 'wife_direct';
        if (choiceId === 'silent') return 'wife_silent';
        return 'wife_quick';
    }
}