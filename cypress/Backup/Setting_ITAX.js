describe('Income Tax Setting', function() {
	
	var company ='Test_77'
	var employeeCode ='test01'
	
	before(function() {
    	cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus') 
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
		cy.getCookie('.AspNetCore.Session').should('be.null')
		cy.getCookie('new_username').should('be.null')
		cy.getCookie('FavouriteMenus').should('be.null')
		cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
	})

	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gcl_au','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
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
	
	
	
	it('Navigate to Income Tax Setting', function() {
		cy.wait(1000)
		
		cy.server()
		cy.route('GET', '*').as('getComment')
		cy.route('POST', '*').as('postComment')		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})		
		cy.wait('@getComment').its('status').should('eq', 200)
		cy.wait('@postComment')
			
		cy.get('#incometax_detail_tab').click({force: true})		
		cy.wait(1000)		
	})

	
	it('Financial Year Setting', function() {
		//click on finical year tab
		cy.get('#financialYr').click({force: true})
		cy.get('span').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//span[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='itaxContentTitle']//i[@class='fas fa-plus']").click();
		}
		})
		
		//cy.get('[title="Add new financial year"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#txtSDate').then(input => {
			input.val('01/04/2019');
	   })
		cy.wait(2000)
		cy.get('#txtEDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/03/2020')
	   })
	   
	   cy.get('#txtTanNo').click({force: true})
	   cy.get('#txtTanNo').clear()
		cy.get('#txtTanNo').type('1234567');
		
		cy.get('#txtTDSCircle').click({force: true})
		cy.get('#txtTDSCircle').clear()
		cy.get('#txtTDSCircle').type('Mumbai');
		
		cy.get('#txtPanNo').click({force: true})
		cy.get('#txtPanNo').clear()
		cy.get('#txtPanNo').type('ARMFJ34H');
		
		cy.get('#txtTDSAccNo').click({force: true})
		cy.get('#txtTDSAccNo').clear()
		cy.get('#txtTDSAccNo').type('5485346788');
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeCode)
		//cy.get('input[type="search"]').type('ARMFJ34H')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		
		cy.get('#txtPlace').click({force: true})
		cy.get('#txtPlace').type('Ulhasnagar');
		
		cy.get('#txtEduCess').click({force: true})
		cy.get('#txtEduCess').type('4');
		
		cy.get('#txtHRARent').click({force: true})
		cy.get('#txtHRARent').clear()
		cy.get('#txtHRARent').type('10');
		
		cy.get('#txtMetroPercent').click({force: true})
		cy.get('#txtMetroPercent').clear()
		cy.get('#txtMetroPercent').type('50');
		
		cy.get('#txtNonMetroPercent').click({force: true})
		cy.get('#txtNonMetroPercent').clear()
		cy.get('#txtNonMetroPercent').type('40');
		
		//cy.get('[type="checkbox"]').check('EB',{force: true})
		
		//cy.get('#chkDefault').check({force: true})
		
		cy.wait(2000)
		cy.get('#btnSaveFinSet').click({force: true})
		
	})
	
	it('Income Matching for Earnings fields', function() {
		//click on Income Matching tab
		cy.xpath("//*[@id='incometax_detail']//label/span[@data-target='#IncomeMatchingSubMenus']").click({force: true})
		cy.wait(2000);
		//click on sub menu
		cy.get('#incomeMatch').click({force: true})
		
		cy.wait(2000)
		
		 cy.readFile('D:/CyPress Demo/cypress/fixtures/ITAX.json').then((text) =>{
                 text.forEach(function(entry) {	
				 
		var field = entry.Earnings
		cy.log('field '+ field)		
		cy.wait(500)	
		
		
		cy.get('#tableSorter > tbody').find('tr').each(function(row, i){
			
			//if(i!=0){
			console.log(i)
			var num1 = parseFloat(i)+1
		
			 cy.get('.table-responsive > #tableSorter > tbody > .trData:nth-child('+num1+') > td:nth-child(2)').invoke('text').then((text) => {
				cy.log(text.trim())
				
				if(text.trim()==field){
					cy.get('#tableSorter > tbody > .trData:nth-child('+num1+') > td > .btn').click()
					cy.wait(2000)
				
				cy.get('#drpMatching').select(entry.MatchingComponent,{force: true})
				cy.get('#drpExemption').select(entry.ExemptionComponent,{force: true})
				cy.get('#drpProjection').select(entry.Projection,{force: true})
				cy.get('#drpGrossSection').select(entry.GrossSection,{force: true})
			
				cy.get('#txtFormula').click({force: true})
				cy.get('#txtFormula').clear()
				cy.get('#txtFormula').type(entry.OtherComponents);
				
				cy.get('#txtOrder').click({force: true})
				cy.get('#txtOrder').clear()
				cy.get('#txtOrder').type(entry.OrderNo);
				
				cy.get('#drpOperator').select(entry.Operator,{force: true})
				
				cy.wait(1000)
				
				cy.get('#btnSaveIncomeMatching').click({force: true})
				cy.wait(2000)
				cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Record Saved successfully !')
				
		})
					
				}
			})
		
			//}
			
		})
				 })
		 })
	
	})	
	
	
	
	it('Navigate to Bank Details', function() {
		cy.wait(1000)
		cy.xpath("//span[contains(text(),'Tax Settings')]").click({force: true})
		cy.wait(1000)	
		cy.get('#bankDetails').click({force: true})
		cy.wait(1000)
		
	})

