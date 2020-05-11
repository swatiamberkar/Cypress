
describe('ITAX Procedure', function() {
	
	 var employeeId = 'CY5';
	 var filePath= 'Greytrix SSL VPN.pdf';
	 beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
				return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','__cypress.initial','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	
	it('successfully page  loads', function() {
		cy.visit('https://next.pockethrms.com/') 
	})
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
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
	it('Change Company', function() {		 
		cy.changeCompany(); 
	
	})
	
	Cypress.Commands.add('SaveEarningDeductionfields',()=>{
                cy.wait(2000)
                cy.server()   
                cy.get('#salary_detail_tab').click({force: true})
                cy.wait(2000)
                cy.get('#Salary_EarningDetails').click({force: true})
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveEarningDetails').as('SaveEarningDetails')
                cy.wait(2000)
                
                cy.get('input[name=FB]').click({force: true})
                cy.get('input[name=FB]').clear()                
                cy.get('input[name=FB]').type('40000') 
                
                cy.get('input[name=FPROJ]').click({force: true})        
                cy.get('input[name=FPROJ]').clear()                
                cy.get('input[name=FPROJ]').type('10000')
        
                
                cy.get('input[name=FFIELD]').click({force: true})        
                cy.get('input[name=FFIELD]').clear()                        
            cy.get('input[name=FFIELD]').type('5000')
                        
                cy.wait(1000)
                 cy.get('#btnSaveEarningDetails').click({force: true})
                cy.wait('@SaveEarningDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
                cy.get('#Salary_DeductionDetails').click({force: true})
                cy.wait(1000)
                cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SaveDeductionDetails').as('SaveDeductionDetails')
                cy.get('input[name=TDS]').click({force: true})
        cy.get('input[name=TDS]').clear()                
                cy.get('input[name=TDS]').type('200')
                
                 cy.get('#btnSaveDeductionDetails').click({force: true})
                cy.wait('@SaveDeductionDetails').its('status').should('eq', 200)
                cy.get(".toast-message").invoke('text').then((earningtext) => {
                 cy.log(earningtext.trim())
                })
                
        })


    it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li','Incometax test(CY5)').click({force: true})
		cy.wait(2000)
		cy.SaveEarningDeductionfields();
	})




it('Income Tax Declaration Entry(HRA Metro Rent Paid)', function() {
	
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	
	cy.server()      
	cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/SaveHRA').as('SaveHRA')
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#HRA').click({force: true})
	cy.wait(2000)
	
	//month validation 
	
	cy.get('[onclick="return validateHRADec(this)"]').eq(0).click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select Month Year')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#drpEntryMonth').select('April',{force: true})
			}
		
	})
	
	
	cy.get('#drpEntryMonth').select('April',{force: true})
	cy.get('.table-responsive-sm > #tblData > tr:nth-child(2) > td:nth-child(4) > .form-control').click()
	cy.get('.table-responsive-sm > #tblData > tr:nth-child(2) > td:nth-child(4) > .form-control').clear()
    cy.get('.table-responsive-sm > #tblData > tr:nth-child(2) > td:nth-child(4) > .form-control').type('8000')
 
    cy.get('.table-responsive-sm > #tblData > tr:nth-child(3) > td:nth-child(4) > .form-control').click()
	cy.get('.table-responsive-sm > #tblData > tr:nth-child(3) > td:nth-child(4) > .form-control').clear()
    cy.get('.table-responsive-sm > #tblData > tr:nth-child(3) > td:nth-child(4) > .form-control').type('4000')
 
    cy.get('.table-responsive-sm > #tblData > tr:nth-child(4) > td:nth-child(4) > .form-control').click()
	cy.get('.table-responsive-sm > #tblData > tr:nth-child(4) > td:nth-child(4) > .form-control').clear()
    cy.get('.table-responsive-sm > #tblData > tr:nth-child(4) > td:nth-child(4) > .form-control').type('4000')
	
	
	cy.get('[onclick="return validateHRADec(this)"]').eq(0).click({force: true})
	cy.wait('@SaveHRA').its('status').should('eq', 200)
	
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('HRA Declaration Saved Successfully !')			
	})
	cy.get(".toast-message").eq(0).click({force: true})
	
	//read the sum of Metro Rent Paid in incometax House Rent Paid(Annual)
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(1000)
	cy.get('#incomeTax').click({force: true})
	cy.wait(1000)
	cy.get('#drpEffMonth').select('April',{force: true})
	cy.wait(2000)
	cy.get('#txtHRPAmt').then($input => {
		expect($input.val()).to.contain('16000')
	})
	
	cy.wait(2000)
	cy.get('.modal-xl > .modal-content > .modal-header > .close > span:nth-child(1)').click({force: true})
})

