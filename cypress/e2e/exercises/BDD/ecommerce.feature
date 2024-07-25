Feature: End to end Ecommerce validation

    application regression

    Scenario: Ecommerce products delivery
    Given I open Ecommerce Page
    When I add items to Cart
    Then Validate the total prices
    Then select the country sumbit and verify Thankyou message

    Scenario: Filling the form to shop
    Given I open Ecommerce Page
    When I fill the form details
    Then Validate the forms behaviour
    Then select the Shop Page