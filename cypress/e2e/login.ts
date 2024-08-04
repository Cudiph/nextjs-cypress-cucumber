import { When, Then, Given, DataTable } from "@badeball/cypress-cucumber-preprocessor";

Given('user navigate to the login page', () => {
  cy.visit('/')
  cy.get('a').contains('Log In').click();
  cy.location('pathname').should('eq', '/login')
})

When('user login with', (data: DataTable) => {
  const creds = data.hashes()[0];
  cy.get('input[name="username"]').type(creds.username)
  cy.get('input[name="password"]').type(creds.password)
  cy.get('button').contains('Sign in').click();
})

Then('user should see their username and logout link', () => {
  cy.location('pathname').should('eq', '/profile')
  cy.contains('Logged in as').should('exist');
})

Then('user should see error message', () => {
  cy.contains(`User doesn't exist`).should('exist');
})
