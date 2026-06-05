import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class CabinetScene extends Scene {
    constructor() {
        super('cabinet_search');
    }
    
    getText(gameState) {
        const papersChecked = gameState.getFlag('cabinet_papers_checked');
        const hideoutsChecked = gameState.getFlag('cabinet_hideouts_checked');
        const safeChecked = gameState.getFlag('cabinet_safe_checked');
        
        if (papersChecked && hideoutsChecked && safeChecked) {
            gameState.setFlag('cabinet_searched', true);
            return {
                text: `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

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

— Вы не против, если мы здесь немного осмотримся?

Вы тщательно осмотрели всё в кабинете адвоката: бумаги на столе, тайники в комнате и сейф. Улик достаточно, чтобы двигаться дальше.

— Пора возвращаться, — сказали вы стажёру. — У нас есть всё, чтобы продолжить расследование.`,
                choices: [
                    new Choice('back_to_brother', 'Вернуться к брату', 'brother_meeting', {})
                ]
            };
        }
        
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

— Вы не против, если мы здесь немного осмотримся?

`;

        if (papersChecked) {
            text += `\n✓ Бумаги на столе уже осмотрены.`;
        }
        if (hideoutsChecked) {
            text += `\n✓ Тайники в комнате уже найдены.`;
        }
        if (safeChecked) {
            text += `\n✓ Сейф уже открыт и осмотрен.`;
        }

        text += `\n\nЧто будем делать?`;

        const choices = [];
        
        if (!papersChecked) {
            choices.push(new Choice('check_papers', 'Проверить бумаги на столе', 'full_search_scene', {}));
        }
        
        if (!hideoutsChecked) {
            choices.push(new Choice('find_hideouts', 'Искать тайники в комнате', 'hideouts_scene', {}));
        }
        
        if (!safeChecked) {
            choices.push(new Choice('open_safe', 'Осмотреть сейф', 'safe_scene', {}));
        }
        
        choices.push(new Choice('finish_search', 'Завершить осмотр и вернуться к брату', 'brother_meeting', {}));
        
        return {
            text: text,
            choices: choices
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        if (choiceId === 'check_papers') return 'full_search_scene';
        if (choiceId === 'find_hideouts') return 'hideouts_scene';
        if (choiceId === 'open_safe') return 'safe_scene';
        if (choiceId === 'back_to_brother') return 'brother_meeting';
        if (choiceId === 'finish_search') {
            const papersChecked = gameState.getFlag('cabinet_papers_checked');
            const hideoutsChecked = gameState.getFlag('cabinet_hideouts_checked');
            const safeChecked = gameState.getFlag('cabinet_safe_checked');
            
            let missed = 0;
            if (!papersChecked) missed++;
            if (!hideoutsChecked) missed++;
            if (!safeChecked) missed++;
            
            if (missed === 1) {
                gameState.updateStats({ professionalism: -1 });
            } else if (missed >= 2) {
                gameState.updateStats({ professionalism: -2 });
            }
            
            gameState.setFlag('cabinet_searched', true);
            
            return 'brother_meeting';
        }
        return 'cabinet_search';
    }
}