Cypress.Commands.add('fill', { prevSubject: 'element' }, ($el, value) => {
  Cypress.log({
    name: 'fill',
    message: value,
    $el,
    consoleProps: () => ({ value }),
  });
  $el.val(value);
  $el[0].dispatchEvent(new Event('input', { bubbles: true }));
});

Cypress.Commands.add('fillBankAuthForm', ({ user, bankAuthority }) => {
  cy.get('[data-cy=bank-account-name]').fill(user.fullName);
  cy.get('[data-cy=phone-number]')
    .should('have.value', user.phone.slice(3))
    .fill(bankAuthority.phone.slice(3));
  cy.get('[data-cy=email]')
    .should('have.value', user.email);
  cy.get('[data-cy=street-address]').fill(bankAuthority.address.streetAddress);
  cy.get('[data-cy=suburb]').fill(bankAuthority.address.suburb);
  cy.get('[data-cy=city]').fill(bankAuthority.address.city);
  cy.get('[data-cy=postCode]').fill(bankAuthority.address.postCode);
  cy.get('[data-cy=bank-account-number]').fill(bankAuthority.bankAccountNumber);
  cy.get('[data-cy=accept-terms]').parent().click();
});
