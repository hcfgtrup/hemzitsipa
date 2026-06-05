import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class GameOverScene extends Scene {
    constructor() {
        super('game_over');
    }
    
    getText(gameState) {
        let title = '';
        let message = '';
        
        switch (gameState.gameOverReason) {
            case 'professionalism':
                title = '🔻 ПРОФЕССИОНАЛИЗМ УТЕРЯН';
                message = `Ваши профессиональные навыки и так вызывали вопросы у руководства. После серии ошибок и провалов в расследовании вы были уволены. Вам запрещено работать в этой сфере, за вами установлено наблюдение.

**Игра окончена.**`;
                break;
            case 'feelings':
                title = '💔 ЛИЧНЫЕ ЧУВСТВА ИСЧЕРПАНЫ';
                message = `Вы перестали чувствовать. Эмоции больше не управляют вами — ни сострадание, ни гнев, ни страх. Вы стали машиной, но бездушный детектив не способен понять преступника. Расследование зашло в тупик.

**Игра окончена.**`;
                break;
            case 'trust':
                title = '🔒 ДОВЕРИЕ ПОТЕРЯНО';
                message = `Люди больше не верят вам. Стажёр подал рапорт о переводе, информаторы отказываются говорить, коллеги сторонятся вас. Без доверия вы не можете получать новую информацию и продвигаться в деле.

**Игра окончена.**`;
                break;
            default:
                title = '⛔ ИГРА ОКОНЧЕНА';
                message = `Вы проиграли. Попробуйте начать заново и принимайте более взвешенные решения.`;
        }
        
        return {
            text: `# ${title}

${message}`,
            choices: [
                new Choice('reset', '🔄 Начать заново', 'reset', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        return 'reset';
    }
}