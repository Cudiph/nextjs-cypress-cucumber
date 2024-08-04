Feature: Profile page
  
  Scenario: Unauthenticated guest visit profile page
    Given user navigate to profile
    Then user redirected to login page
    And user should see message
    
