describe('Login Page', function()
{
	it('Launch the Pocket HRMS URL', function() {
	cy.visit('https://next.pockethrms.com')
	Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
	})
	
	it('Verify Username field\'s Attributes ', function() {
	cy.get('#Email')	
	.then(($input) => {
	$input.focus()
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})
      .should('have.attr', 'data-val-required', 'The Email field is required.')
      .and('have.attr', 'type' ,'email')
	  .should('have.attr', 'data-val-email', 'The Email field is not a valid e-mail address.')	  
  })
  
  it('Verify Password field\'s Attributes ', function() {
	cy.get('#Password')
	.then(($input) => {
	$input.focus()
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	
	})
      .should('have.attr', 'data-val-required', 'The Password field is required.')
      .and('have.attr', 'type' ,'password')
  })
  
  it('Verify Login button\'s Attributes ', function() {
	cy.get('.btn')
	.then(($input) => {
	$input.focus()	
	})
      .should('have.attr', 'type' ,'submit')
  })
  
	
	it('Verify Login button with empty username and empty password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	$input.css('border', '1px solid magenta')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	$input.css('border', '1px solid magenta')
	})	
	})
	
	
	it('Verify Login button with empty username and entering password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Password').type("123")
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('')
	})	
	})
	
	
	it('Verify Login button with entering username and empty password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("123@gmail.com")
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	})
	
	it('Verify Login button with entering Username in not Email format', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("123")
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'123\' is missing an \'@\'.')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	})
	
	it('Verify Login button with entering Username in Email format', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("123@gmail.com")
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	})
	
	it('Verify Login button with entering incorrect username and password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("123@gmail.com")
	cy.get('#Password').type('123')
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('.validation-summary-errors')
	.should('contain', 'Invalid username or password.')
	})
	
	
	it('Verify Login button with entering incorrect username and correct password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("123@gmail.com")
	cy.get('#Password').type('123456')
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('.validation-summary-errors')
	.should('contain', 'Invalid username or password.');
	})
	
	it('Verify Login button with entering correct username and incorrect password.', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("administrator@bhagya.com")
	cy.get('#Password').type('1234')
	cy.get('.btn').click()
	cy.get('#Email').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})	
	cy.get('.validation-summary-errors')
	.should('contain', 'Invalid username or password.');
	})
		
	
	it('Verify Remember me button with disable', function() {
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("administrator@bhagya.com")
	cy.get('#Password').type('123456')
	cy.get('.btn').click()
	cy.url().should('eq', 'https://next.pockethrms.com/identity/Home/Index')
	cy.get('.ml-1').click()
    cy.get('a[href="/Identity/Account/Signout"]').click()
	cy.url().should('eq', 'https://next.pockethrms.com/')
	cy.get('#Password').then(($input) => {
    expect($input[0].validationMessage).to.eq('Please fill out this field.')
	})
	})
	
	it('Verify Remember me button with enable', function() {
	cy.get('.text-primary').click()	
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("administrator@bhagya.com")
	cy.get('#Password').type('123456')
	cy.get('#customSwitchSuccess').check('true',{force: true})
	cy.wait(1000)
	cy.get('.btn').click()
	cy.wait(1000)
	cy.url().should('eq', 'https://next.pockethrms.com/identity/Home/Index')
	cy.get('.ml-1').click()
    cy.get('a[href="/Identity/Account/Signout"]').click()
	cy.wait(2000)
	cy.url().should('eq', 'https://next.pockethrms.com/')
	cy.get('#Password').should('exist') 
	})
	
	it('Verify Login button with entering correct username and correct password.', function() {
	cy.get('.text-primary').click()	
	cy.get('#Email').clear()
	cy.get('#Password').clear()
	cy.get('#Email').type("administrator@bhagya.com")
	cy.get('#Password').type('123456')
	cy.get('.btn').click()
	cy.url().should('eq', 'https://next.pockethrms.com/identity/Home/Index')
	cy.get('.text-center')
	.should('contain', 'Welcome');
	})
	
	


});