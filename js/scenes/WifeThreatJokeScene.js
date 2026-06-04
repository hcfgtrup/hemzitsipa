import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class WifeThreatJokeScene extends Scene {
    constructor() {
        super('wife_threat_joke');
    }
    
    getText(gameState) {
        let text = `<img src="assets/locations/wife_apartment.jpg" class="location-image" alt="Квартира жены адвоката">

— Скорее всего, чья-то глупая шутка, — сказал я, стараясь, чтобы голос звучал ровно и уверенно. — Не переживайте, мы проверим. Такое иногда случается — люди пишут анонимки, пугают, а на деле за этим ничего нет.

Женщина выдохнула. Её плечи чуть опустились, напряжение немного спало.

— Вы думаете? — спросила она с надеждой.

— Уверен на девяносто процентов, — соврал я с лёгкой улыбкой. — Остальные десять — наша работа. Мы во всём разберёмся.

Стажёр бросил на меня быстрый взгляд. Я едва заметно качнул головой — молчи.

— Спасибо, — женщина провела ладонью по лицу. — Последние дни я так накрутила себя... Думала, что с ним случилось что-то ужасное.

— Мы найдём вашего мужа, — сказал я. — Обещаю.

Она слабо улыбнулась.

— Что вы хотите узнать?`;

        return {
            text: text,
            choices: [
                new Choice('ask_details', 'Спросить о деталях последнего дня мужа', 'wife_details', { professionalism: 1 }),
                new Choice('show_cabinet', 'Попросить показать кабинет мужа', 'cabinet_search', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'ask_details') return 'wife_details';
        if (choiceId === 'show_cabinet') return 'cabinet_search';
        return 'wife_threat_joke';
    }
}