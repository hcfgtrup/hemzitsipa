import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class FullSearchScene extends Scene {
    constructor() {
        super('full_search_scene');
    }
    
    getText(gameState) {
        gameState.setFlag('full_search_done', true);
        
        let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Вы начали обыскивать кабинет. Стажёр простукивал стены, вы проверяли стол.

`;

        if (!gameState.getFlag('papers_found')) {
            text += `На столе вы нашли отдельный лист. Список из десяти фамилий. Ваша сестра — первая. Адвокат — вторая. Водитель — третья.

И четвёртая — **ваша**. А десятая — **имя вашего брата**.

— Сэр... — стажёр побледнел.

— Забираем всё, — сказали вы.`;
            gameState.setFlag('papers_found', true);
        }
        
        if (!gameState.getFlag('hideout_found')) {
            text += `\n\nВ плинтусе, у дальней стены, нашлась ниша. В нише — металлическая коробка.

Внутри: фотографии слежки за вами и стажёром, старый диктофон и письмо.

На диктофоне голос: *«Адвокат получил предупреждение. Он не послушал. Следующий — тот, кто подписал ложные показания.»*

Письмо от адвоката: *«Если вы это читаете — меня уже нет в живых. Тот, кто начал игру, знает, что вы подписали ложные показания. Он считает вас виновным.»*`;
            gameState.setFlag('hideout_found', true);
        }
        
        if (!gameState.getFlag('safe_searched')) {
            text += `\n\nВы ещё не заглядывали в сейф.`;
            return {
                text: text,
                choices: [
                    new Choice('check_safe', '🔐 Осмотреть сейф', 'safe_scene', {})
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
        if (choiceId === 'check_safe') return 'safe_scene';
        if (choiceId === 'back_to_brother') return 'brother_meeting';
        return 'full_search_scene';
    }
}