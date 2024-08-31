describe('Login', () => {

  beforeEach(() => { 
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
    cy.intercept('GET', '/').as('home');  
    cy.visit('/');
    cy.wait('@home');    
  });

  it('No fields filled', () => {   
    cy.get('[data-cy="login-submit-button"]').click()
    cy.get('[data-cy="message-error"]')
      .should('be.visible')
      .and('contain', 'Verifique o email e a senha digitados.');    
  })

  it.only('No password field filled', () => {   
    const user = Cypress.env('user_name')
    cy.get('[data-cy="login-username-input"]').type(user)    
    cy.get('[data-cy="login-submit-button"]').click()
    cy.get('[data-cy="message-error"]')
      .should('be.visible')
      .or('contain', Cypress.env('messages').portugues.verify)
      .or('contain', Cypress.env('messages').ingles.verify)    
  })

  it('No user field filled', () => {   
    const password = Cypress.env('user_password')
    cy.get('[data-cy="login-password-input"]').type(password, { log: false })   
    cy.get('[data-cy="login-submit-button"]').click()
    cy.get('[data-cy="message-error"]')
      .should('be.visible')
      .and('contain', 'Verifique o email e a senha digitados.');    
  })

  it('Wrong password', () => {   
    const password = Cypress.env('user_password')
    const user = Cypress.env('user_name')
    cy.get('[data-cy="login-username-input"]').type(user)  
    cy.get('[data-cy="login-password-input"]').type(password, { log: false }) 
    cy.intercept('POST', 'https://garuda-prod.wavy.global/api/sign_in').as('formSubmit');
    cy.get('[data-cy="login-submit-button"]').click()
    cy.wait('@formSubmit');
    cy.get('[data-cy="message-error"]')
      .should('be.visible')
      .and('contain', 'Senha inválida.');    
  })

  it('visit forgot your password page', () => {   
    cy.get('.forgot-password-container > .forgot-password-link').click()
    cy.get('.w-50 > wds-button.-full-size > [data-cy="wds-button"]')
      .should('be.visible')
  })


})