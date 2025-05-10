/// <reference types="cypress" />

describe('Fluxo principal de veículos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir a lista inicial de veículos', () => {
    cy.contains('Placa'); 
    cy.get('table').should('exist');
  });

  it('permite alternar entre rastreados e outros', () => {
    cy.contains('Rastreados').click().should('exist');
    cy.contains('Outros').click().should('exist');
  });

  it('permite buscar por placa', () => {
    cy.get('input[placeholder*="placa"]').type('DXV0D74');
    cy.contains('Buscar').click();
    cy.wait(1000); 
    cy.get('table').contains('DXV0D74');
  });

  it('abre detalhes de um veículo ao clicar no marcador do mapa', () => {
    cy.get('.leaflet-marker-icon', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.contains('Placa').should('be.visible');
  });
});
