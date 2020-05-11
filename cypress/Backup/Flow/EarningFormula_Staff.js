describe('Add Earnings  Fields ', function() {
	var companyName='';
    var compnaylength;
	var loadEvent = "not fired"
	var company='Test_31';
	window.addEventListener("load", function(event) {
	console.log("load event fired!");
	loadEvent = "fired";
	});

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
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => 
		{				 
			if(text.trim()==company){
				expect(text.trim()).to.eq(company) 
			}
			else{
				cy.get('[onclick="changeCompanyModal()"]').click()
				cy.wait(2000)
				cy.get('.radio').find('label').each(function(row, i){
				var num1 = parseFloat(i+1)
				cy.get('.radio:nth-child('+num1+') > label').invoke('text').then((text) => {	
					if(text.trim()==company){
						expect(text).to.eq(company)
						cy.get('.radio:nth-child('+num1+') > label').click({force: true})
						cy.get('#defaultCompanySave').click({force: true})
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
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(2000)
		
	})
	
	it('Add Earning Formula of for Staff', function() {	
	
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(1000)
		
		
		cy.get('.empDetail').each(function(row, i){			
		cy.log(i)
		var num1 = parseFloat(i)
		//cy.get('.qcont').eq(num1).invoke('text').then((text) => {
		cy.get("span[id^='FieldName']").eq(num1).invoke('text').then((text) => {
			
		cy.log('FieldCode: '+ text.trim())
		
		cy.wait(2000)
		//expect(true).to.eq(true)
		
		if(text.trim()=='FB'){
		expect(text.trim()).to.eq('FB')
	
		var num  = num1+1
			
		cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click({force: true})
		//cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force: true})		
		
		//cy.wait(3000)
		cy.get('#Dirper').select('Direct',{force: true})
		//cy.wait(1000)
		
		
		cy.get('[name="Rounding"]').select('1 Rupee',{force: true})
		
	
		
			cy.get('#drpArrear').select('AB', {force: true})
		
		
	
		cy.get('#btnForCreate').click({force:true})
		
		//cy.wait(1000)
	
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Formula Saved Successfully')				
		})
		
		cy.reload()
		
		//cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		//cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		//cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		//cy.wait(2000)
		
		cy.get("p[title^='Field Type : '] > span").eq(num1).invoke('text').then((text) => {
			
		cy.log('FieldType: '+ text.trim())
		expect(text.trim()).equal(entry.Dirper)
		})
		
		}
			})	
			
			
			})				
		})	
	
		
		})
		
	