it('Income Tax Declaration Entry (HRA Delete)', function() {
	cy.wait(2000)
	cy.get('.modal-xl > .modal-content > .modal-header > .close > span:nth-child(1)').click({force: true})
	cy.server()      
	cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/DeleteHRADeclaration').as('DeleteHRADeclaration')
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#HRA').click({force: true})
	cy.wait(1000)
	cy.get('#drpEntryMonth').select('April',{force: true})
	cy.wait(2000)
	cy.get('[onclick="deleteRecordHRADec(this)"]').eq(0).click({force: true})
	cy.wait('@DeleteHRADeclaration').its('status').should('eq', 200)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Deleted Successfully !')			
	})
	cy.get(".toast-message").click({force: true})
})



it('Income Tax Declaration Entry (HRA Add Landlord Details)', function() {
	cy.wait(5000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#HRA').click({force: true})
	cy.wait(1000)
	cy.get('#drpEntryMonth').select('April',{force: true})
	cy.get('[onclick="openLandLordDetails()"]').eq(0).click({force: true})
	cy.wait(1000)
	
	 cy.get('#landlordsvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Enter LandLord Name')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#name').click({force: true})
		 cy.get('#name').type('arun croll')
		}
	 })
	 
	 cy.wait(2000)
	 cy.get('#landlordsvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Enter PAN Number')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#pannumber').click({force: true})
		 cy.get('#pannumber').type('fgfdhgfhgfhfh')
		}
	 })
	 
	  cy.wait(2000)
	 cy.get('#landlordsvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Invalid PAN Number')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#pannumber').click({force: true})
		 cy.get('#pannumber').clear()
		 cy.get('#pannumber').type('ASFFQ5674A')
		}
	 })
	 
	 
	  cy.get('#landlordsvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Enter Landlord Address')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#address').click({force: true})
		 cy.get('#address').clear()
		 cy.get('#address').type('mumbai')
		}
	 })
	
		cy.get('#remarks').click({force: true})
		 cy.get('#remarks').clear()
		 cy.get('#remarks').type('terstlandload of HRA')
		 
		 cy.wait(2000)
		 cy.get('#landlordsvbtn').click({force: true}) 
		
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully')			
		})
	cy.get(".toast-message").click({force: true})
})



it('HRA Edit Landlord Details', function() {
	
	cy.wait(1000)
	cy.contains('button','Edit').click({force: true})
	
	cy.wait(2000)
	cy.get('#name').then($input => {
		expect($input.val()).to.contain('arun croll')
	})
	
	cy.get('#pannumber').then($input => {
		expect($input.val()).to.contain('ASFFQ5674A')
	})
	
	cy.get('#address').then($input => {
		expect($input.val()).to.contain('mumbai')
	})
	
	
	cy.get('#name').click({force: true})
	cy.get('#name').clear()
	 cy.get('#name').type('HRAlandloadtest')

	cy.wait(1000)
	cy.get('#landlordupbtn').click({force: true})
})	


it('HRA delete Landlord Details', function() {
	cy.get('#btnDeleteLandlordDetail').click({force: true})
})	


it('Income Tax Declaration Entry(incometax tab data save)', function() {
	cy.reload()
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	
	cy.server()      
	cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/SaveTaxDeclaration').as('SaveTaxDeclaration')
	//month validation 
		
	cy.get('#drpEffMonth').select('April',{force: true})

	cy.wait(1000)
    cy.get('#tblData > tbody > tr:nth-child(2) > td > .form-control').click()
	cy.get('#tblData > tbody > tr:nth-child(2) > td > .form-control').clear()
    cy.get('#tblData > tbody > tr:nth-child(2) > td > .form-control').type('3000')
 
    cy.get('#tblData > tbody > tr:nth-child(3) > td > .form-control').click()
	cy.get('#tblData > tbody > tr:nth-child(3) > td > .form-control').clear()
    cy.get('#tblData > tbody > tr:nth-child(3) > td > .form-control').type('4000')
 
    cy.get('#tblData > tbody > tr:nth-child(4) > td > .form-control').click()
	cy.get('#tblData > tbody > tr:nth-child(4) > td > .form-control').clear()
    cy.get('#tblData > tbody > tr:nth-child(4) > td > .form-control').type('2000')
	
	cy.get('[onclick="return validateTaxDec(this)').eq(0).click({force: true})
	
	cy.get('[onclick="return validateTaxDec(this)"]').eq(0).click({force: true})
	cy.wait('@SaveTaxDeclaration').its('status').should('eq', 200)
	
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Income Tax Declaration Saved Successfully !')			
	})
	cy.get(".toast-message").eq(0).click({force: true})
})	
	
	
		
