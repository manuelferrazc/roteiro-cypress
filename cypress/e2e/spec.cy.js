describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Insere e conclui uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Prova de teoria dos grafos{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
  });

  it('Conclui várias tarefas e remove todas as concluídas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Prova 2 de teoria dos grafos{enter}')
      .type('Prova 2 de ES{enter}')
      .type('Lista de Linguagens de Programação{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
    
    cy.get('[data-cy=filter-active-link')
      .click();

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();
    
    cy.get('[data-cy=filter-all-link]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);
    
    cy.get('[class=clear-completed]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);
  });

  it('Testa a ordem de inserção', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
     .type('Prova 2 de teoria dos grafos{enter}')
     .type('Prova 2 de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[class=clear-completed]')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova 2 de ES');
  });
});