Feature: Login 
  
  Background:
    Given user navigate to the login page
    
  Scenario: Login with valid credential 
    When user login with
      | username | password |
      | Wesker | password123 |
    Then user should see their username and logout link
    
  Scenario: Login with invalid password
    When user login with
      | username | password |
      | jhghghggvyty | randompasswordthatnotreal |
    Then user should see error message
