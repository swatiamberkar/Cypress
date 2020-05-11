describe('Add Earnings_Formula_Staff', function() {

    var loadEvent = "not fired"
	var company='Test_94';
	window.addEventListener("load", function(event) {
	console.log("load event fired!");
	loadEvent = "fired";
	});

	
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		
		cy.get('[type="submit"]').click({force: true})
		
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

	it('Payroll Salary components navigate', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(2000)
	})
	
	it('Add Earning Formula for Staff', function() {	
	
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
		
		 cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/1_EarningFormula.json').then((text) =>{
                 text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		cy.log(i)
		var num1 = parseFloat(i)
		//cy.get('.qcont').eq(num1).invoke('text').then((text) => {
		cy.get("span[id^='FieldName']").eq(num1).invoke('text').then((text) => {
			
		cy.log('FieldCode: '+ text.trim())
		
		//cy.wait(2000)
		//expect(true).to.eq(true)
		
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
			var num  = num1+1
		cy.wait(500)	
		cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click({force: true})
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force: true})		
		
		cy.wait(1000)
		cy.get('#Dirper').select(entry.Dirper,{force: true})
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding,{force: true})
		}
		
		if(entry.Dirper=="Percentage")			
		{	
			cy.get('#Formula').click({force: true})
			cy.get('#Formula').clear()
			cy.get('#Formula').type(entry.Formula)
			
			cy.get('#Percentage').click({force: true})
			cy.get('#Percentage').clear()
			cy.get('#Percentage').type(entry.Percent)
			
			cy.get('#Maximun').click({force: true})
			cy.get('#Maximun').clear()
			cy.get('#Maximun').type(entry.Maximum)
		}
			
		if(entry.Arrear!="")
		{
			cy.get('#drpArrear').select(entry.Arrear, {force: true})
		}
		cy.wait(1000)
		//cy.server()
		//cy.route('POST', 'Payroll/*').as('getComment')
	
		cy.get('#btnForCreate').click({force:true})
		
		cy.wait(2000)
	
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Formula Saved Successfully')				
		})
		
		cy.reload()
		
		cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(1000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(500)
		
		cy.get("p[title^='Field Type : '] > span").eq(num1).invoke('text').then((text) => {
			
		cy.log('FieldType: '+ text.trim())
		expect(text.trim()).equal(entry.Dirper)
		})
		
		}
			}	
			
			
			})				
		})	
	
		
		})
		
		})
		
	})
	

	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
	
})
	
	
	
	