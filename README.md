**Playwright TypeScript Automation Framework**

An end-to-end test automation framework built using Playwright and TypeScript to test the SauceDemo web application.

**Overview**

This project demonstrates end-to-end web application automation using Playwright with TypeScript.

The framework automates key user journeys in the SauceDemo application, including:

User login
Product browsing
Product selection
Adding products to the cart
Cart validation
Checkout
Order completion
Logout

The framework follows maintainable automation practices such as the Page Object Model (POM) and reusable test components.

**Tech Stack**

Playwright :	Browser automation and E2E testing

TypeScript : Test development

Node.js	: Runtime environment

npm	: Package management

Git	: Version control

GitHub :	Source code repository

**Application Under Test**

SauceDemo

https://www.saucedemo.com/

SauceDemo is a sample e-commerce application provided by Sauce Labs and is commonly used for demonstrating UI automation and testing.

**Getting Started**

Prerequisites

Install the following:

Node.js
npm
Git

Verify the installation:

node --version
npm --version
Clone the Repository
git clone https://github.com/Yogita15/PlaywrightFramework.git

Navigate to the project:

cd PlaywrightFramework
Install Dependencies
npm install

Install Playwright browsers:

npx playwright install

**Running Tests**

Run all tests:

npx playwright test

Run tests in headed mode:

npx playwright test --headed

Run tests in a specific browser:

npx playwright test --project=chromium

Run a specific test file:

npx playwright test tests/login.spec.ts

Run tests with the Playwright UI:

npx playwright test --ui

**Test Reports**

After test execution, open the Playwright HTML report:

npx playwright show-report

The report provides details about:

Passed tests
Failed tests
Test execution time
Screenshots
Videos
Traces

**End-to-End Test Flow**

A typical end-to-end scenario follows this flow:

Login
  ↓
Products
  ↓
Select Product
  ↓
Add to Cart
  ↓
View Cart
  ↓
Checkout
  ↓
Enter Customer Details
  ↓
Complete Order
  ↓
Verify Order Confirmation

**Testing Goals**

The primary goals of this framework are to demonstrate:

End-to-end UI automation
TypeScript-based test development
Page Object Model
Reusable automation components
Assertions and validations
Cross-browser testing
Test reporting
Maintainable test architecture

**CI/CD**

The framework can be integrated with CI/CD tools such as GitHub Actions to automatically execute tests when changes are pushed to the repository or when a pull request is created.
 
**Author**

Yogita

GitHub: https://github.com/Yogita15

**License**

This project is created for learning, demonstration, and test automation purposes.
