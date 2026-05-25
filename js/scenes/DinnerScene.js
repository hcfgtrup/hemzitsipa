import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class DinnerAgreeScene extends Scene {
    constructor() {
        super('dinner_agree');
    }
    
    getText(gameState) {
        if (!gameState.getFlag('dinner_completed')) {
            gameState.setFlag('dinner_completed', true);
        }
        
        let text = `<img src="assets/locations/restaurant.jpg" class="location-image" alt="Ресторан">

Я посмотрел на новичка, затем снова на брата.

— Я не против.

— Отлично. А стажёр? — брат улыбнулся.

— Я тоже не против, — неуверенно ответил новичок.

— Тогда договорились. Я напишу адрес.

Мы ещё какое-то время сидели и разговаривали. Брат рассказал о своём путешествии.

Вечером мы встретились в уютном ресторане. Разговор шёл легко, но вас не покидало чувство, что брат что-то недоговаривает.

После ужина он подвёз вас домой.

— Завтра продолжим расследование, — сказали вы стажёру.`;
        
        return {
            text: text,
            choices: [
                new Choice('continue_after_dinner', '🔍 Продолжить расследование', 'cipher_scene', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'continue_after_dinner') return 'cipher_scene';
        return 'dinner_agree';
    }
}

export class DinnerDeclineScene extends Scene {
    constructor() {
        super('dinner_decline');
    }
    
    getText(gameState) {
        if (!gameState.getFlag('dinner_completed')) {
            gameState.setFlag('dinner_completed', true);
        }
        
        let text = `— Извини, но у нас дела.

— Да ладно вам. Дела делами, но отдыхать ведь тоже нужно.

— Нужно, — согласился я. — Но мы отдохнём позже.

Брат пожал плечами:
— Как хотите. Я предлагал.

После его ухода вы задумались. Самодовольная улыбка брата не выходила из головы. Что-то в его поведении было не так.

— Поехали в офис, — сказали вы стажёру. — Нужно работать.`;
        
        return {
            text: text,
            choices: [
                new Choice('continue_after_dinner', '🔍 Продолжить расследование', 'cipher_scene', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'continue_after_dinner') return 'cipher_scene';
        return 'dinner_decline';
    }
}