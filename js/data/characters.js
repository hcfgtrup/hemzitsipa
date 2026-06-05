export const CharactersData = {
    detective: {
        id: 'detective',
        name: 'Детектив',
        avatar: 'assets/characters/detective.jpg',
        shortDesc: 'Главный герой',
        fullDesc: 'Короткие тёмные волосы, часто растрёпаны. Взгляд тяжелый, всегда оценивает обстановку. Одевается просто: рубашка, пальто или плащ. Всегда выглядит уставшим. Холодный, сдержанный, с чувством иронии.',
        fact: 'Потерял сестру 12 лет назад. Раньше был другим.',
        unlockScene: null,
        isUnlockedByDefault: true
    },
    intern: {
        id: 'intern',
        name: 'Стажёр',
        avatar: 'assets/characters/intern.jpg',
        shortDesc: 'Молодой напарник',
        fullDesc: 'Подтянутый молодой человек 22-26 лет. Не умеет скрывать эмоции. Всегда носит блокнот и ручку. Пытается подражать детективу. Любопытный, задаёт много вопросов.',
        fact: 'Верит, что может изменить мир к лучшему. Высокие моральные ценности.',
        unlockScene: null,
        isUnlockedByDefault: true
    },
    brother: {
        id: 'brother',
        name: 'Брат',
        avatar: 'assets/characters/brother.jpg',
        shortDesc: 'Родственник детектива',
        fullDesc: 'Обаятельный, красноречивый, душа компании. Умеет поддержать любой разговор. Напоминает ГГ о прошлом. Внешне весел, но внутри сломлен.',
        fact: 'То происшествие сломало его. Он давно хотел отомстить.',
        unlockScene: 'brother_meeting',
        isUnlockedByDefault: false
    },
    sister: {
        id: 'sister',
        name: 'Сестра',
        avatar: 'assets/characters/sister.jpg',
        shortDesc: 'Погибла 12 лет назад',
        fullDesc: 'Погибла в аварии 12 лет назад. Водитель был пьян, но адвокат оправдал его. Её смерть — отправная точка всей истории.',
        fact: 'Её смерть изменила всех: детектива, брата, даже убийцу.',
        unlockScene: 'office_story',
        isUnlockedByDefault: false
    },
    villain: {
        id: 'villain',
        name: 'Убийца',
        avatar: 'assets/characters/villain.jpg',
        shortDesc: 'Загадочный убийца',
        fullDesc: 'Личность загадка. Умеет хорошо планировать преступления. Для него важен обряд. Оставляет подсказки. Не переносит хаоса.',
        fact: 'Оставляет знаки. Играет с детективом в игру.',
        unlockScene: 'murder_scene',
        isUnlockedByDefault: false
    },
    lawyer: {
        id: 'lawyer',
        name: 'Адвокат',
        avatar: 'assets/characters/lawyer.jpg',
        shortDesc: 'Пропавший адвокат',
        fullDesc: 'Известный адвокат, один из лучших в своём деле. Оправдал пьяного водителя 12 лет назад.',
        fact: 'Возможно, он не жертва, а часть игры.',
        unlockScene: 'wife_continue',
        isUnlockedByDefault: false
    },
    wife: {
        id: 'wife',
        name: 'Жена адвоката',
        avatar: 'assets/characters/wife.jpg',
        shortDesc: 'Жена пропавшего',
        fullDesc: 'Женщина лет сорока. Выразительные черты лица, аккуратная осанка. Привыкла держать себя уверенно. Раньше работала психологом.',
        fact: 'Последняя, кто видел мужа живым.',
        unlockScene: 'wife_quick',
        isUnlockedByDefault: false
    }
};