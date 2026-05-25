import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class OfficeScene extends Scene {
    constructor() {
        super('office');
    }
    
    getText(gameState) {
        let text = `<img src="assets/locations/office.jpg" class="location-image" alt="Кабинет детектива">

Стажёр вернулся с кофе. Он сел рядом и попытался повторить вашу позу.

— Извините, а это разве не ваша фамилия? — спросил он, указывая на дело 12-летней давности.

`;

        if (!gameState.getFlag('told_story')) {
            text += `— Моя сестра погибла в тот день. Водитель был пьян, но адвокат его оправдал.

— Но это же несправедливо! — возмутился стажёр.`;
            gameState.setFlag('told_story', true);
        } else {
            text += `— Тебя это не касается, — отрезали вы.`;
        }
        
        if (!gameState.getFlag('envy_monologue')) {
            text += `\n\n— Знаешь... — вы немного замялись. — Я даже немного завидую таким людям, как ты.

Стажёр вопросительно посмотрел на вас.

— Старый, опытный работник завидует новичку. Ты мне напоминаешь моего брата. Тот же взгляд. Как будто веришь, что мир можно подчинить правилам.

— Может... у вас это всё не исчезло, а просто спряталось где-то внутри, — тихо сказал стажёр.

— Не обольщайся. Некоторые вещи не прячутся. Они просто умирают.`;
            gameState.setFlag('envy_monologue', true);
        }
        
        return {
            text: text,
            choices: [
                new Choice('go_to_wife', '🔍 Ехать к жене пропавшего', 'wife_interview', {}),
                new Choice('stay_silent', '🤐 Промолчать', 'bad_ending_promolchat', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'go_to_wife') return 'wife_interview';
        if (choiceId === 'stay_silent') return 'bad_ending_promolchat';
        return 'office';
    }
}