it('Income Tax Declaration Entry(incometax tab data delete)', function() {
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(1000)
	cy.get('#drpEffMonth').select('April',{force: true})
	
	
	cy.server()      
	cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/DeleteTaxDeclaration').as('DeleteTaxDeclaration')
	cy.wait(2000)
	
	cy.get('[onclick="deleteRecordTaxDec(this)"]').eq(0).click({force: true})
	cy.wait('@DeleteTaxDeclaration').its('status').should('eq', 200)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Deleted Successfully !')			
	})
	
})
it('Income Tax Declaration Entry(incometax tab Lender data save)', function() {
	
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(3000)
	
	cy.get('[onclick="openLenderDetails()"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#drpEffMonth').select('April',{force: true})
	
	
	cy.get('#lendersvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill all the fields')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#LenderName').click({force: true})
		 cy.get('#LenderName').type('arun croll')
		}
	 })

	
	 cy.wait(2000)
	 cy.get('#lendersvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill all the fields')	{
		cy.wait(2000)
		cy.get(".toast-message").eq(0).click({force: true})
		 cy.get('#LenderAddress').click({force: true})
		 cy.get('#LenderAddress').type('testaddress')
		}
	 })
	 
	  cy.wait(2000)
	 cy.get('#lendersvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill all the fields')	{
		cy.wait(2000)
		cy.get(".toast-message").eq(0).click({force: true})
		  cy.get('#LenderPannumber').click({force: true})
		 cy.get('#LenderPannumber').clear()
		 cy.get('#LenderPannumber').type('dbssd67ds7u')
		}
	 })
	
	 cy.wait(2000)
	 cy.get('#lendersvbtn').click({force: true})  
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Invalid PAN Number1')	{
		cy.wait(2000)
		cy.get(".toast-message").eq(0).click({force: true})
		 cy.get('#LenderPannumber').click({force: true})
		 cy.get('#LenderPannumber').clear()
		 cy.get('#LenderPannumber').type('ASFFQ5674A')
		}
	 })
	
	cy.get('#lendersvbtn').click({force: true})  
	
	cy.wait(2000)
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Record Saved Successfully !')			
	})
})


it('Income Tax Declaration Entry(incometax tab Lender data edit)', function() {
	
	
	cy.wait(1000)
	cy.contains('button','Edit').click({force: true})
	
	cy.wait(2000)
	cy.get('#LenderName').then($input => {
		expect($input.val()).to.contain('arun croll')
	})
	
	cy.get('#LenderAddress').then($input => {
		expect($input.val()).to.contain('testaddress')
	})
	
	cy.get('#LenderPannumber').then($input => {
		expect($input.val()).to.contain('ASFFQ5674A')
	})
	
	
	cy.get('#LenderAddress').click({force: true})
	cy.get('#LenderAddress').clear()
	 cy.get('#LenderAddress').type('HRAlandloadtest')

	cy.wait(1000)
	cy.get('#lendersvbtn').click({force: true})
})

it('Income Tax Declaration Entry(incometax tab Lender data Delete)', function() {

 cy.xpath('//*[@id="tblLenderDetails"]/tr/td[4]/button[2]').click({force: true})
})

it('Income Tax Declaration Entry(incometax tab Let out details  save)', function() {
	
	cy.get('[onclick="openLetOutDetails()"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('[onclick="return saveLetOutDetails();"]').eq(0).click({force: true})
	cy.wait(3000)
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Data Saved successfully.!')			
	})


})


	



it('TAX Calculation setting  with ProofValue yes', function() {
	
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')	
		cy.wait(2000)
		cy.get('#incometax_detail_tab').click({force: true})
		cy.get('#IncomeTax_TAXCalculation').click({force: true})
		cy.wait(1000)
		cy.get('select[name=ITAXwith]').select('ProofValue',{force: true})
		cy.get('#Proof').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveTaxCalculation').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully !')
			cy.log(text.trim())
			cy.get(".toast-message").click({force: true})
		})
		
	})

it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		
		
	})

