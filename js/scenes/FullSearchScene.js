import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class FullSearchScene extends Scene {
    constructor() {
        super('full_search_scene');
    }
    
    getText(gameState) {
        if (gameState.getFlag('paper_puzzle_solved')) {
            gameState.setFlag('cabinet_papers_checked', true);
            
            let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Я сел за стол адвоката и начал перебирать бумаги. Стажёр встал рядом, заглядывая через плечо. Женщина молча стояла у двери, наблюдая.

Ничего особенного. Судебные запросы, старые дела, распечатки законов. Я уже хотел отложить папку, как вдруг заметил лист, выпавший из общей стопки.

Он лежал отдельно. Будто его специально положили сверху.

На листе — список. Десять фамилий. Моя сестра — первая. Адвокат — вторая. Водитель — третья.

И четвёртая — моя.

— Сэр, — стажёр побледнел, — это же...

— Список, — закончил я. — Список тех, кто связан с тем делом.

— Но вы... вы же не были причастны.

Я покачал головой.

— Был. Я был свидетелем. Единственным, кто мог дать показания против водителя.

— И вы... не дали?

Я промолчал. Воспоминания нахлынули — больничная палата, следователь, который уговаривал меня подписать бумаги. Я был ребёнком. Я испугался. Я подписал.

— Я не дал, — сказал я тихо. — Потому что мне сказали, что это ничего не изменит.

— Кто сказал?

Я посмотрел на фамилию под номером десять.

Там было имя моего брата.

— Не важно, — сказал я, вставая. — Забираем всё. Каждый лист. Каждую бумажку.

Женщина попыталась возразить, но я её не слушал. Я вышел из кабинета и спустился вниз. Стажёр догнал меня уже на улице.

— Сэр, что будем делать?

— Ехать к брату, — ответил я. — И задать ему один вопрос.

Мы сели в машину. Я завёл двигатель и уже хотел тронуться, как заметил на лобовом стекле маленький конверт. Под стеклоочистителем.

Я вышел, взял его. Внутри — одна фраза:

«Если спросишь брата — он умрёт. Выбирай: правда или его жизнь.»

Я поднял голову и огляделся. Никого. Только пустая улица, фонари и тишина.

— Сэр, — стажёр вышел из машины, — что там?

Я протянул ему записку. Он прочитал и побледнел ещё сильнее.

— Это провокация, — сказал он. — Кто-то хочет, чтобы вы перестали доверять брату.

— Или кто-то хочет, чтобы я не лез в прошлое, — ответил я. — Потому что там правда, которую я не готов услышать.

Я сел обратно в машину. Посмотрел на список, который держал в руке. На свою фамилию. На имя брата.

— Мы не поедем к нему, — сказал я наконец. — Пока не узнаем, кто написал эту записку.

— А если он в опасности?

— Тогда я успею, — соврал я. Сам в это не веря.

Мы поехали в офис. Всю дорогу я молчал. Думал. И в голову лезли только вопросы: почему брат в списке? Почему десятый? И что я забыл двенадцать лет назад?`;

            return {
                text: text,
                choices: [
                    new Choice('back_to_cabinet', 'Вернуться к осмотру кабинета', 'cabinet_search', {})
                ]
            };
        }
        
        const wrongAttempts = gameState.getFlag('paper_wrong_attempts') || [];
        
        let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Я сел за стол адвоката и начал перебирать бумаги. Стажёр встал рядом, заглядывая через плечо. Женщина молча стояла у двери, наблюдая.

Ничего особенного. Судебные запросы, старые дела, распечатки законов, личные бумаги и записи. В глаза бросилось только три листа.

---

**ГОЛОВОЛОМКА: ТАЙНА ТРЁХ ЛИСТОВ**

Какой из листов, вероятнее всего, связан с убийством?`;

        const choices = [];
        
        if (!wrongAttempts.includes('1')) {
            choices.push(new Choice('paper_wrong1', '1. Вырванная из журнала статья о личной жизни местной знаменитости', 'full_search_scene', {}));
        }
        
        choices.push(new Choice('paper_correct', '2. Судебная повестка', 'full_search_scene', {}));
        
        if (!wrongAttempts.includes('3')) {
            choices.push(new Choice('paper_wrong2', '3. Выписка из больницы 5-летней давности', 'full_search_scene', {}));
        }
        
        if (wrongAttempts.includes('1') && wrongAttempts.includes('3')) {
            text += `\n\n*Остался только один вариант...*`;
        }
        
        return {
            text: text,
            choices: choices
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        const wrongAttempts = gameState.getFlag('paper_wrong_attempts') || [];
        
        if (choiceId === 'paper_correct') {
            gameState.setFlag('paper_puzzle_solved', true);
            gameState.setFlag('cabinet_papers_checked', true);
            if (wrongAttempts.length === 0) {
                gameState.updateStats({ professionalism: 2 });
            }
            return 'full_search_scene';
        }
        
        if (choiceId === 'paper_wrong1') {
            if (!wrongAttempts.includes('1')) {
                wrongAttempts.push('1');
                gameState.setFlag('paper_wrong_attempts', wrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Этот лист — обычная жёлтая пресса, не имеющая отношения к делу. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'full_search_scene';
        }
        
        if (choiceId === 'paper_wrong2') {
            if (!wrongAttempts.includes('3')) {
                wrongAttempts.push('3');
                gameState.setFlag('paper_wrong_attempts', wrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Старая выписка из больницы, возможно, не относится к текущему делу. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'full_search_scene';
        }
        
        if (choiceId === 'back_to_cabinet') return 'cabinet_search';
        return 'full_search_scene';
    }
}