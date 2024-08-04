import { When, Then, Given, DataTable } from "@badeball/cypress-cucumber-preprocessor";

Given('user navigate to profile page', () => {
  cy.visit('/')
  cy.get('a').contains('Sign Up').click();
  cy.location('pathname').should('eq', '/register')
})

When('user register with', (data: DataTable) => {
  const credsList = data.hashes();
  let creds: Record<string, string>;

  if (credsList.length > 1) {
    const randIdx = Math.floor((Math.random() * 100) % credsList.length);
    console.log(randIdx);
    creds = credsList[randIdx]
  } else {
    creds = credsList[0];
  }
  console.log(credsList);
  cy.get('input[name="username"]').type(creds.username)
  cy.get('input[name="password"]').type(creds.password)
  cy.get('button').contains('Sign up').click();
})

Then('user register again with', (data: DataTable) => {
  const creds = data.hashes()[0];
  cy.visit('/register');
  cy.get('input[name="username"]').type(creds.username)
  cy.get('input[name="password"]').type(creds.password)
  cy.get('button').contains('Sign up').click();
})

Then('user should see login page', () => {
  cy.location('pathname').should('eq', '/login')
})

Then('user see instruction to login again', () => {
  cy.contains('You can now try to login').should('exist');
})

Then('user should see error message', () => {
  cy.contains(`username already exist`).should('exist');
})