it('Income Tax Proof Entry with yes ', function() {
	
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	
	//click on save btn
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
	
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill atleast 1 amount greater than 0.!')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#grp-proofValue_0').click({force: true})
		 cy.get('#grp-proofValue_0').clear()
		 cy.get('#grp-proofValue_0').type('2000')
		}
	 })
	  cy.wait(2000)
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please Upload Document For Tax Section (House Rent Paid(Annual)) On Row Number 1')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		
		 cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#my_file').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})	
		
		}
	 })
	 cy.wait(2000)
	cy.get('#grp-proofValue_1').click({force: true})
	 cy.get('#grp-proofValue_1').clear()
	 cy.get('#grp-proofValue_1').type('3000')
	 
	cy.wait(1000)
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
	  cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please Upload Document For Tax Section (Total Amount Of Medical Bill Claimed) On Row Number 2')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		
		 
		}
	 })
	
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
})	




it('TAX Calculation setting  with ProofValue NO', function() {
	
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')	
		cy.wait(2000)
		cy.get('#incometax_detail_tab').click({force: true})
		cy.get('#IncomeTax_TAXCalculation').click({force: true})
		cy.wait(1000)
		cy.get('select[name=ITAXwith]').select('ProofValue',{force: true})
		cy.get('#Proof').select('No',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveTaxCalculation').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully !')
			cy.log(text.trim())
			cy.get(".toast-message").click({force: true})
		})
		
	})
	
	
it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		
		
	})

it('Income Tax Proof Entry with no ', function() {
	
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	
	//click on save btn
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill atleast 1 amount greater than 0.!')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#grp-proofValue_0').click({force: true})
		 cy.get('#grp-proofValue_0').clear()
		 cy.get('#grp-proofValue_0').type('2000')
		}
	 })
	cy.xpath('//*[@id="modalActionButtonDiv"]/div/button').click({force: true})
	cy.wait(2000)
	cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Data Updated Successfully')			
	})
	cy.get(".toast-message").click({force: true})
	
	//read the save data
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#grp-proofValue_0').then($input => {
		expect($input.val()).to.contain('2000')
	})
	
})



it('TAX Calculation setting  with AuthorisedValue (Yes) and  ProofValue(yes)  ', function() {
	
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')	
		cy.wait(2000)
		cy.get('#incometax_detail_tab').click({force: true})
		cy.get('#IncomeTax_TAXCalculation').click({force: true})
		cy.wait(1000)
		cy.get('select[name=ITAXwith]').select('AuthorisedValue',{force: true})
		cy.get('#Proof').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveTaxCalculation').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully !')
			cy.log(text.trim())
			cy.get(".toast-message").click({force: true})
		})
		
		cy.get('select[name=ITAXwith]').select('AuthorisedValue',{force: true})
		cy.get('#Proof').select('Yes',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveTaxCalculation').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully !')
			cy.log(text.trim())
			cy.get(".toast-message").click({force: true})
		})
		
		
	})



it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		
		
	})

it('Income Tax AuthorisedValue with yes (incometax and HRA)', function() {
	
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	
	//cy.server()      
	//cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/addProofEntry').as('addProofEntry')
	//click on save btn
	cy.contains('button',' Authorize').click({force: true})
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill atleast 1 amount greater than 0.!')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#grp-authorisedValue_0').click({force: true})
		 cy.get('#grp-authorisedValue_0').clear()
		 cy.get('#grp-authorisedValue_0').type('2000')
		}
	 })
	
	
	cy.get('#grp-authorisedValue_1').click({force: true})
	cy.get('#grp-authorisedValue_1').clear()
	cy.get('#grp-authorisedValue_1').type('2000')
	
	cy.contains('button',' Authorize').click({force: true})
	cy.wait(2000)
	//cy.wait('@addProofEntry').its('status').should('eq', 200)
	cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Data Updated Successfully')			
	})
	//cy.get(".toast-message").click({force: true})
	//HRAPlease enter Metro Days & Non-Metro Days for February month
	//cy.get('#HRA').click({force: true})
	
	
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#grp-authorisedValue_0').then($input => {
		expect($input.val()).to.contain('2000')
	})
	cy.get('#grp-authorisedValue_1').then($input => {
		expect($input.val()).to.contain('2000')
	})
	
	
})	
	
	
	
	it('TAX Calculation setting  with AuthorisedValue No', function() {
	
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')	
		cy.wait(2000)
		cy.get('#incometax_detail_tab').click({force: true})
		cy.get('#IncomeTax_TAXCalculation').click({force: true})
		cy.wait(1000)
		cy.get('select[name=ITAXwith]').select('AuthorisedValue',{force: true})
		cy.get('#Proof').select('No',{force: true})
		cy.wait(1000)
		cy.get('#btnSaveTaxCalculation').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved Successfully !')
			cy.log(text.trim())
			cy.get(".toast-message").click({force: true})
		})
		
	})



