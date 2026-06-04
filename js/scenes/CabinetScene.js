import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class CabinetScene extends Scene {
    constructor() {
        super('cabinet_search');
    }
    
    getText(gameState) {
        let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

— Не могли бы вы показать нам кабинет мужа? — спросил я, вставая. — Иногда обстановка может подсказать то, что человек не говорит словами.

Женщина колебалась секунду, затем кивнула.

— Хорошо. Идёмте.

Она провела нас на второй этаж. Кабинет оказался просторной комнатой с высокими потолками. Дубовый стол, кожаное кресло, несколько шкафов с папками. В углу — небольшой сейф, вделанный в стену. Дверца сейфа была приоткрыта.

— Он так и стоял открытым? — спросил я, кивая на сейф.

— Да, — ответила женщина. — Я сначала подумала, что он просто забыл его закрыть. Но теперь... теперь не знаю.

Я подошёл к сейфу и заглянул внутрь. Пусто. Совсем пусто — будто кто-то выгреб всё до последней бумажки.

— Что там обычно хранилось? — спросил я.

— Документы. Деньги. Запасные ключи. Домашняя бухгалтерия. Ничего особенного.

— Кроме сегодняшнего утра, вы не замечали, чтобы он открывал сейф?

— Нет. Вообще нет. Он его почти не трогал.

Я отошёл от сейфа и оглядел комнату.

— Вы не против, если мы здесь немного осмотримся?`;

        return {
            text: text,
            choices: [
                new Choice('check_papers', 'Проверить бумаги на столе', 'full_search_scene', {}),
                new Choice('find_hideouts', 'Искать тайники', 'hideouts_scene', { professionalism: 1 })
            ]
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'check_papers') return 'full_search_scene';
        if (choiceId === 'find_hideouts') return 'hideouts_scene';
        return 'cabinet_search';
    }
}