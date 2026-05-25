import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class JokeScene extends Scene {
    constructor() {
        super('joke_scene');
    }
    
    getText(gameState) {
        return {
            text: `<img src="assets/locations/wife_apartment.jpg" class="location-image" alt="Квартира жены адвоката">

— Скорее всего, чья-то глупая шутка, — сказали вы. — Не переживайте, мы проверим.

Женщина выдохнула, напряжение спало.

— Спасибо, — сказала она. — Последние дни я так накрутила себя...

— Расскажите подробнее о том утре, когда он ушёл, — попросили вы.

Она рассказала, что муж проснулся раньше обычного, долго был в ванной, не позавтракал. И взял документы из сейфа — чего раньше никогда не делал.

— Можете показать кабинет?

Она провела вас в кабинет мужа. Вы осмотрели сейф — внутри был конверт с вашей фотографией.

— Сэр... — стажёр побледнел.

— Забираем, — сказали вы.

Вы обыскали кабинет, нашли тайник с фотографиями слежки и письмо от адвоката.

— Похоже, это не шутка, — признали вы.

Женщина смотрела на вас с ужасом.

— Что мне делать?

— Оставайтесь дома. Никуда не выходите. Мы разберёмся.`,
            choices: [
                new Choice('after_joke', '🚗 Вернуться в офис', 'brother_meeting', { professionalism: 1 })
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'after_joke') return 'brother_meeting';
        return 'joke_scene';
    }
}