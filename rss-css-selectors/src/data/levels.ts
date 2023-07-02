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
        html: [
            { tag: 'cup', class: 'cup', index: '1', tooltip: '<cup><cup/>' },
            { tag: 'cup', class: 'cup', index: '2', tooltip: '<cup><cup/>' },
        ],
        htmlContent: ['<cup data-index="1">&lt;cup&gt;<cup/><br>', '<cup data-index="2">&lt;cup&gt;<cup/>'],
        answer: 'cup',
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
        html: [
            { tag: 'cup', class: 'cup', index: '1', tooltip: '<cup><cup/>' },
            {
                tag: 'cup',
                class: 'cup',
                id: 'star',
                child: 'star',
                childClass: 'star',
                index: '2',
                childIndex: '3',
                tooltip: '<cup><cup/>',
                childTooltip: '<star id="star"></star>',
            },
            { tag: 'cup', class: 'cup', index: '4', tooltip: '<cup><cup/>' },
        ],
        htmlContent: [
            '<cup data-index="1">&lt;cup&gt;<cup/><br>',
            '<cup data-index="2">&lt;cup&gt;<br><star data-index="3">&lt;star id="star"&gt;</star><br>&lt;cup/&gt;<cup/><br>',
            '<cup data-index="4">&lt;cup&gt;<cup/><br>',
        ],
        answer: '#star',
    },
    // {
    //     id: 3,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 4,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 5,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 6,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 7,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 8,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 9,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 10,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 11,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
    // {
    //     id: 12,
    //     name: 'Class selector',
    //     type: '.class',
    //     description:
    //         'Селекторы классов — это выборка элементов, по значению глобального атрибута class="". В селекторе класса (class), в качестве селектора, выступает имя класса',
    //     example:
    //         'Например мы можем обратиться к элементу <div class="main"> используя селектор класса так - .main {color: blue;}',
    //     task: 'Задание: выберите все белые чашки используя классовый селектор',
    //     html: [{ tag: 'cup', child: 'star' }, { tag: 'cup', child: 'star', childClass: '.star' }, { tag: 'cup' }],
    //     htmlContent: [['<cup>', '<star/>', '</cup>'], ['<cup>', '<star class="star"/>', '</cup>'], '<cup/>'],
    //     answer: '.star',
    // },
];
export default levels;
