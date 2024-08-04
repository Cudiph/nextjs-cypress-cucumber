Feature: Sign up page and navigation

  Background:
    Given user navigate to profile page
  
  Scenario: User signing up with username that available
    When user register with
      | username | password |
      | newuser | newpass123 |
      | newuser2 | newpass123 |
      | newuser3 | newpass123 |
      | newuser4 | newpass123 |
      | newuser5 | newpass123 |
      | newuser6 | newpass123 |
      | newuser7 | newpass123 |
      | newuser8 | newpass123 |
      | newuser9 | newpass123 |
    Then user should see login page
    And user see instruction to login again
 
  Scenario: User signing up with username was taken
    When user register with
      | username | password |
      | Wesker | password123 |
    And user register again with
      | username | password |
      | Wesker | password123 |
    Then user should see error message
      
