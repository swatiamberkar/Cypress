describe('Add Earnings&& Deductions Fields', function() {


   var loadEvent = "not fired"
	var company='Test_90';
	window.addEventListener("load", function(event) {
	console.log("load event fired!");
	loadEvent = "fired";
	});

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
	
	
	it('Add Earning field for Arrear Field Allownace', function() {	
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
	
	
	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
	
})