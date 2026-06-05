import { Scene } from './Scene.js';
import { Choice } from '../models/Choice.js';

export class SafeScene extends Scene {
    constructor() {
        super('safe_scene');
    }
    
    getText(gameState) {
        if (gameState.getFlag('letter_puzzle_solved')) {
            gameState.setFlag('cabinet_safe_checked', true);
            gameState.setFlag('safe_searched', true);
            
            let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Я открыл сейф. Внутри, среди пыльных папок и старых квитанций, лежал конверт. Не запечатанный. На нём — моё имя.

Я взял его дрожащими пальцами.

— Сэр, — стажёр подошёл ближе, — это...

— Моё имя, — закончил я. — Я вижу.

В конверте оказалась фотография. Моя. Сделанная сегодня. Я узнал угол улицы — парковка у офиса. И время — утро, когда я заходил в здание.

На обороте — надпись, выведенная аккуратным почерком:

«Ты не ищешь убийцу. Ты ищешь себя. Игра закончится, когда ты вспомнишь, что забыл 12 лет назад.»

Я перечитал эту фразу пять раз. Шестой — вслух, чтобы стажёр тоже услышал.

— Что это значит? — спросил новичок.

— Не знаю, — ответил я, хотя внутри что-то ёкнуло. — Но я собираюсь выяснить.

Мы обыскали весь кабинет. Больше ничего. Ни телефона, ни флешек, ни оружия. Только конверт с моим именем и фотография.

Когда мы вышли из дома, уже светало. Я сел в машину и долго сидел, не заводя двигатель.

— Сэр, вам плохо? — стажёр осторожно коснулся моего плеча.

— Я не помню, — сказал я тихо. — Двенадцать лет назад, после смерти сестры... была неделя, которую я не помню.

— Как — не помните?

— Провал. Врачи сказали — стресс, защитная реакция. Я тогда не придал значения. А теперь...

Я замолчал. В голове всплывали обрывки: больничная палата, чьи-то слёзы, тёмная комната. И голос. Чей-то голос, который шептал: «Ты обещал. Ты не имеешь права забыть.»

— Мне нужно найти того, кто это написал, — сказал я, сжимая конверт в руке. — И узнать, что я забыл.

— С чего начнём?

— С больницы. С врачей. С двенадцатилетней давности.

Я завёл машину. В зеркале заднего вида отражался дом, из которого мы только что вышли. В окне второго этажа, в кабинете, горел свет.

— Я ведь выключил там свет, — сказал я.

— Выключили, — подтвердил стажёр, обернувшись.

Мы оба посмотрели на окно. Свет погас.

А затем на стекле проявилась надпись — будто кто-то дышал на холодное стекло и рисовал пальцем:

«Следи за стажёром.»

Я резко нажал на газ. Машина рванула с места.

— Сэр, что случилось?

— Ничего, — соврал я. — Просто показалось.

Но до самого утра я не мог выбросить из головы эту надпись. И вопрос: кому из нас двоих на самом деле угрожает опасность?`;

            return {
                text: text,
                choices: [
                    new Choice('back_to_cabinet', 'Вернуться к осмотру кабинета', 'cabinet_search', {})
                ]
            };
        }
        
        if (gameState.getFlag('safe_puzzle_solved')) {
            const letterWrongAttempts = gameState.getFlag('letter_wrong_attempts') || [];
            
            let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Щелчок! Сейф открылся. Внутри — несколько фотографий, старый диктофон и сложенный в несколько раз лист бумаги.

Я открыл сейф. Внутри, среди пыльных папок и старых квитанций, лежал конверт. Не запечатанный.

---

**ГОЛОВОЛОМКА: ЗАШИФРОВАННОЕ ПИСЬМО**

Разгадайте шифр, чтобы узнать, что было написано на письме:

5-6-20-6-12-20-10-3-21

Каждая пара чисел — позиция буквы в алфавите (А=1, Б=2, В=3...). Что написано?`;

            const choices = [];
            
            if (!letterWrongAttempts.includes('АДВОКАТУ')) {
                choices.push(new Choice('letter_wrong_lawyer', '1. АДВОКАТУ', 'safe_scene', {}));
            }
            choices.push(new Choice('letter_correct', '2. ДЕТЕКТИВУ', 'safe_scene', {}));
            if (!letterWrongAttempts.includes('ПОЛИЦИИ')) {
                choices.push(new Choice('letter_wrong_police', '3. ПОЛИЦИИ', 'safe_scene', {}));
            }
            
            if (letterWrongAttempts.includes('АДВОКАТУ') && letterWrongAttempts.includes('ПОЛИЦИИ')) {
                text += `\n\n*Остался только один вариант...*`;
            }
            
            return {
                text: text,
                choices: choices
            };
        }
        
        const safeWrongAttempts = gameState.getFlag('safe_wrong_attempts') || [];
        
        let text = `<img src="assets/locations/cabinet.jpg" class="location-image" alt="Кабинет адвоката">

Я подошёл к плинтусу в углу комнаты. Одна секция отходила от стены — будто её недавно отдирали и приставили обратно.

Я нажал на плинтус. Он отошёл. За ним — небольшая ниша. В нише — металлическая коробка.

Я достал её. Коробка оказалась заперта.

---

**ГОЛОВОЛОМКА: ШИФР ДЛЯ СЕЙФА**

Отгадайте шифр из 4 цифр.

Условия:
• Первая цифра на 2 больше второй
• Третья цифра на 2 меньше четвёртой
• Сумма всех цифр равна 24
• Первая и третья — чётные

Введите 4-значный код:`;

        const choices = [];
        
        if (!safeWrongAttempts.includes('6846')) {
            choices.push(new Choice('safe_wrong_6846', '1. 6846', 'safe_scene', {}));
        }
        choices.push(new Choice('safe_correct', '2. 8646', 'safe_scene', {}));
        if (!safeWrongAttempts.includes('9757')) {
            choices.push(new Choice('safe_wrong_9757', '3. 9757', 'safe_scene', {}));
        }
        
        if (safeWrongAttempts.includes('6846') && safeWrongAttempts.includes('9757')) {
            text += `\n\n*Остался только один вариант...*`;
        }

        return {
            text: text,
            choices: choices
        };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        const safeWrongAttempts = gameState.getFlag('safe_wrong_attempts') || [];
        
        if (choiceId === 'safe_correct') {
            gameState.setFlag('safe_puzzle_solved', true);
            if (safeWrongAttempts.length === 0) {
                gameState.updateStats({ professionalism: 2 });
            }
            return 'safe_scene';
        }
        
        if (choiceId === 'safe_wrong_6846') {
            if (!safeWrongAttempts.includes('6846')) {
                safeWrongAttempts.push('6846');
                gameState.setFlag('safe_wrong_attempts', safeWrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Код 6846 не подходит. Проверьте сумму цифр и условия. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'safe_scene';
        }
        
        if (choiceId === 'safe_wrong_9757') {
            if (!safeWrongAttempts.includes('9757')) {
                safeWrongAttempts.push('9757');
                gameState.setFlag('safe_wrong_attempts', safeWrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Код 9757 не подходит. Первая и третья цифры должны быть чётными. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'safe_scene';
        }
        
        const letterWrongAttempts = gameState.getFlag('letter_wrong_attempts') || [];
        
        if (choiceId === 'letter_correct') {
            gameState.setFlag('letter_puzzle_solved', true);
            if (letterWrongAttempts.length === 0) {
                gameState.updateStats({ professionalism: 2 });
            }
            return 'safe_scene';
        }
        
        if (choiceId === 'letter_wrong_lawyer') {
            if (!letterWrongAttempts.includes('АДВОКАТУ')) {
                letterWrongAttempts.push('АДВОКАТУ');
                gameState.setFlag('letter_wrong_attempts', letterWrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Расшифровка "АДВОКАТУ"? 5=Д, 6=Е, 20=Т, 6=Е, 12=К, 20=Т, 10=И, 3=В, 21=У — получается "ДЕТЕКТИВУ". АДВОКАТУ не получается. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'safe_scene';
        }
        
        if (choiceId === 'letter_wrong_police') {
            if (!letterWrongAttempts.includes('ПОЛИЦИИ')) {
                letterWrongAttempts.push('ПОЛИЦИИ');
                gameState.setFlag('letter_wrong_attempts', letterWrongAttempts);
                gameState.setFlag('last_puzzle_wrong_message', '❌ НЕВЕРНО! Расшифровка "ПОЛИЦИИ"? Не подходит. Подумайте, кому адресовано письмо. Профессионализм понижен.');
                gameState.updateStats({ professionalism: -1 });
            }
            return 'safe_scene';
        }
        
        if (choiceId === 'back_to_cabinet') return 'cabinet_search';
        return 'safe_scene';
    }
}