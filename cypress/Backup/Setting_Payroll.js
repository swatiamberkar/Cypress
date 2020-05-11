describe('Add Earnings  Fields ', function() {
	var companyName='';
    var compnaylength;
	var company ='Test_42'
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
        Cypress.on('uncaught:exception', (err,runnable) => {
        return false;
        });
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gcl_au','_gid','ai_session','ai_user','new_username')
        cy.wait(2000)
    })
	
	function Randomcomapnyname(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return  'Test_'+result;
	}


	it('Create_Company', function() {
        cy.wait(2000)
        cy.get('[role="button"]').eq(3).click({force: true})
        cy.wait(1000)
        cy.contains('Company Profile').click({force: true})
        cy.wait(1000)
        cy.get('[onclick="toggleCategory()"]').click({force: true})
        cy.get('#txtname').type(Randomcomapnyname(2)) 
                       
        cy.get('#txtcompanycode').type('cy')
        cy.get('#txtaddress').type('Turbhe Navi mumbai')
        cy.get('#txttelephone').type('021247171')
        cy.get('#txtcity').type('Turbhe')
        cy.get('#txtstate').select('Maharashtra')
        cy.get('#txtpincode').type('421501')
        cy.wait(1000)
        cy.get('#SubmitBtn').click({force:true})
        cy.wait(5000)
                //cy.get(".toast-message").invoke('text').then((text) => {
                //        expect(text.trim()).equal('Saved sucessfully..!')
                //        cy.log(text.trim())
                           
                //})
    }) 
	
	it('Add Category For Staff', function() {
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		cy.get('#employee_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#category').click({force: true})
		cy.get('[title="Add Category"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get("#categoryModalLabel").then(($span) => {
             var catagoryheadertex = $span.text();
			expect(catagoryheadertex).to.have.string('New Category')
		})
		cy.get('#categoryName').should('be.visible').should('not.disabled')
		cy.get('#categoryName').should('exist')
		
		cy.get('#description').should('be.visible').should('not.disabled')
		cy.get('#description').should('exist')

		cy.get('#displayOrder').should('be.visible').should('not.disabled')
		cy.get('#displayOrder').should('exist')
		
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').type('Staff')
		
		cy.get('#description').click({force: true})
		cy.get('#description').type('Staff')
		
		
		cy.get('#displayOrder').click({force: true})
		cy.get('#displayOrder').type('1')
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			//expect(text.trim()).equal('Category cerated sucessfully..!')
			cy.log(text.trim())
			cy.wait(2000)
		    //cy.contains('button', 'Close').click({force: true})
	})
})	

	it('Add Category For Admin', function() {	
		cy.wait(2000)
		cy.get('[title="Add Category"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').type('Admin')
		
		cy.get('#description').click({force: true})
		cy.get('#description').type('Admintest')
	
		cy.get('#displayOrder').click({force: true})
		cy.get('#displayOrder').type('2')
		
		cy.get('#createBtn').should('be.visible').should('not.disabled')
		cy.get('#createBtn').should('exist')
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			//expect(text.trim()).equal('Category cerated sucessfully..!')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
	})




     it('User Logout', function() {
		cy.wait(2000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
		//cy.url().should('eq', 'https://next.pockethrms.com/')
		
		cy.get('#Password').type('123456')
		cy.get('.btn').click()
		//cy.url().should('eq', 'https://next.pockethrms.com/identity/Home/Index')
		//cy.get('.text-center').should('contain', 'Welcome');
		
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
						cy.get('.radio:nth-child('+num1+') > label').click()
						cy.get('#defaultCompanySave').click()
						cy.wait(2000)
					}	
				})
				})		
			}
		})	 	
	})
	
	it('Payroll Salary components navigate', function() {
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#salaryComp').click({force: true})
		cy.wait(2000)
	})
	
	
	it('Add Earning field for Arrear Field Allownace', function() {	
		cy.get('[title="Add Earning"]').eq(0).should('be.visible').should('not.disabled')
		cy.get('[title="Add Earning"]').eq(0).should('exist')
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#FieldName').type('AFIELD')	
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
		cy.wait(1000)
		
		cy.get('#FieldName').type('AHRA')	
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
		
		cy.get('#FieldName').type('APROJ')	
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
		cy.get('#FieldName').type('EHRA')	
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
		cy.get('#FieldName').type('EFIELD')	
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
		cy.get('#FieldName').type('FHRA')	
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
		cy.get('#FieldName').type('LOB')	
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Lop Basic')
		cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
        })
		
		//clear confirmation msg
		cy.get(".toast-message").click({force: true})
	})		
	
	it('Add Earning field for LOP Credit days', function() {
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#FieldName').type('LOPCD')	
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
		cy.get('#FieldName').type('FFIELD')	
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
		cy.get('#FieldName').type('FPROJ')	
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
		cy.get('#FieldName').type('EPROJ')	
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
		cy.get('#FieldName').type('SB')	
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
		cy.get('#FieldName').type('SD')	
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
		
		cy.get('[title="Add Earning"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#FieldName').type('CONDITIONAL')	
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
		cy.get('#FieldName').type('CL')
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('CarLoan')
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
	})
	
	it('Add Deduction field for HomeLoan', function() {
			cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(2000)
		cy.get('#FieldName').type('HL')
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('HomeLoan')
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
		
	})
	it('Add Deduction field for EducationLoanLoan', function() {
		cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(2000)
		cy.get('#FieldName').type('EL')
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('EducationLoan')
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#btnSaveText').click({force:true})
		
	})
	
  
 
 
  it('Navigate to Payroll Salary Structure', function() {
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#salaryStruct').click({force: true})
		cy.wait(2000)
		
	})
	
	it('Add Earning Formula for Staff', function() {				 
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-filter']").click({force:true})
		
		cy.xpath("//div[@id='partialFilter']//input[@id='radio14']").click({force:true})
		cy.xpath("//div[@id='partialFilter']//select[@id='filterCategoryMaster']").select('Staff',{force: true})
		cy.get('#btnFilterEarningDeduction').click({force:true})
		cy.wait(2000)
		
		
		 cy.readFile('D:/CyPress Demo/cypress/fixtures/EarningFormula.json').then((text) =>{
                 text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		console.log(i)
		var num1 = parseFloat(i)
		cy.get('.qcont').eq(num1).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
			var num  = num1+1
		cy.wait(500)	
		cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click()
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click({force: true})		
		
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
			cy.get('#drpArrear').select(entry.Arrear)
		}
		cy.wait(2000)
		//cy.server()
		//cy.route('POST', 'Payroll/*').as('getComment')
	
		cy.get('#btnForCreate').click()
		cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(5000)
		cy.clearLocalStorage()
		//cy.wait('@getComment').its('status').should('eq', 200)	
		
		//cy.wait(2000)
		
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
		
		 cy.readFile('D:/CyPress Demo/cypress/fixtures/EarningFormula.json').then((text) =>{
                 text.forEach(function(entry) {	
					 
		
		var field = entry.FieldName	
		cy.log('field '+ field)		
		cy.wait(500)	
		
		cy.get('.empDetail').each(function(row, i){			
		console.log(i)
		var num1 = parseFloat(i)
		cy.get('.qcont').eq(num1).invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()==field){
		expect(text.trim()).to.eq(field)
		
		if(entry.Dirper!="")
		{
		var num  = num1+1
		cy.wait(500)	
		cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click()
		cy.wait(1500)
		cy.xpath("//div[@class='dropdown d-inline-block show']//div/a[contains(text(),'Edit')]").click()		
		
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
		
		//cy.server()
		//cy.route('POST', 'Payroll/*').as('getComment')
	
		cy.get('#btnForCreate').click()
		 cy.log(loadEvent)
		Cypress.on('uncaught:exception', (err,runnable) => {
                        return false;
                });
				cy.wait(5000)
		cy.clearLocalStorage()
	
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
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click()
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
				var num  = num1
		cy.wait(1000)	
		cy.xpath("//div[@class='accordion']//div[@class='mt-2']/div/a").eq(num).click()
		//cy.xpath("//div[@id='partialPlaceHolder']/div["+num+"]//a[@id='dLabel1']").click()
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
		
		}
			}	
			})				
		})	
	
		
		})
		
		})
		
	})
	
	
	
})

