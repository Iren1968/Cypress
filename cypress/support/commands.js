import cypress from 'cypress';
import { Login } from '../fixtures/Login';
var login = new Login();

Cypress.Commands.add('loginSS', (email, password) => {
  login.btnLogin().click().wait(5000);
  login.email().type(email);
  login.password().type(password);
  login.clickBtnLogin().wait(650).click();
});

Cypress.Commands.add('enterLogin', (selector, email) => {
  cy.get(selector).type(email);
});

Cypress.Commands.add('typeUserName', (selector, email) => {
  cy.get(selector).type(email);
});

const regSelectors = require('../fixtures/pageRegistrationSelector.json');

Cypress.Commands.add('validLogin', (email, userName) => {
  cy.typeUserName(regSelectors.nameField, userName),
    cy.get('[name="email"]').type(email),
    cy.get(loginButton).click(),
    cy
      .get(registrationField)
      .contains('Письмо отправлено!')
      .and('have.class', 'picture-notice__title txt-h3--semi txt');
});

Cypress.Commands.add('changePassword', (userName, newPassword) => {
  cy.contains(userName).click({ force: true });
  cy.get('.layout-column-start > :nth-child(1) > .frm').type(newPassword);
  cy.get(
    ':nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm'
  ).type(newPassword);
  cy.get('.layout-row-end > .btn-service').click();
});

import { faker } from '@faker-js/faker';
Cypress.Commands.add('loginAPI', (userEmail, userPassword) => {
  cy.request({
    method: 'POST',
    headers: {
      Cookie:
        'connect.sid=s%3ACkRrHPqSPLTu63an7a8NxHudkxQXCLd7.3wq3k9vpZHfcMGwdCeSUyS0Ma0FxIhfG0M%2Bl1o9GNLg',
    },
    url: 'https://staging.lpitko.ru/api/login',
    body: { email: userEmail, password: userPassword },
  });
});

Cypress.Commands.add('createBox', (idBox, boxName) => {
  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: boxName,
      key: idBox,
      picture: 'cup_one',
      usePost: false,
      useCashLimit: null,
      cashLimit: null,
      cashLimitCurrency: null,
      useWish: true,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: true,
      useNames: true,
      isPhoneRequired: false,
      logo: null,
    },
  });
});

Cypress.Commands.add('editBox', (idBox) => {
  const newNameBox = faker.word.noun(6);
  cy.request({
    method: 'POST',
    url: '/api/box',
    body: {
      email: null,
      name: newNameBox,
      key: idBox,
      picture: 'cup_one',
      usePost: false,
      useCashLimit: false,
      cashLimit: null,
      cashLimitCurrency: null,
      useWish: true,
      useCircleDraw: null,
      isInviteAfterDraw: null,
      isArchived: null,
      createAdminCard: null,
      isCreated: null,
      useNames: true,
      isPhoneRequired: false,
      logo: null,
    },
  });
});

const loginPageSelectors = require('../fixtures/pages/loginPageSelectors.json');
const generalElements = require('../fixtures/pages/general.json');

Cypress.Commands.add('loginSCB', (userName, password) => {
  cy.get(loginPageSelectors.loginField).type(userName);
  cy.get(loginPageSelectors.passwordField).type(password);
  cy.get(generalElements.enterButton).click();
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//Cypress.on('uncaught:exception', (err, runnable) => {
// returning false here prevents Cypress from
// failing the test
//return false;
//});
