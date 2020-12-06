describe('My First Test', () => {
    it('Checks basic math', () => {
        cy.visit('http://127.0.0.1:8080/')
            .get('button[data-key="6"]')
            .click()
            .get('button[data-key="5"]')
            .click()
            .get('button[data-key="minus"]')
            .click()
            .should((el) => {
                expect(el).to.have.class('active');
            })
            .get('button[data-key="1"]')
            .click()
            .get('button[data-key="7"]')
            .click()
            .get('button[data-key="equals"]')
            .click()
            .get('p#display')
            .should((el) => {
                expect(el).to.contain('48');
            });
    });
});