/*
	it('Verify Title of Bank Details Page', function() {
		cy.wait(1000)
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Bank Details');		
	})

	
	
	it('Verify Close Symbol of Add Bank Details Popup', function() {
		cy.get('button').then(($sp) => {
		cy.wait(1000)
    if ($sp.hasClass('mb-1')) {
       cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
    } else {
      cy.xpath("//div[@id='itaxContentTitle']//i[@class='fas fa-plus']").click({force: true})
    }
	})
	cy.wait(1000)
		cy.get("#myLargeModalLabel")
		.should('contain', 'Add Bank Details');	
		cy.wait(1000)
		cy.xpath("//div[@class='modal-header']//button[@class='close'][contains(text(),'×')]").click({force: true})
		cy.wait(1000)
		cy.get('#myLargeModalLabel').then($button => {
			cy.log($button.is(':visible'))
			cy.get('#myLargeModalLabel').should('not.be.visible')   
		})		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Bank Details');			
	})
	
	
	

	 it('Verify Alert in Add Bank Details Popup', function() {
		var bankName = 'HDFC NEW'
		var bankCode = 'HDFC_01'
		
		cy.get('button').then(($sp) => {
		cy.wait(1000)
    if ($sp.hasClass('mb-1')) {
       cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
    } else {
      cy.xpath("//div[@id='itaxContentTitle']//i[@class='fas fa-plus']").click({force: true})
    }
	})
		cy.wait(1000)	
		
			
		const stub = cy.stub()  
		cy.on ('window:alert', stub)
		cy.get('#btnAddBankDetail').click({force: true}).then(() => {
			expect(stub.getCall(0)).to.be.calledWith('Bank Name is Empty')
        })
   
		cy.wait(3000)	
		cy.get('#txtBankName').type(bankName)
		cy.get('#btnAddBankDetail').click({force: true})
		


		cy.wait(3000)	
		const stub1 = cy.stub()  
		cy.on ('window:alert', stub1)
		cy.get('#btnAddBankDetail').click({force: true}).then(() => {
			expect(stub1.getCall(1)).to.be.calledWith('Code is Empty')
		})
		
		//cy.xpath("//div[@class='modal-header']//button[@class='close'][contains(text(),'×')]").click({force: true})
		cy.wait(1000)
		
		
	})
	
	
	
	it('Verify Close Button of Add Bank Details Popup', function() {
		
		cy.wait(1000)		
		cy.get('.btn-danger').click({force: true})
		cy.wait(1000)	
		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Bank Details');			
	})
	
	*/
	
	it('Add & Verify Bank Details', function() {
		var bankName = 'HDFC NEW'
		var bankCode = 'HDFC_01'
		
		cy.get('button').then(($sp) => {
		cy.wait(1000)
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click();
		} else {
		cy.xpath("//div[@id='itaxContentTitle']//i[@class='fas fa-plus']").click({force: true})
		}
		})
	
		cy.wait(1000)
		cy.get('#txtBankName').clear()
		cy.get('#txtBankName').type(bankName)
		cy.get('#txtBSRCode').clear()		
		cy.get('#txtBSRCode').type(bankCode)
		cy.get('#btnAddBankDetail').click({force: true})
		
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Save Successfully')
				cy.log(text.trim())
		})
		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Bank Details');		
		
		cy.get('.align-self-center ').find('h4').then(listing => {
				var bankLength = Cypress.$(listing).length;
				cy.log(bankLength)
					
					cy.get(".align-self-center > h4").eq(bankLength-1).invoke('text').then((text) => {
					cy.log(text.trim())
					expect(text.trim()).equal(bankName)				
					})
				
					cy.get(".align-self-center >ul>li").eq(bankLength-2).invoke('text').then((text) => {
					cy.log(text.trim())
					expect(text.trim()).equal(bankCode)		
					})
		})		
	})
	
	
	
