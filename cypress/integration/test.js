function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const operators = ['plus', 'minus', 'multiply', 'divide'];

describe('Basic Math', () => {
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const first = getRandomInt(10, 100).toString();
        const second = getRandomInt(10, 100).toString();
        let calc;
        if (operator === 'plus') {
            calc = Number(first) + Number(second);
        } else if (operator === 'minus') {
            calc = Number(first) - Number(second);
        } else if (operator === 'multiply') {
            calc = Number(first) * Number(second);
        } else if (operator === 'divide') {
            calc = Number(first) / Number(second);
        }

        it(`Checks ${operator}`, () => {
            cy.visit('http://127.0.0.1:8080/')
                .get(`button[data-key="${first[0]}"]`)
                .click()
                .get(`button[data-key="${first[1]}"]`)
                .click()
                .get(`button[data-key=${operator}]`)
                .click()
                .should((el) => {
                    expect(el).to.have.class('active');
                })
                .get(`button[data-key="${second[0]}"]`)
                .click()
                .get(`button[data-key="${second[1]}"]`)
                .click()
                .get('button[data-key="equals"]')
                .click()
                .get('p#display')
                .should((el) => {
                    if (operator === 'divide') {
                        expect(el).to.contain(calc.toString().substring(0, 5));
                    } else {
                        expect(el).to.contain(calc);
                    }
                })
                .get('button[data-key=allClear]')
                .click();
        });
    }
});
