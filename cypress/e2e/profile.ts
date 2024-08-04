import { Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given('user navigate to profile', () => {
  cy.visit('/');
  cy.get('a').contains('Profile').click()
})

Then('user redirected to login page', () => {
  cy.location('pathname').should('eq', '/login')
})

Then('user should see message', () => {
  cy.contains('You need to login first.').should('exist');
})

// https://www.twistedbrackets.com/next-js-server-side-action-redirects-with-cypress/
Cypress.on("uncaught:exception", (err) => {
    console.log("err.message", err.message);

    // Check if the error message includes "NEXT_REDIRECT"
    if (err.message.includes("NEXT_REDIRECT")) {
        // This block is added to handle server-side redirects in Next.js.
        // Next.js often performs server-side redirects for various reasons, such as:
        // - Authentication flows (redirecting to login page if not authenticated)
        // - Conditional rendering based on user data
        // - Route changes based on server-side logic
        // When these redirects occur, they can throw a "NEXT_REDIRECT" error, 
        // which is expected behavior and should not cause the test to fail.
        // Returning false here prevents Cypress from failing the test when such an error is encountered.
        return false;
    }
});

