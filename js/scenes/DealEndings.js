import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class DealAcceptEndScene extends Scene {
    constructor() {
        super('deal_accept_end');
    }
    
    getText(gameState) {
        return {
            text: `СДЕЛКА ПРИНЯТА

Вы закрыли дело. Объявили, что водителя убил неизвестный, а адвокат вернулся домой сам. Через три дня брат позвонил и сказал, где искать адвоката. Тот был жив, но напуган.

Вы выполнили свою часть сделки. Но игра не закончилась.

Спустя месяц вам пришло новое письмо. Внутри — фотография вашего брата. На обороте: "Ты выбрал лёгкий путь. Но справедливость не терпит компромиссов. Игра продолжается."

Вы проиграли не убийцу. Вы проиграли себя.

КОНЦОВКА: МИССИЯ ПРОВАЛЕНА

Профессионализм: ${gameState.professionalism} | Личные чувства: ${gameState.personalFeelings} | Доверие стажёра: ${gameState.internTrust}`,
            choices: [
                new Choice('reset', 'Начать заново', 'reset', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        return 'reset';
    }
}

export class DealRefuseScene extends Scene {
    constructor() {
        super('deal_refuse_scene');
    }
    
    getText(gameState) {
        return {
            text: `ВЫ ОТКАЗАЛИСЬ ОТ СДЕЛКИ

Вы решили играть по своим правилам.

Через три дня брат позвонил. Вы сказали "нет". Он молча сбросил звонок.

Вы нашли адвоката сами. Он был мёртв. Брат исчез. Игра продолжалась без него.

А через неделю вы получили конверт. Внутри — пуля и записка: "Ты следующий, брат."

Вы начали охоту на собственного брата. Но успеете ли вы его остановить до того, как он остановит вас?

КОНЕЦ ПЕРВОЙ ЧАСТИ

Продолжение следует...

Профессионализм: ${gameState.professionalism} | Личные чувства: ${gameState.personalFeelings} | Доверие стажёра: ${gameState.internTrust}`,
            choices: [
                new Choice('reset', 'Начать заново', 'reset', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        return 'reset';
    }
}