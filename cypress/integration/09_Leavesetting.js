describe('Leave Setting ', function() {
	
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
	
	
	it('LeaveSetting-financial year',function() {	
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#Leave_DefineCalendar').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(1000)
		cy.get('input[name="start"]').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020')
	    })
		cy.get('input[name="end"]').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('31/03/2021')
	    })
		cy.get('#drpDefault').select('Yes',{force: true})
		cy.get('#ddComponent').select('COMPCODE')
		cy.get('#ddHoli').select('COMPCODE')
		cy.get('#ddLeaveCredit').select('CATEGORY')
		cy.get('#ddWeekOff').select('COMPCODE')
		cy.get('#ddCompOff').select('COMPCODE')
		cy.get('#btnSaveFinSet').click( {force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())		
			expect(text.trim()).equal('Records Saved Successfully!!!')			
		})
	})

	it('Add_NewLeave_PL', function() {
			cy.wait(2000)
			cy.get('#Leave_LeaveDefinition').click( {force: true})
			cy.wait(2000)
			cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
			cy.wait(2000)
			cy.get('#leavName').type('PL')
			cy.get('#leavDesc').type('Paid Leave')
			cy.get('#leavCategory').select('EL')
			cy.get('#leavOpen').select('REQUIRED',{force:true})
			cy.wait(1000)
			cy.get('#leaveType').select('Day Wise',{force: true})
			cy.get('#catall').check({force:true})
			cy.get(' #btnLeaveDefinationSave').click({force:true})
			cy.wait(1000)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Records Saved Successfully!!!')		
			})
		cy.get(".toast-message").click({force:true})
   
	})
 
	it('Add_NewLeave_COFF', function() {
			cy.wait(2000)
			cy.get('#Leave_LeaveDefinition').click({force: true})
			cy.wait(2000)
		    cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
			cy.wait(2000)
			cy.get('#leavName').click({force:true})
			cy.get('#leavName').type('COFF')
			cy.get('#leavDesc').type('COFF') 
			cy.get('#leavCategory').select('COMPENSATORY OFF',{force:true})
			cy.get('#leavOpen').select('REQUIRED',{force:true})
			cy.wait(1000)
			cy.get('#leaveType').select('Day Wise',{force: true})
			cy.get('#catall').check({force:true})
			cy.wait(1000)
			cy.get(' #btnLeaveDefinationSave').click({force:true})
		   
	})
 
	it('Add_NewLeave_CL', function() {
			cy.wait(1000)
			cy.get('#Leave_LeaveDefinition').click( {force: true})
			cy.wait(2000)
		    cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
		    cy.wait(2000)
		    cy.get('#leavName').click({force:true})
		    cy.get('#leavName').type('CL')
			cy.get('#leavDesc').type('Casual Leave')
			cy.get('#leavCategory').select('CL')
			cy.get('#leavOpen').select('REQUIRED',{force:true})
			cy.wait(1000)
			cy.get('#leaveType').select('Day Wise',{force: true})
			cy.get('#catall').check({force:true})
			cy.wait(1000)
			cy.get(' #btnLeaveDefinationSave').click({force:true})
		   
	})
	
	it('Add_NewLeave_SpecialLeave with Leavetype(hourly) ', function() {
			cy.wait(1000)
			cy.get('#Leave_LeaveDefinition').click( {force: true})
			cy.wait(2000)
		    cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
		    cy.wait(2000)
		    cy.get('#leavName').click({force:true})
		    cy.get('#leavName').type('SpecialLeave')
			cy.get('#leavDesc').type('SpecialLeave')
			cy.get('#leavCategory').select('BL')
			cy.wait(1000)
			cy.get('#leaveType').select('Hourly',{force: true})
			cy.wait(1000)
			cy.get('#catall').check({force:true})
			cy.wait(1000)
			cy.get('#btnLeaveDefinationSave').click({force:true})
		   
	})
 
	it('Weekly Off', function() {
			cy.wait(1000)
			cy.server()      
			cy.route('POST', 'https://next.pockethrms.com/Leave/Setting/processWeekOff').as('postComment')
			cy.wait(2000)
			cy.get('#Leave_WeeklyOff').click({force:true})
			cy.wait(1000)
			cy.get('#listWeekDays_0__DayChecked').check({force:true})
			cy.wait(1000)
			cy.get('#listWeekDays_6__DayChecked').check({force:true})
			cy.wait(2000)
			cy.get('#btnProcess').click({force:true})	
			cy.wait('@postComment').its('status').should('eq', 200)
			cy.get('#chkAllDates').check({force:true})
			cy.wait(1000)
			cy.get('#btnSave').click({force:true})
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())					
			})
		 })
	 

	it('Holiday for 25/03/2020 ', function() {
		cy.wait(1000)
		cy.get('#Leave_Holiday').click({force:true})
		cy.wait(1000)
		cy.get('[title="Add New Holiday"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#HolidayDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('25/03/2020')
		})
		cy.get('#HolidayReason').click({force: true})
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type('Holi holiday')
		cy.get('#chkOptional').select('No',{force: true})
		cy.get('#btnSaveFinSet').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())					
		})
	}) 
	
	it('Holiday 06/01/2020', function() {
		cy.wait(1000)
		cy.get('#Leave_Holiday').click({force:true})
		cy.wait(2000)
		cy.get('[title="Add New Holiday"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#HolidayDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/01/2020')
		})
		cy.get('#HolidayReason').click({force: true})
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type('test holiday')
		cy.get('#chkOptional').select('No',{force: true})
		cy.get('#btnSaveFinSet').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())				
		})
	}) 
	
	it('Holiday 08/03/2020', function() {
		cy.wait(1000)
		cy.get('#Leave_Holiday').click({force:true})
		cy.wait(2000)
		cy.get('[title="Add New Holiday"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#HolidayDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/03/2020')
		})
		
		cy.get('#HolidayReason').click({force: true})
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type('meri christmas holiday')
		cy.get('#chkOptional').select('No',{force: true})
		cy.get('#btnSaveFinSet').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
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
 