it('Search Specific Emp code you want to incometax process', function() {
		cy.wait(3000)
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(2000)
		cy.contains('li', 'Incometax test(CY5)').click({force: true})
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		
		
	})
	
	
	
	
	it('Income Tax AuthorisedValue with NO (incometax and HRA)', function() {
	
	cy.get('#itax_detail_tab').click({force: true})
	cy.wait(2000)
	cy.get('#IncomeTax_IncomeTaxDeclaration').click({force: true})
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	
	//cy.server()      
	//cy.route('POST', 'https://next.pockethrms.com/ITax/Transaction/addProofEntry').as('addProofEntry')
	//click on save btn
	cy.contains('button',' Authorize').click({force: true})
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please fill atleast 1 amount greater than 0.!')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		 cy.get('#grp-authorisedValue_0').click({force: true})
		 cy.get('#grp-authorisedValue_0').clear()
		 cy.get('#grp-authorisedValue_0').type('2000')
		}
	 })
	
	
	cy.get('#grp-authorisedValue_1').click({force: true})
	cy.get('#grp-authorisedValue_1').clear()
	cy.get('#grp-authorisedValue_1').type('2000')
	
	cy.contains('button',' Authorize').click({force: true})
	cy.wait(2000)
	//cy.wait('@addProofEntry').its('status').should('eq', 200)
	cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Data Updated Successfully')			
	})
	
	//HRAPlease enter Metro Days & Non-Metro Days for February month
	//cy.get('#HRA').click({force: true})
	
	
	cy.wait(2000)
	cy.get('#proofentry').check({force: true})
	cy.wait(2000)
	cy.get('[onclick="clickbutton(this)"]').eq(0).click({force: true})
	cy.wait(2000)
	cy.get('#grp-authorisedValue_0').then($input => {
		expect($input.val()).to.contain('2000')
	})
	cy.get('#grp-authorisedValue_1').then($input => {
		expect($input.val()).to.contain('2000')
	})
	
	
})


	

it('Form 12BA save', function() {
		cy.reload()
	cy.get('#itax_detail_tab').click({force: true})
	
	cy.wait(2000)
	cy.get('#IncomeTax_Form12BA').click({force: true})
	cy.server()      
	cy.route('POST', 'https://next.pockethrms.com/Itax/Transaction/SaveForm12BA').as('form12B')
	cy.wait(2000)
	cy.get('#formAmount_0').click({force: true})
	cy.get('#formAmount_0').clear()
	cy.get('#formAmount_0').type('2000')

	
	cy.get('#formAmount_1').click({force: true})
	cy.get('#formAmount_1').clear()
	cy.get('#formAmount_1').type('1000')
	
	
	cy.get('#formAmount_2').click({force: true})
	cy.get('#formAmount_2').clear()
	cy.get('#formAmount_2').type('1000')
	
	
	cy.get('[onclick="insertRecord()"]').eq(0).click({force: true})
	
	
	cy.wait('@form12B').its('status').should('eq', 200)
	
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Data saved successfully.!')			
	})
	cy.wait(2000)
	cy.get(".toast-message").eq(0).click({force: true})
})	

it('Form 12BA delete', function() {
	cy.wait(2000)
	cy.get('[onclick="deleteRecord()"]').eq(0).click({force: true})
	
	cy.wait(2000)
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Data deleted successfully.!')			
	})
})	

it('IncomeTax Process', function() {

	cy.wait(1000)
	cy.get('#IncomeTax_IncomeTaxProcess').click({force: true})
	cy.wait(2000)
	cy.get('#month').select('April',{force: true})
	
	cy.get('#ProofWise').check({force: true})
	cy.wait(1000)
	cy.get('#btnProcess').click({force: true})
	
	cy.wait(4000)
	//because of dynamic api so that put wait intensoily
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Income Tax Process Completed Successfully')			
	})
	cy.get(".toast-message").click({force: true})
	})
	
it('Interest Free Loan Perquisite', function() {

		cy.wait(1000)
		cy.get('#IncomeTax_InterestFreeLoanPerquisite').click({force: true})
		cy.wait(2000)
		
		cy.get('[onclick="getData()"]').click({force: true})
			
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select From Month')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#drpfromMonth').select('April',{force: true})
			}
		
		})
		
		cy.wait(2000)
		cy.get('[onclick="getData()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Select Other Income Field')	{
			cy.wait(2000)
			cy.get(".toast-message").click({force: true})
			cy.get('#otherincome').select('Interest on Housing Property - [Let Out]',{force: true})
			}
		
		})
		cy.get('[onclick="getData()"]').click({force: true})
		
		cy.wait(4000)
		 cy.get("#previousvalue").invoke('text').then((text) => {
				cy.log(text.trim())
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