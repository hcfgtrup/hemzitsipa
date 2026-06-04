import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class OfficeAfterStoryScene extends Scene {
    constructor() {
        super('office_after_story');
    }
    
    getText(gameState) {
        let text = `Мы ничего особенного не нашли. Возможно, в каких-то делах он так же оправдывал преступников, но что-то мне подсказывает, что это никак не будет относиться к делу. Всё равно нужно расспросить жену пропавшего.

— (Фамилия новичка), свяжись с женой мистера (ФИО пропавшего). Ну и можешь записать, что позже можем проверить ещё раз дела пропавшего — вдруг ещё что-нибудь найдём.

— Понял. — Новичок мгновенно достал блокнот и ручку, быстро что-то записал и вышел из кабинета.

Я взял свой кофе, сделал глоток, открыл жалюзи и встал около окна. Возможно, я всё ещё злюсь на этого адвоката, но работа есть работа.`;

        return {
            text: text,
            choices: [
                new Choice('hope_dead', 'Надеюсь, он уже мёртв', 'office_to_wife', { personalFeelings: 1 }),
                new Choice('hope_alive', 'Надеюсь, он ещё жив', 'office_to_wife', { professionalism: 1 })
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'hope_dead' || choiceId === 'hope_alive') {
            return 'office_to_wife';
        }
        return 'office_after_story';
    }
}