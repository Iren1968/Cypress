const users_new = require('../../fixtures/users_new.json');
const generalElements = require('../../fixtures/pages/general.json');
const boxPage = require('../../fixtures/pages/boxPage.json');
const dashboardPage = require('../../fixtures/pages/dashboardPage.json');
const invitePage = require('../../fixtures/pages/invitePage.json');
const inviteeBoxPage = require('../../fixtures/pages/inviteeBoxPage.json');
const inviteeDashboard = require('../../fixtures/pages/inviteeDashboard.json');
import { faker } from '@faker-js/faker';

describe('user can create a box and run it', () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = 'Евро';
  let inviteLink;

  it('user logins and create a box', () => {
    cy.visit('/login');
    cy.loginSCB(users_new.userAutor.email, users_new.userAutor.password);
    cy.contains('Создать коробку').click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAmount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should('have.text', newBoxName);
    cy.get('.layout-1__header-wrapper-fixed .toggle-menu-item--active span')
      .invoke('text')
      .then((text) => {
        expect(text).to.include('Участники');
        //expect(text).to.include('Моя карточка');
        //expect(text).to.include('Подопечный');
      });
  });

  it('add participants', () => {
    cy.get(generalElements.enterButton).click();
    cy.get(invitePage.inviteLink)
      .invoke('text')
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });
  it('approve as user', () => {
    cy.visit(inviteLink);
    cy.get(generalElements.enterButton).click();
    cy.contains('войдите').click();
    cy.loginSCB(users_new.user1.email, users_new.user1.password);
    cy.contains('Создать карточку участника').should('exist');
    cy.get(generalElements.enterButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboard.noticeforInvitee)
      .invoke('text')
      .then((text) => {
        expect(text).to.contains('Это — анонимный чат с вашим Тайным Сантой');
      });
    cy.clearCookies();
  });

  it('userAutor can invite more users', () => {
    cy.visit('/login');
    cy.loginSCB(users_new.user1.email, users_new.user1.password);
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    ).click({ force: true });
    cy.get(
      ':nth-child(1) > a.base--clickable > .user-card > .user-card__info-wrapper > .user-card__name > .txt--med'
    ).click();
    cy.get('a > .txt-secondary--med').click({ force: true });
    cy.get(':nth-child(1) > .frm-wrapper > #input-table-0').type(
      users_new.user2.name
    );
    cy.get(':nth-child(2) > .frm-wrapper > #input-table-0').type(
      users_new.user2.email
    );
    cy.get(':nth-child(3) > .frm-wrapper > #input-table-1').type(
      users_new.user3.name
    );
    cy.get(':nth-child(4) > .frm-wrapper > #input-table-1').type(
      users_new.user3.email
    );
    cy.get(generalElements.enterButton).click();
    cy.get(
      ':nth-child(3) > .form-page-group__main > .tip > section > .layout-row-space-between > .txt-secondary'
    )
      .should('exist')
      .and(
        'contain.text',
        'Карточки участников успешно созданы и приглашения уже отправляются.'
      );
  });
  it('Drawing', () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__left-item > .box-header-info > .box-header-info__wrapper'
    ).click();
    cy.get('a > .txt-secondary--med').click();
    cy.get(generalElements.enterButton).click();
    cy.get('.santa-modal_content_buttons > .btn-main').click();
    cy.contains('Жеребьевка проведена').should('exist');
  });
  it('Notification', () => {
    cy.get(generalElements.noteButton).click();
    cy.contains(
      `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should('exist');
    cy.clearCookies();
  });
  it('Notification other users', () => {
    cy.visit('/login');
    cy.loginSCB(users_new.user1.email, users_new.user1.password);
    cy.get(generalElements.noteButton).click();
    cy.contains(
      `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should('exist');
    cy.clearCookies();
  });
  it('Notification other users', () => {
    cy.visit('/login');
    cy.loginSCB(users_new.user2.email, users_new.user2.password);
    cy.get(generalElements.noteButton).click();
    cy.contains(
      `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should('exist');
    cy.clearCookies();
  });
  it.only('Notification other users', () => {
    cy.visit('/login');
    cy.loginSCB(users_new.user3.email, users_new.user3.password);
    cy.get(generalElements.noteButton).click();
    cy.contains(
      `У тебя появился подопечный в коробке "Mango". Скорее переходи по кнопке, чтобы узнать кто это!`
    ).should('exist');
    cy.clearCookies();
  });
});
