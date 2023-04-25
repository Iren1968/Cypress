import { faker } from '@faker-js/faker';

describe('Create a box API', () => {
  let userPassword = 'Gibbon45';
  let userEmail = 'kapadolgova@gmail.com';
  let idBox = faker.word.noun({ length: { min: 5, max: 15 } });
  let boxName = faker.word.noun({ length: { min: 5, max: 15 } });
  beforeEach(function () {
    cy.loginAPI(userEmail, userPassword);
  });
  it('Handling the box', () => {
    cy.createBox(idBox, boxName).then((resp) => {
      const boxName = resp.body.box.name;
      const keyBox = resp.body.box.key;
      expect(resp.status).to.eq(200);
      cy.request({
        method: 'GET',
        url: '/api/box/' + keyBox,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.box.key).to.equal(keyBox);
        expect(resp.body.box.name).to.equal(boxName);
        expect(resp.body.box.picture).to.eq('cup_one');
      });
    });
    cy.editBox(idBox).then((resp) => {
      const boxName = resp.body.box.name;
      const keyBox = resp.body.box.key;
      const boxPicture = resp.body.box.picture;
      expect(resp.status).to.eq(200);
      cy.request({
        method: 'GET',
        url: '/api/box/' + keyBox,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.box.key).to.equal(keyBox);
        expect(resp.body.box.name).to.equal(boxName);
        expect(resp.body.box.picture).to.eq(boxPicture);
      });
    });

    cy.editBox(idBox).then((resp) => {
      const boxName = resp.body.box.name;
      const keyBox = resp.body.box.key;
      const boxPicture = resp.body.box.picture;
      expect(resp.status).to.eq(200);
      cy.request({
        method: 'GET',
        url: '/api/box/' + keyBox,
      }).then((resp) => {
        expect(resp.status).to.eq(200);
        expect(resp.body.box.key).to.equal(keyBox);
        expect(resp.body.box.name).to.equal(boxName);
        expect(resp.body.box.picture).to.eq(boxPicture);
      });
    });

    cy.request({
      metod: 'DELETE',
      url: `api/box/${idBox}`,
    }).then((resp) => {
      expect(resp.status).to.equal(200);
    });
  });
});
