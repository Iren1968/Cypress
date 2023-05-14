import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const users_new = require('../../fixtures/users_new.json');
const generalElements = require('../../fixtures/pages/general.json');
const boxPage = require('../../fixtures/pages/boxPage.json');
const dashboardPage = require('../../fixtures/pages/dashboardPage.json');
const invitePage = require('../../fixtures/pages/invitePage.json');
const inviteeBoxPage = require('../../fixtures/pages/inviteeBoxPage.json');
const inviteeDashboard = require('../../fixtures/pages/inviteeDashboard.json');
import { faker } from '@faker-js/faker';

let newBoxId = 'tvE8u8'; //= faker.word.noun({ length: { min: 5, max: 10 } });
let newBoxName = 'Grusha'; //= faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let currency = 'Евро';
let inviteLink;

//userAutor logs in sucessfully
Given('userAutor is on secret santa login page', function () {
  cy.visit('/login');
});
When('userAutor logs in as {string} and {string}', function (email, password) {
  cy.loginSCB(email, password);
});
Then('userAutor is on dashboard page and see button {string}', function () {
  cy.contains('Создать коробку').click();
});

//userAutor  creat a box successfully
When('userAutor passes the steps of box creating', function () {
  cy.get(boxPage.boxNameField).clear().type(newBoxName);
  cy.get(':nth-child(3) > .frm').clear().type(newBoxId);
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAmount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click().wait(5000);
  cy.get(generalElements.arrowRight).click().wait(5000);
  cy.get(dashboardPage.createdBoxName)
    .should('have.text', newBoxName)
    .wait(5000);
  //cy.get(':nth-child(3) > .frm').clear().type(newBoxId);
  cy.get('.layout-1__header-wrapper-fixed .toggle-menu-item--active span')
    .invoke('text')
    .then((text) => {
      expect(text).to.include('Участники');
    });
});

//userAutor invites a participant via the link successfully and create a card in the box
When('userAutor generates an invitation link', function () {
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(1) > .txt--med'
  ).click({ force: true });
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(1) > .txt--med'
  ).click({ force: true });
  cy.get(invitePage.inviteLink)
    .invoke('text')
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});
Then('userAutor created the box successfully', function () {
  cy.visit(inviteLink);
  cy.get(generalElements.enterButton).click();
  cy.contains('войдите').click();
  cy.loginSCB(users_new.user1.email, users_new.user1.password);
  //cy.contains('Создать карточку участника').should('exist');
  //cy.get(generalElements.enterButton).click();
  // cy.get(generalElements.arrowRight).click();
  // cy.get(generalElements.arrowRight).click();
  // cy.get(inviteeBoxPage.wishesInput).type(wishes);
  //cy.get(generalElements.arrowRight).click();
  cy.get(inviteeDashboard.noticeforInvitee)
    .invoke('text')
    .then((text) => {
      expect(text).to.contains('Это — анонимный чат с вашим Тайным Сантой');
    });
  cy.clearCookies();
});

//userAutor adds participants in a different way
Given('userAutor is on secret santa login page again', function () {
  cy.clearCookies();
  cy.visit('/login');
});
When(
  'userAutor logs again in as {string} and {string}',
  function (email, password) {
    cy.loginSCB(email, password);
  }
);
When('userAutor clicks on {string} button', function () {
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
  ).click({ force: true });
  cy.get(
    ':nth-child(4) > a.base--clickable > .user-card > .user-card__info-wrapper > .user-card__name > .txt--med'
  ).click({ force: true });
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner'
  ).click({ force: true });
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header-secondary__menu > .header-secondary-menu > .organizer-menu > .organizer-menu__wrapper > :nth-child(1) > .txt--med'
  ).click({ force: true });
  Then('userAutor fills the cells in the table', function (name, email) {
  cy.get(
    ':nth-child(1) > .frm-wrapper > #input-table-0',
    dataTable.hashes()[0].type(name)
  );
  cy.get(
    ':nth-child(2) > .frm-wrapper > #input-table-0',
    dataTable.hashes()[0].type(email)
  );
  cy.get(
    ':nth-child(3) > .frm-wrapper > #input-table-1',
    dataTable.hashes()[1].type(name)
  );
  cy.get(
    ':nth-child(4) > .frm-wrapper > #input-table-1',
    dataTable.hashes()[1].type(email)
  );
  cy.get(generalElements.enterButton).click().wait(5000);
  cy.get(
    ':nth-child(3) > .form-page-group__main > .tip > section > .layout-row-space-between > .txt-secondary'
  )
    .should('exist')
    .and(
      'contain.text',
      'Карточки участников успешно созданы и приглашения уже отправляются.'
    );
});

//userAutor draws
When("userAutor clicks on 'go to the draw' button", function () {
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__left-item > .box-header-info > .box-header-info__wrapper'
  ).click();
 // cy.get('a > .txt-secondary--med').click();
});
Then("unuserAutor clicks on {string} button", function () {
  cy.get(generalElements.enterButton).click();
});
Then('userAutor clicks on verification button', function () {
  cy.get('.santa-modal_content_buttons > .btn-main').click();
});
Then('userAutor conducted the draw successfully', function () {
  cy.contains('Жеребьевка проведена').should('exist');
});

//userAutor recieved notification
When('userAutor clicks notifications button', function () {
  cy.get(generalElements.noteButton).click().wait(200000);
});
Then('userAutor sees a notification', function () {
  cy.contains(
    `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
  ).should('exist');
  cy.clearCookies();
});

//other participants recieved notifications
When('users log as {string} and {string}', function (email, password) {
  cy.visit('/login');
  cy.loginSCB(email, password);
});
Then('users click notifications button', function () {
  cy.get(generalElements.noteButton).click();
});
Then('users see a notifications', function () {
  cy.contains(
    `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
  ).should('exist');
  cy.clearCookies();
});
