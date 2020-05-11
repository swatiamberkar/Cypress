describe("Recruitment Process", () => {

	var url = 'http://next.pockethrms.com';
	var username= 'nileshgajare@live.com';
	var userPass = '123456';  
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		cy.get('#Password').should('have.value', '123456')
		cy.get('[type="submit"]').should('have.css', 'background-color').and('eq', 'rgb(77, 121, 246)')
		cy.get('[type="submit"]').click({force: true})
		cy.get('.validation-summary-errors').should('not.exist');
		cy.wait(2000)
	})
	
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','module','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
		
    })
	
	it('Change Company', function() {		 
		cy.changeCompany();	 
	}) 
	
	
	it('Recruitment Company Profile',function() {
		cy.wait(1000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		cy.get('#recruitment_detail_tab').click({force: true})
		cy.wait(2000)
		//company profile click
		cy.xpath('/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[7]/div/div[1]/div/div/div/div/ul/li[1]/label/span').click({force: true})
		
		cy.wait(2000)
	
	
		//cy.get('iframe').then($iframe => {
         //      const $body = $iframe.contents().find('body');
           //    cy.wrap($body).find('#tinymce > p').type('IFRAME TEst')
		//})

	 //cy.get('iframe').then(($iframe) => {
       //   const $body = $iframe.contents().find('body')
         // cy.wrap($body).find('#tinymce > p:eq(0)').type('CYPRESS test iframe')
		  
      // })
		
		//stack over flow link
		//https://stackoverflow.com/questions/47325258/how-do-i-enter-data-into-a-form-input-in-an-iframe-using-cypress
		//https://www.npmjs.com/package/cypress-iframe
		//https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__iframes/cypress/integration
		
	})
	

	it('Add Recruitment Location',function() {
		cy.wait(2000)
		cy.server()
		//Recruitment Location
		cy.xpath('/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[7]/div/div[1]/div/div/div/div/ul/li[2]/label/span').click({force: true})
		cy.wait(2000)
		cy.route('POST', 'https://next.pockethrms.com/Recruitment/Settings/SaveLocation').as('SaveLocation')
		cy.get('[title="Add New Location"]').eq(0).click({force: true})
		cy.wait(2000)
		
		
		cy.get('#SubmitBtn').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter the Loaction.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})		
				cy.get('#txtlocation').click({force: true})
				cy.get('#txtlocation').clear()
				cy.get('#txtlocation').type('Mumbai')	
			}
		})
		
		
		cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter the Address Fields.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})		
				cy.get('#txtaddress1').click({force: true})
				cy.get('#txtaddress1').clear()
				cy.get('#txtaddress1').type('301, 3rd Floor, B wing, Everest Nivara Infotech Park, MIDC Main Road, Indira Nagar, Turbhe, Navi Mumbai, Maharashtra 400705')	
			}
		})
		
		cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter the City.')	{
				cy.wait(2000)
				cy.get(".toast-message").eq(0).click({force: true})		
				cy.get('#txtcity').click({force: true})
				cy.get('#txtcity').clear()
				cy.get('#txtcity').type('mumbai')	
			}
		})
		
		
		cy.wait(1000)
		cy.get('#txtpincode').click({force: true})
		cy.get('#txtpincode').clear()
		cy.get('#txtpincode').type('761012')
		
		cy.get('#txtstate').select('Maharashtra',{force: true})
		cy.get('#SubmitBtn').click({force: true})
		cy.wait('@SaveLocation').its('status').should('eq', 200) 
		 cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Save Successfully')
		})
		
	})
	
	
	it('Edit Recruitment Location',function() {
		
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#txtlocation').then($input => {
			expect($input.val()).to.contain('Mumbai')
		})
		
		cy.get('#txtaddress1').then($input => {
			expect($input.val()).to.contain('301, 3rd Floor, B wing, Everest Nivara Infotech Park, MIDC Main Road, Indira Nagar, Turbhe, Navi Mumbai, Maharashtra 400705')
		})
		
		cy.get('#txtcity').then($input => {
			expect($input.val()).to.contain('mumbai')
		})
		
		cy.get('#txtpincode').then($input => {
			expect($input.val()).to.contain('761012')
		})
		
		cy.get('#txtstate').then($input => {
			expect($input.val()).to.contain('Maharashtra')
		})
		
		
		cy.get('#txtstate').select('Karnataka',{force: true})
		cy.wait(2000)
		cy.get('#SubmitBtn').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").eq(0).click({force: true})
	})	
	
	
	it('Recruitment Career Page',function() {
		cy.wait(2000)
		cy.server()
		cy.xpath('/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[7]/div/div[1]/div/div/div/div/ul/li[3]/label/span').click({force: true})
		cy.route('POST', 'https://next.pockethrms.com/Recruitment/Settings/SaveRecruitmentCareerPage').as('RecruitmentCareerPage')
		cy.get('#Theme').click({force: true})
		cy.get('#Theme').clear()
		cy.get('#Theme').type('#33FF9F')
		
		cy.get('#Layout').select('Stacked',{force: true})
		
		cy.get('#Btnsave').click({force: true})
		cy.wait('@RecruitmentCareerPage').its('status').should('eq', 200) 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Save Successfully')
		})
	})	
	
	it('Duplication Setting',function() {
		cy.wait(2000)
		cy.xpath('/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[7]/div/div[1]/div/div/div/div/ul/li[4]/label/span').click({force: true})
		cy.wait(2000)
		cy.get('#CW').check({force: true})
		
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
	})
	
	
})