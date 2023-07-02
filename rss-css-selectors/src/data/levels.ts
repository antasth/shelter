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
        target: [1, 2],
        answer: ['cup'],
    },
    {
        id: 2,
        name: 'Id selector',
        type: '#id',
        description:
            'Селектор id — это выборка элементов, по значению глобального атрибута id="". В селекторе id, в качестве селектора, выступает имя уникального идентификатора',
        example:
            'Например, мы можем обратиться к элементу <div id="main"> используя id селектор так - #main {color: blue;}',
        task: 'Задание: выберите звезду используя id селектор',
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
        target: [3],
        answer: ['#star'],
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
        html: [
            {
                tag: 'cup',
                class: 'cup',
                id: 'star',
                child: 'star',
                childClass: 'star',
                index: '1',
                childIndex: '2',
                tooltip: '<cup><cup/>',
                childTooltip: '<star id="star"></star>',
            },
            {
                tag: 'cup',
                class: 'cup',
                id: 'star',
                child: 'star',
                childClass: 'star',
                index: '3',
                childIndex: '4',
                tooltip: '<cup><cup/>',
                childTooltip: '<star id="star"></star>',
            },
            { tag: 'cup', class: 'cup', index: '5', tooltip: '<cup><cup/>' },
        ],
        htmlContent: [
            '<cup data-index="1">&lt;cup&gt;<br><star data-index="2">&lt;star id="star"&gt;</star><br>&lt;cup/&gt;<cup/><br>',
            '<cup data-index="3">&lt;cup&gt;<br><star data-index="4">&lt;star id="star"&gt;</star><br>&lt;cup/&gt;<cup/><br>',
            '<cup data-index="5">&lt;cup&gt;<cup/><br>',
        ],
        target: [1, 3, 5],
        answer: ['.star'],
    },
    {
        id: 4,
        name: 'Сombined selectors',
        type: '<tag> #id .class',
        description:
            'Иногда при написании стилей мы хотим обратиться к селектору более точно, чем просто по имени класса или тега. Для этого можно использовать различные комбинации.',
        example:
            'Например мы можем обратиться к каждому элементу <div class="main"> и <p>text</p> используя 2 селектора так - .main { color: blue; } p { color: blue; }, a могли бы сделать это так .main, p {color: blue;}',
        task: 'Задание: выберите бумажный стакан и звезду на последней чашке используя комбинированный селектор',
        html: [
            { tag: 'papercup', class: 'papercup', index: '1', tooltip: '<papercup><papercup/>' },
            { tag: 'cup', class: 'cup', index: '2', tooltip: '<cup><cup/>' },
            {
                tag: 'cup',
                class: 'cup',
                id: 'star',
                child: 'star',
                childClass: 'star',
                index: '3',
                childIndex: '4',
                tooltip: '<cup><cup/>',
                childTooltip: '<star id="star"></star>',
            },
        ],
        htmlContent: [
            '<papercup data-index="1">&lt;papercup/&gt;<papercup/><br>',
            '<cup data-index="2">&lt;cup&gt;<cup/><br>',
            '<cup data-index="3">&lt;cup&gt;<br><star data-index="4">&lt;star id="star"&gt;</star><br>&lt;cup/&gt;<cup/><br>',
        ],
        target: [1, 4],
        answer: ['papercup, #star', '#star, papercup'],
    },
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
