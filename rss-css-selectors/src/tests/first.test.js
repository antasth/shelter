const functions = require('../functions/functions.ts');

test('functions', () => {
    expect(functions.createNumbersList()).toBeDefined();
});
test('functions', () => {
    expect(functions.createNumbersList()).toBeInstanceOf(HTMLUListElement);
});
test('functions', () => {
    expect(functions.createElement()).toBeInstanceOf(HTMLElement);
});
test('functions', () => {
    expect(functions.answerDelay(5, 100)).toBeGreaterThan(200);
});
test('functions', () => {
    expect(functions.createArray(15)).toHaveLength(15);
});
test('functions', () => {
    expect(functions.getLevelHeader(4, 20)).toEqual('LEVEL 4 OF 20');
});
test('functions', () => {
    const target = document.createElement('div');
    target.classList.add('test');
    const editor = document.createElement('div');
    expect(functions.getSelector(target, editor)).toEqual(expect.any(String));
});
test('functions', () => {
    expect(functions.getDirectionSymbol('right')).toEqual('>');
    expect(functions.getDirectionSymbol('left')).toEqual('<');
});
test('functions', () => {
    expect(functions.isCompletedByHelp(null)).not.toMatch('кофе');
    expect(functions.isCompletedByHelp(null)).toEqual(expect.stringContaining('button'));
});
test('functions', () => {
    const levels = [
        {
            level: 2,
            help: true,
        },
        {
            level: 4,
            help: true,
        },
    ];
    expect(functions.filterCompletedLevels(levels, 2)).toEqual(expect.any(Array));
});
