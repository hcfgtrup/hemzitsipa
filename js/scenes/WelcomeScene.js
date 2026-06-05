import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class WelcomeScene extends Scene {
    constructor() {
        super('welcome');
    }
    
    getText(gameState) {
        const playerName = gameState.playerName || 'ДЕТЕКТИВ';
        
        let text = `**Добро пожаловать, детектив ${playerName}.**

Вы — опытный следователь, которому поручили новое дело. Пропал известный адвокат. Ни следов, ни свидетелей, ни зацепок. Только загадочная фраза: *«Игра началась»*.

Но будьте осторожны. Каждое ваше решение влияет на исход событий.


Три основные характеристики:

**📋 ПРОФЕССИОНАЛИЗМ**
Ваше умение вести расследование, находить улики и делать правильные выводы.

**❤️ ЛИЧНЫЕ ЧУВСТВА**
Ваша способность сопереживать, понимать эмоции других и сохранять человечность.

**🤝 ДОВЕРИЕ**
Отношение к вам стажёра, коллег и свидетелей. Без доверия вы не получите важную информацию.

Следите за своими характеристиками. Если любая из них упадёт ниже нуля — игра для вас закончится.

Удачи, детектив. Игра начинается.`;

        return {
            text: text,
            choices: [
                new Choice('start_investigation', 'НАЧАТЬ РАССЛЕДОВАНИЕ', 'start', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'start_investigation') return 'start';
        return 'welcome';
    }
}