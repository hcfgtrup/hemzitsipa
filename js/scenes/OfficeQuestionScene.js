import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class OfficeQuestionScene extends Scene {
    constructor() {
        super('office_question');
    }
    
    getText(gameState) {
        let text = `— А что ещё можно сделать? — По стажёру было видно, что он растерян и не понимает, что я имею в виду.

Я просто молча смотрел на него, надеясь, что он догадается, что я имею в виду. Правда, стажёр стоял всё с тем же выражением лица. Возможно, ему нужно намекнуть, что я хочу сделать, но думаю, он сам должен догадаться.

— Мистер ГГ, я честно не понимаю, что нужно сделать перед тем, как идти опрашивать... — На секунду новичок замялся, возможно, что-то понял: — Собрать информацию о нём?

Я молча кивнул и увидел, как на лице стажёра появилась небольшая ухмылка гордости. Всё же эмоции он скрывать не умеет. Лучше бы ему научиться, а то потом, возможно, это может ему помешать.

— Можешь сходить нам за кофе? Я пока начну собирать информацию.`;

        return {
            text: text,
            choices: [
                new Choice('continue_to_gather', 'Продолжить', 'office_gather', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'continue_to_gather') return 'office_gather';
        return 'office_question';
    }
}