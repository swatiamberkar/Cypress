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

	it('Payroll Salary components navigate', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click({force: true})
		cy.wait(2000)
	})
	
	
/*	it('Add Earning field for Arrear Field Allownace', function() {	
		cy.get('[title="Add Earning"]').eq(0).should('be.visible').should('not.disabled')
		cy.get('[title="Add Earning"]').eq(0).should('exist')
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('AFIELD')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Arrear Field Allownace')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })	
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})		
	})
		
	it('Add Earning field for Arrear HRA', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()	
		cy.get('#FieldName').type('AHRA')
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()		
		cy.get('#fieldLabelName').type('Arrear HRA')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Earning field for Arrear Project Allowance', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('APROJ')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Arrear Project Allowance')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
	})	

	it('Add Earning field for Earned HRA', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EHRA')
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Earned HRA')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})	
	
	it('Add Earning field for Field Allowance', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EFIELD')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Field Allowance')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})	

	
	it('Add Earning field for Fixed HRA', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FHRA')
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Fixed HRA')
		
		cy.get('#Increment_Component').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})	
	
	it('Add Earning field for Lop Basic', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('LOP')
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Lop Basic')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})		
	
	it('Add Earning field for LOP Credit days', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('LOPCD')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('LOP Credit days')
		
		//cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})		
	
	it('Add Earning field for Master Field Allowance', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FFIELD')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Master Field Allowance')
		
		cy.get('#Increment_Component').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})		
		
	it('Add Earning field for Master Project Allowance', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FPROJ')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Master Project Allowance')
		
		cy.get('#Increment_Component').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})	

	
	it('Add Earning field for Project Allowance', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EPROJ')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Project Allowance')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})	
	
	it('Add Earning field for Supplementary Basic', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('SB')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Supplementary Basic')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})	
	
	it('Add Earning field for Supplementary Days', function() {
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('SD')	
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Supplementary Days')
		
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})	
		
	it('Add Earning field for Conditional', function() {
		cy.wait(2000)
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('CONDITIONAL')
		
		cy.get('#fieldLabelName').click({force: true})
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Conditional Earning')
		
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
		
	})

	
	it('Add Deduction field for CarLoan', function() {
		cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(2000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('CL')
		
		cy.get('#LabelName').click({force: true})
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('Carloan')
		
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
	})
	
	it('Add Deduction field for HomeLoan', function() {
		cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(4000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('HL')
		
		cy.get('#LabelName').click({force: true})
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('HomeLoan')
		
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
		
	})
	
	it('Add Deduction field for EducationLoan', function() {
		cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(3000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EL')
		
		cy.get('#LabelName').click({force: true})
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('EducationLoan')
		
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
	})
	
  */
 
 
  it('Navigate to Payroll Salary Structure', function() {
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
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
		
		
		 cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/EarningFormula.json').then((text) =>{
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
		
		cy.wait(2000)
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
		
		cy.wait(3000)
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
		cy.wait(2000)
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
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
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
	
	
	
	it('Add Earning Formula for Admin', function() {				 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Admin',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
		
		 cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/EarningFormula.json').then((text) =>{
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
		
		cy.wait(2000)
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
		
		cy.wait(3000)
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
		cy.wait(2000)
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
		cy.wait(2000)
		cy.get('#Payroll_SalaryStructure').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Admin',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
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
	
	
	
	it('Add Deduction Formula for Staff', function() {					 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio16']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
			
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/DeductionFormula.json').then((text) =>{
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
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click({force:true})
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force:true})		
		
		cy.wait(3000)
		cy.get('#Dirper').select(entry.Dirper, {force: true})
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding, {force: true})
		}
		
		if(entry.Dirper=="Percentage")
		{	cy.get('#Formula').click({force: true})
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
			cy.get('#drpArrear').select(entry.Arrear, {force:true})
		}
		
		if(entry.ESI_Eligibility!="")
		{
			cy.get('#EligibilityFormula').click({force: true})
			cy.get('#EligibilityFormula').clear()
			cy.get('#EligibilityFormula').type(entry.ESI_Eligibility)
		}
		
	
		cy.get('#btnForCreate').click({force:true})
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(1000)
		cy.clearLocalStorage()
		
		//cy.wait(2000)
		
		}
			}	
			})				
		})	
	
		
		})
		
		})
		
	})
	
	it('Add Deduction Formula for Admin', function() {					 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio16']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Admin',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
		cy.readFile('D:/CypressPocketHRMS/cypress/fixtures/DeductionFormula.json').then((text) =>{
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
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click({force:true})
		//cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click({force:true})
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force:true})		
		
		cy.wait(3000)
		cy.get('#Dirper').select(entry.Dirper, {force: true})
		cy.wait(1000)
		
		if(entry.Rounding!="")
		{
		cy.get('[name="Rounding"]').select(entry.Rounding, {force: true})
		}
		
		if(entry.Dirper=="Percentage")
		{	cy.get('#Formula').click({force: true})
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
			cy.get('#drpArrear').select(entry.Arrear, {force:true})
		}
		
		if(entry.ESI_Eligibility!="")
		{
			cy.get('#EligibilityFormula').click({force: true})
			cy.get('#EligibilityFormula').clear()
			cy.get('#EligibilityFormula').type(entry.ESI_Eligibility)
		}
		
	
		cy.get('#btnForCreate').click({force:true})
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(1000)
		cy.clearLocalStorage()
		
		//cy.wait(2000)
		
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