/*	
	it('Update & Verify Add Bank Details', function() {
		cy.get(".text-right > .mr-2").eq(1).click()
		cy.wait(1000)
		cy.get("#myLargeModalLabel")
		.should('contain', 'Update Bank Details');	
		cy.wait(1000)		
	})
	
	
	
	it('Delete Bank Details', function() {
		var len_beforeDelete=''
		var len_afterDelete =''
		
		cy.get('.align-self-center').find('h4').then(listing => {
				len_beforeDelete = Cypress.$(listing).length;
				cy.log(len_beforeDelete)
		})
		
		cy.get(".text-right > a> .text-danger").eq(1).click()
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Record deleted successfully.!')			
		})
		cy.wait(5000)
		cy.get('.align-self-center').find('h4').then(listing => {
				len_afterDelete = Cypress.$(listing).length;
				cy.log(len_afterDelete)
				
		expect(len_beforeDelete-1).equal(len_afterDelete)
		})		
	})
	
	*/
	
	
	it('Tax Settings CIT Address', function() {
		//click on CIT Address
		cy.get('#citAddress').click({force: true})
		cy.wait(2000)
		
		cy.get('#CITAddress').click({force: true})
		cy.get('#CITAddress').clear()
		cy.get('#CITAddress').type('mumbai');
			
		cy.get('#Address').click({force: true})
		cy.get('#Address').clear()
		cy.get('#Address').type('mumbai');
		
		cy.get('#City').click({force: true})
		cy.get('#City').clear()
		cy.get('#City').type('mumbai');
		
		cy.get('#PinCode').click({force: true})
		cy.get('#PinCode').clear()
		cy.get('#PinCode').type('761012');
		
		cy.wait(1000)
		cy.get('#btnSaveCITAddress').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Save Successfully')
				cy.log(text.trim())
				cy.get(".toast-message").click({force: true})
		})
		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'CIT Address');		
	})
		

	
	it('Tax Settings Gratuity & Leave Encash', function() {
		//click on CIT Address
		cy.get('#GratuityLeaveEncash').click({force: true})
		cy.wait(2000)
		
		cy.get('#AvgSal').click({force: true})
		cy.get('#AvgSal').clear()
		cy.get('#AvgSal').type('12');
			
		cy.get('#GratuityMax').click({force: true})
		cy.get('#GratuityMax').clear()
		cy.get('#GratuityMax').type('12');
		
		cy.get('#LeaveMax').click({force: true})
		cy.get('#LeaveMax').clear()
		cy.get('#LeaveMax').type('12');
		cy.wait(1000)
		cy.get('#btnSaveGratuityAndLeaveEncash').click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Saved Successfully !')
				cy.log(text.trim())
				cy.get(".toast-message").click({force: true})
		})
		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Gratuity & Leave Encash');		
		
	})	

	it('TAX Calculation', function() {
	   cy.get('#taxCalculation').click({force: true})
		cy.wait(1000)
	
		cy.get('#pfComp').select('Master',{force: true})
		cy.get('#Deduction').select('Yes',{force: true})
		cy.get('#Prorate').select('Yes',{force: true})
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
		
		cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
		.should('contain', 'Tax Calculation');		
		
	})		
	
	
	
	
	
})	
	