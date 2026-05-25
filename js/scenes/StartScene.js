import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class StartScene extends Scene {
    constructor() {
        super('start');
    }
    
    getText(gameState) {
        let text = `☀️ День выдался солнечный. Ленивый свет пробивался сквозь жалюзи, полосами ложась на стол, заваленный папками.

Вы сидели за столом, разглядывая папку с отчётами, когда в дверь осторожно постучали.

— Войдите, — бросили вы, не поднимая взгляда.

Дверь приоткрылась, и в кабинет просунулся молодой парень — стажёр. Неловкий, в слишком новом пиджаке, с папкой под мышкой.

— Эм... начальник, у нас новое дело. Сказали, что передать нужно вам.

Вы наконец подняли глаза. Парень выглядел так, будто только вчера вышел из университета.

— Я же просил обращаться ко мне как "Шеф", — сказали вы.

— Простите, шеф. Дело №294 — розыск без вести пропавшего. Пропал адвокат Михаил Белозёров. Данных очень мало. Ушёл на работу, но до места не дошёл.

— Может, сходим к его жене? Она ведь последняя его видела, — предложил стажёр.`;

        return {
            text: text,
            choices: [
                new Choice('collect_data', '📊 "Это само собой, но для начала я бы собрал данные о нём"', 'office', { professionalism: 1 }),
                new Choice('ask_wife', '🚪 "Уверен? Ладно, поехали"', 'wife_interview', {}),
                new Choice('coffee_first', '☕ "Сделаем, но чуть позже, а пока принеси мне кофе"', 'office', {})
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'collect_data') return 'office';
        if (choiceId === 'ask_wife') return 'wife_interview';
        if (choiceId === 'coffee_first') return 'office';
        return 'start';
    }
}