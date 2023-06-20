import { LevelObject } from '../interfaces/interfaces';

const levels: Array<LevelObject> = [
    {
        id: 1,
        name: 'Tag selector',
        type: '<tag>',
        description:
            'Добро пожаловать в Coffee Shop — место, где вы напишете CSS-код, чтобы выпить чашечку кофе. Начнём с самого простого. Селекторы тега — это выборка элементов по именам их тегов: h1, p, img, a и т.д. В селекторе тега, в качестве селектора выступает имя тега',
        example: 'Например, чтобы изменить цвет текста у заголовка, нужно обратиться к нему так - h1 {color: blue;}',
        task: 'Задание: выберите все белые чашки используя селектор тега',
        html: [{ tag: 'cup', class: '', id: '', child: 'star', childClass: '', childId: '' }],
    },
    {
        id: 2,
        name: 'Id selector',
        type: '#id',
        description:
            'Селектор id — это выборка элементов, по значению глобального атрибута id="". В селекторе id, в качестве селектора, выступает имя уникального идентификатора',
        example:
            'Например, мы можем обратиться к элементу <div id="main"> используя id селектор так - #main {color: blue;}',
        task: 'Задание: выберите все белые чашки используя id селектор',
        html: [{ tag: 'cup' }, { tag: 'cup', class: 'coffe', child: 'star' }],
        // html: ['cup', 'star', 'cup'],
    },
    {
        id: 3,
        name: 'Class selector',
        type: '.class',
        description:
            'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
        example:
            'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
        task: 'Задание: выберите все белые чашки используя классовый селектор',
        // html: ['cup', 'cup', 'cup'],
        html: [{ tag: 'cup', class: '', id: '', child: 'star', childClass: '', childId: '' }],
    },
];
export default levels;
