describe('Pocket HRMS - Login Page', function()
{

	it('Verify Login button with Blank username and Blank Password.', function()
	{
	cy.visit('http://next.pockethrms.com')
	
		Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here prevents Cypress from
		// failing the test
		return false
		})
	cy.get('button[class="btn btn-primary btn-round btn-block waves-effect waves-light"]').click();
	cy.get('input[id="Email"]').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
		})	
	})
	
	
	
	it('Verify Login button with username and blank Password.', function()
	{
	cy.get('input[id="Email"]').type('administrator@bhagya.com');
	cy.get('button[class="btn btn-primary btn-round btn-block waves-effect waves-light"]').click();
	cy.get('input[id="Password"]').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
		})
	})
	
	
	
	it('Verify Login button with Password and blank Username.', function()
	{
	cy.get('input[id="Email"]').clear()	
	cy.get('input[id="Password"]').type('123456')
	cy.get('button[class="btn btn-primary btn-round btn-block waves-effect waves-light"]').click();
	cy.get('input[id="Email"]').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
		})
	})
	
	
	
	it('Verify Login button with incorrect Username and Password.', function()
	{
	cy.get('input[id="Email"]').type('admin@gmail.com')
	cy.get('input[id="Password"]').type('12345')
	cy.get('button[class="btn btn-primary btn-round btn-block waves-effect waves-light"]').click();
	cy.get('div[class="text-danger validation-summary-errors"]')
      .should('contain', 'Invalid username or password.')
	})
	
	
	
	it('Verify Login button with correct Username and Password.', function()
	{
	cy.get('input[id="Email"]').type('administrator@bhagya.com')
	cy.get('input[id="Password"]').type('123456')
	cy.get('button[class="btn btn-primary btn-round btn-block waves-effect waves-light"]').click();
	cy.get('h1[class="display-4"]')
      .should('contain', 'Welcome')
	})
	
	
	it('Verify Default Company', function()
	{
	cy.get('li[onclick="changeCompanyModal()"]').click()
	cy.get('div[class="modal-body"]>div>input').each(($el, index, $list) => {
    // $el is a wrapped jQuery element
    
      cy.wrap($el).click({ force: true })
	  cy.get('button[onclick="changeCompany()"]').click()
	  cy.get('#parent')
	  cy.wait(5000)
	  //cy.get('li[onclick="changeCompanyModal()"]').click()
    
  })
	})
	
	
	
	
	
	
})