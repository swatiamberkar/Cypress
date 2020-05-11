describe('Add Earnings  Fields ', function() {
	
	var company ='GreyTest'
	
	var loadEvent = "not fired"

	window.addEventListener("load", function(event) {
	console.log("load event fired!");
	loadEvent = "fired";
	});


	
	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus') 
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
		cy.getCookie('.AspNetCore.Session').should('be.null')
		cy.getCookie('new_username').should('be.null')
		cy.getCookie('FavouriteMenus').should('be.null')
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
	})
	
	
	it('successfully loads', function() {
		cy.visit('http://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('http://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('administrator@bhagya.com')
		cy.get('#Email').should('have.value', 'administrator@bhagya.com')
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
		cy.clearLocalStorage()
                Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
                Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','_gcl_au','ai_session','ai_user','new_username')
                cy.wait(2000)
				//cy.reload()
		//cy.wait(5000)
		//selectedDepartment = selectedDepartment
    })
	
	
	it('Change Company', function() {
		 
		 cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').invoke('text').then((text) => {
		//cy.log(text.trim())
				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('.col-sm-12 > .page-title-box > .float-right > .breadcrumb > .breadcrumb-item').click()
				cy.wait(2000)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio').find('label').each(function(row, i){
				
				console.log(i)
				var num1 = parseFloat(i+1)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').invoke('text').then((text) => {
				//cy.log(text.trim())
			if(text.trim()==company){
				expect(text).to.eq(company)
				cy.get('.modal-dialog > .modal-content > .modal-body > .radio:nth-child('+num1+') > label').click()
				cy.get('#defaultCompanySave').click()
				cy.wait(2000)
				
			}	
			})
			
		})		
		}
		})	 	
	})
	
	
	it('Navigate to Payroll Salary Structure', function() {
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#salaryStruct').click({force: true})
	})	
	
	it('Add Earning Formula', function() {					 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio16']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
			/*	cy.xpath("//div[@id='partialFilter']/div[1]//div[@class='my-2']").find('label').each(function(row, i){
				
				console.log("Label: "+ i)
				var num = parseFloat(i+1)
				cy.xpath("//div[@id='partialFilter']/div[1]//div[@class='my-2']["+num+"]//label").invoke('text').then((text) => {
				cy.log(text.trim())
				if(text.trim()=='Formula Field'){
				expect(text).to.eq('Formula Field')
				cy.xpath("//div[@id='partialFilter']/div[1]//div[@class='my-2']["+num+"]//input[@name='formulaFilter']").click()
				cy.wait(2000)
				
			}
			
			})
			
		})		
		*/
		
		
		cy.readFile('D:/CyPress Demo/cypress/fixtures/DeductionFormula.json').then((text) =>{
        text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		console.log(i)
		var num1 = parseFloat(i)
		cy.xpath("//a[@class='d-lg-flex justify-content-between empDetail']//h5").eq(num1).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num1).click()
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force:true})		
		
		cy.wait(3000)
		cy.get('#Dirper').select(entry.Dirper)
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding)
		}
		
		if(entry.Dirper=="Percentage")
		{	cy.get('#Formula').clear()
			cy.get('#Formula').type(entry.Formula)
			cy.get('#Percentage').clear()
			cy.get('#Percentage').type(entry.Percent)
			cy.get('#Maximun').clear()
			cy.get('#Maximun').type(entry.Maximum)
		}
			
		if(entry.Arrear!="")
		{
			cy.get('#drpArrear').select(entry.Arrear, {force:true})
		}
		
		if(entry.ESI_Eligibility!="")
		{
			cy.get('#EligibilityFormula').clear()
			cy.get('#EligibilityFormula').type(entry.ESI_Eligibility)
		}
		
	
		cy.get('#btnForCreate').click()
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(1000)
		cy.clearLocalStorage()
		
		//cy.wait(2000)
		/*cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Formula Saved Successfully')
				
		})	
		*/
		}
			}	
			})				
		})	
	
		
		})
		
		})
		
	})

		
})