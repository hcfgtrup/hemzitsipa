import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class OfficeScene extends Scene {
    constructor() {
        super('office');
    }
    
    getText(gameState) {
        let text = `<img src="assets/locations/office.jpg" class="location-image" alt="Кабинет детектива">

— Может, сходим к его жене? Она ведь последняя его видела, — новичок сказал самое очевидное.

Мы бы так и так пошли к его жене, но я бы сейчас не отказался от чашечки кофе. И начал бы, наверное, собирать хотя бы какую-то более подробную информацию о пропавшем. Он адвокат, причём достаточно известный, один из лучших в своём деле. Это уж я знаю не понаслышке.`;

        return {
            text: text,
            choices: [
                new Choice('gather_data', 'Это само собой, но для начала я бы собрал данные о нём', 'office_gather', { professionalism: 1 }),
                new Choice('question_intern', 'Уверен?', 'office_question', {}),
                new Choice('get_coffee', 'Сделаем, но чуть позже, а пока принеси мне кофе', 'office_coffee', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'gather_data') return 'office_gather';
        if (choiceId === 'question_intern') return 'office_question';
        if (choiceId === 'get_coffee') return 'office_coffee';
        return 'office';
    }
}