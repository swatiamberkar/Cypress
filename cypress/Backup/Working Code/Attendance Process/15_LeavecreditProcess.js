describe('Leave Credit setting', function() {
    var company='Test_25';
	
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
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
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
	
	
	
	Cypress.Commands.add('Leavecreditsetting_CL',()=>{
		cy.wait(2000)
       cy.get('#leav').select('CL',{force: true})
		//button enable check
		cy.get('#btnAdd').should('not.be.disabled')
	
		cy.server()      
		cy.route('POST', 'https://next.pockethrms.com/Leave/Setting/LeaveCredit').as('Leavecredit')
	
		cy.get('#btnAdd').click({force: true})
		cy.wait(1000)
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Valid Credit Based On.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#leavCrBasedOn').select('Date of Joining',{force: true})
			}
		 })
		 cy.wait(2000)
		 cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter the Valid Date.')	{
				cy.wait(1000)
				cy.get(".toast-message").eq(0).click({force: true})
				  cy.get('#crEffFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2023')
				})
			}
		 })
		 
		 cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Enter Monthly Credit Days.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#monCrDays').click({force:true})
				cy.get('#monCrDays').clear()
				cy.get('#monCrDays').type('2')
			}
		 })
		
		 cy.wait(2000)
		cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Select Between DOJ.')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('#crEmpjoin').select('0',{force: true})
			}
		 })
		 
		  cy.wait(2000)
		  cy.get('#btnAdd').click({force: true})
		  cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Credit Effective Date should be between Financial Year.')	{
				cy.wait(1000)
				cy.get(".toast-message").eq(0).click({force: true})
				  cy.get('#crEffFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
				})
			}
		 })
		 
		
		cy.get('#eligDays').click({force:true})
		cy.get('#eligDays').clear()
		cy.get('#eligDays').type('24')
		
		cy.get('#crRounding').select('NIL',{force: true})
				
		cy.wait(2000)
		cy.get('#leavCrCalAfter').click({force:true})
		cy.get('#leavCrCalAfter').clear()
		cy.get('#leavCrCalAfter').type('1')
		
		cy.get('#monCrDays').click({force:true})
		cy.get('#monCrDays').clear()
		cy.get('#monCrDays').type('2')
	
		cy.get('#btnAdd').click({force: true})
		cy.wait('@Leavecredit').its('status').should('eq', 200)
	
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully!!!')			
		})
	   
	   
        })
	
	it('Leave Credit setting for CL (staff)', function() {
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#Leave_LeaveCredit').click({force:true})
		
		
		//button disable check
		cy.get('#btnAdd').should('be.disabled')
		
		cy.get('#ddDynamic').select('Staff',{force: true})
		cy.wait(1000)
		cy.Leavecreditsetting_CL();
	})
	
	
	it('Leave Credit setting for CL (admin)', function() {
		
		//button disable check
		cy.get('#btnAdd').should('be.disabled')
		
		cy.get('#ddDynamic').select('Admin',{force: true})
		cy.wait(1000)
		cy.Leavecreditsetting_CL();
	})
	
	
	it('Leave Opening',function() {	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		
		cy.get('#leavType').select('CL',{force: true})
		
		cy.wait(4000)
		
		cy.get('#tableSorter').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)').invoke('text').then((text) => {
					 
					
					cy.log(text.trim())
					if(text.trim()=='CY2'){
							cy.log(i)
						
						var id="lstEmployeeDetail_"+i+"__LeaveOpening";
						cy.wait(2000)
						cy.get('input[type="text"]').eq(i).click({force: true})
						cy.get('input[type="text"]').eq(i).clear()
						cy.get('input[type="text"]').eq(i).type('16')
					}
					
					if(text.trim()=='CY3'){
							cy.log(i)
						cy.get('input[type="text"]').eq(i).click({force: true})
						cy.get('input[type="text"]').eq(i).clear()
						cy.get('input[type="text"]').eq(i).type('24')
					}
					
					if(text.trim()=='CY4'){
							cy.log(i)
						cy.get('input[type="text"]').eq(i).click({force: true})
						cy.get('input[type="text"]').eq(i).clear()
						cy.get('input[type="text"]').eq(i).type('30')
					}
				})
			
				}
				
		})
		
		
	cy.get('[onclick="return Validate();"]').click({force: true})
	
	cy.wait(5000)
		cy.get(".alert-warning").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data Saved Successfully.!')
		})
	})
	
	
	it('Leave Credit Process april',function() {
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		
		cy.wait(2000)
		
		
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('30/04/2020')
	   })
		cy.get('[onclick="validate()"]').eq(0).click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Process Over')			
		})
		
	})
	
	
	it('Leave Opening check for one month(April)',function() {	
	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		
		cy.get('#leavType').select('CL',{force: true})
		
		cy.wait(4000)
		
		
		
		cy.get('#tableSorter').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)').invoke('text').then((text) => {
					 
					
					cy.log(text.trim())
					if(text.trim()=='CY2'){
							cy.log(i)
							
							cy.get('#tableSorter').contains('td', '2').should('be.visible');
						
					}
					
					if(text.trim()=='CY3'){
						cy.get('#tableSorter').contains('td', '0').should('be.visible');
					}
					
					cy.get('#tableSorter').contains('td', '-6',).should('be.visible');
					
				})
			
				}
				
		})
	
	})
	
	
	it('Leave Credit Process May',function() {
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		
		cy.wait(2000)
		
		
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/05/2020')
	   })
		cy.get('[onclick="validate()"]').eq(0).click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Process Over')			
		})	
	})
	
	
	
	
	it('Leave Opening check for two month (May)',function() {	
	
		cy.visit('https://next.pockethrms.com/Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		cy.get('#leavType').select('PL',{force: true})
		
		cy.wait(4000)
			
		cy.get('#tableSorter').find('tr').each(function(row, i){
				if(i!=0){
				//console.log(i)
				var num1 = parseFloat(i)
				 cy.get('.earngBlock > #tableSorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)').invoke('text').then((text) => {
					cy.log(text.trim())
					if(text.trim()=='CY2'){
							cy.log(i)
							cy.get('#tableSorter').contains('td', '4').should('be.visible');
					}
					
					if(text.trim()=='CY3'){
						cy.get('#tableSorter').contains('td', '0').should('be.visible');
					}
					
					
					if(text.trim()=='CY4'){
							cy.log(i)
						cy.get('#tableSorter').contains('td', '-6').should('be.visible');
					}
				})
			
				}
				
		})
	
	})
	
	
	it('Leave Credit finical year  validation',function() {
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeaveCredit')
		
		cy.wait(2000)
		 cy.get('#pDate').click({force: true}).then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/03/2021')
	   })
		cy.get('[onclick="validate()"]').eq(0).click({force: true})
		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Last Process Date should be less than or equal to 12/31/2020 12:00:00 AM')			
		})	
	})
	
})	
	