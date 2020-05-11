describe('Add Earnings  Fields ', function() {
	
	var company ='DDuwEm';
	const typeOptions = {delay: 35};
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
		cy.get('#Email').type('administrator@bhagya.com',typeOptions)
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
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
	cy.wait(2000)
	})
	


/*
	
	it('LeaveSetting-financial year',function() {	
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		
		cy.wait(1000)
		
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#calDefine').click({force:true})
		
		cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(1000)
		cy.get('input[name="start"]').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/05/2019')
	    })
		cy.get('input[name="end"]').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/05/2019')
	    })
		cy.get('#drpDefault').select('Yes',{force: true})
	
		cy.get(' #ddComponent').select('COMPCODE')
	 
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
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
			cy.wait(1000)
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(1000)
			cy.get('#leaveDefine').click( {force: true})
			cy.wait(2000)
			cy.get('[title="Leave Defination"]').eq(0).click({force: true})
			
			
		cy.get('#leavName').type('PL')
		cy.get('#leavDesc').type('Paid Leave')
	 
		cy.get('#leavCategory').select('EL')
		cy.get('#catall').check({force:true})
		cy.get(' #btnLeaveDefinationSave').click({force:true})
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())		
			expect(text.trim()).equal('Records Saved Successfully!!!')
						
	})
	
   
 })
 
	it('Add_NewLeave_COFF', function() {
		
		cy.get('#leave_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#leaveDefine').click( {force: true})
		cy.wait(1000)
	   cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
		cy.wait(2000)
		cy.get('#leavName').click({force:true})
		cy.get('#leavName').type('Coff')
	 
		cy.get('#leavDesc').type('COMPENSATORY OFF') 
		cy.get('#leavCategory').select('COMPENSATORY OFF',{force:true})
		cy.get('#catall').check({force:true})
		cy.wait(1000)
		cy.get(' #btnLeaveDefinationSave').click({force:true})
	   
	})
 
	 it('Add_NewLeave_CL', function() {
	 
		cy.get('#leave_detail_tab').click( {force: true})
		cy.wait(1000)
		cy.get('#leaveDefine').click( {force: true})
		cy.wait(2000)
	   cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click({force: true});
	   cy.wait(2000)
	   cy.get('#leavName').click({force:true})
		cy.get('#leavName').type('CL')
	 
		cy.get('#leavDesc').type('Casual Leave')
	 
		cy.get('#leavCategory').select('CL')
	 
		cy.get('#catall').check({force:true})
		cy.wait(1000)
		cy.get(' #btnLeaveDefinationSave').click({force:true})
	   
	 })
 
 */
 
	 it('Weekly Off', function() {
		 cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		 cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#weeklyOff').click({force:true})
		cy.wait(1000)
		
		cy.get('#listWeekDays_0__DayChecked').check({force:true})
		cy.get('#listWeekDays_6__DayChecked').check({force:true})
		
		cy.get('#btnProcess').click({force:true})
		
		cy.wait(3000)
		
		cy.get('#chkAllDates').check({force:true})
		 
		 cy.wait(1000)
		 cy.get('#btnSave').click({force:true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())		
		
					
		})
		 
	 })
	 
	 
	 it('Holiday for 25/12/2019 ', function() {
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#holiday').click({force:true})
		
		cy.wait(1000)
		
		cy.get('[title="Add New Holiday"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#HolidayDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('25/12/2019')
		})
		
		cy.get('#HolidayReason').click({force: true})
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type('test holiday')
		
		cy.get('#chkOptional').select('No',{force: true})
		
		cy.get('#btnSaveFinSet').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())		
		
					
		})
	}) 
	
	it('Holiday 06/01/2020', function() {
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#holiday').click({force:true})
		
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
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())				
		})
	}) 
	
	it('Holiday 14/02/2020', function() {
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#holiday').click({force:true})
		
		cy.wait(2000)
		
		cy.get('[title="Add New Holiday"]').eq(0).click({force: true})
		cy.wait(1000)
		
		cy.get('#HolidayDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('14/02/2020')
		})
		
		cy.get('#HolidayReason').click({force: true})
		cy.get('#HolidayReason').clear()
		cy.get('#HolidayReason').type('Valentines holiday')
		
		cy.get('#chkOptional').select('No',{force: true})
		
		cy.get('#btnSaveFinSet').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())				
		})
	})
	
	/*
	it('Navigate Employee list and open EmpWizard', function() {
		
	   cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
	   cy.wait(2000)
	   cy.get('[onclick="getEmployeeWizard();"]').click({force: true})
	})

	it('Employee wizard Basic Details', function() {
		var  empid=0;
		cy.wait(3000)
		cy.get("#empWizardTitle").then(($span) => {
             var basicdetailsheadertext = $span.text();
			   expect(basicdetailsheadertext).equal('Basic Details')
       })
		cy.get("#msgs").then(($span) => {
             var creditBalance = $span.text();
				if(creditBalance!=''){
				 creditBalance=creditBalance.replace(/[^0-9]+/ig,"");
				creditBalance=parseInt(creditBalance)+1;
				empid="cy"+creditBalance;
				cy.get('input[name=code]').click({force: true})
				cy.get('input[name=code]').type(empid)
				deviceno=empid;
				}
				else if(creditBalance==''){
					cy.get('input[name=code]').click({force: true})
					cy.get('input[name=code]').type('cy01')
					deviceno='cy01';
				}
       })
	
	 cy.get('input[name=fname]').click({force: true})		
	 cy.get('input[name=fname]').type('Krishna')
	 cy.get('input[name=lname]').click({force: true})	
	 cy.get('input[name=lname]').type('Nayak')
	 cy.contains('Male').click()
	 cy.get('select[name=category]').select('Admin')
	 cy.get('select[name=ptlocation]').select('Karnataka')
	cy.wait(1000)
	cy.get('#txt_dateofbirth').click().then(input => {
       input[0].dispatchEvent(new Event('input', { bubbles: true }))
        input.val('01/12/1995')
   })
   
	cy.wait(1000)
	cy.get('#txt_dateofjoining').then(input => {
			input.val('02/04/2018');
	})
	
	cy.wait(1000)
	cy.get('select[name=esilocation]').select('Pune',{force: true})
	cy.get('select[name=metro]').select('Metro',{force: true})
	cy.get('select[name=esidispensary]').select('Mumbai',{force: true})
	cy.wait(1000)
	cy.get('#btnSaveBasicDetail').click({force: true})
	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
		cy.log(text.trim())
	})  
	cy.get(".toast-message").click({force: true})
		
	})


		
	it('Employee wizard Employee Details', function() {
		
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Employee Details')
       })
	   
	   cy.wait(2000)
	    cy.get('input[name=FATHERNAME]').click({force: true})		
		cy.get('input[name=FATHERNAME]').type('subhash')
		
		 cy.get('select[name=DEPARTMENT]').select('HR',{force: true})
		 cy.get('select[name=DESIGNATION]').select('Salesman',{force: true})
		 cy.get('select[name=MARITALSTATUS]').select('Single',{force: true})
		 cy.get('input[name=CONFIRMATIONPERIOD]').click({force: true})
		 cy.get('input[name=CONFIRMATIONPERIOD]').clear()
		 cy.get('input[name=CONFIRMATIONPERIOD]').type('3')
		
		cy.get('input[name=RETIREMENTAGE]').click({force: true})
		cy.get('input[name=RETIREMENTAGE]').clear()
		cy.get('input[name=RETIREMENTAGE]').type('58')
		
		//cy.get('input[name=PFACCNO]').click({force: true})
		//cy.get('input[name=PFACCNO]').type('ASDFE8')
		
		//cy.get('input[name=ESINO]').click({force: true})
		//cy.get('input[name=ESINO]').type('44445755')
		
		cy.get('select[name=GRADE]').select('A',{force: true})
		
		cy.get('input[name=CHILDREN]').click({force: true})
		cy.get('input[name=CHILDREN]').clear()
		cy.get('input[name=CHILDREN]').type('2')
		
		cy.get('select[name=COSTCENTRE]').select('Mumbai',{force: true})
		cy.get('select[name=BRANCH]').select('Mumbai',{force: true})
	   
	   // cy.get('input[name=PANNO]').click({force: true})
		//cy.get('input[name=PANNO]').type(makeid(10))
		
		cy.get('input[name=UANNUMBER]').click({force: true})
		cy.get('input[name=UANNUMBER]').type('124354ERT459')
	   cy.get('input[name=EMPPF]').then($input => {
				expect($input.val()).to.contain('3.67')
	   })
	  
	   cy.get('input[name=PENSIONFUND]').then($input => {
				expect($input.val()).to.contain('8.33')
	   })
	   
	   
	    cy.get('select[name=STOPPAYMENT]').select('Yes',{force: true})
	    cy.get('select[name=BANKNAME]').select('HDFC',{force: true})
		cy.get('select[name=LOCATION]').select('Delhi',{force: true})
		cy.get('select[name=PAYMODE]').select('Account Transfer',{force: true})
		cy.get('select[name=SENIORCITIZEN]').select('No',{force: true})
		 
		 cy.wait(2000)
		//cy.get('#btnEmployeeDetailSave').eq(1).contains('Next').click({force: true})
		//cy.get('#btnEmployeeDetailSave').eq(1).click({force: true})
		//cy.get('button[type="button"]').contains('Next').click({force: true})
		cy.get('#btnEmployeeDetailSaveNext').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
	   cy.get(".toast-message").click({force: true})

	})
	*/
	
	it('Leave  opening not assigned',function(){
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click()
		cy.wait(4000)
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(3000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('07/01/2020')
	   })
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('10/01/2020')
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Paid Leave',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
	})	
	
	it('Paid Leave credit',function(){
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.xpath('//*[@id="finalSearchResult"]/div/div/ul/li[2]').click()
		cy.wait(4000)
		
			cy.get('#leave_detail_tab').click({force:true});
			cy.wait(2000)
		
			cy.get('#leaveEntryTab').click({force:true})
			cy.wait(2000)
			
			cy.get('.fa-edit').eq(0).click({force:true})
			
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force:true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('20')
			
			cy.wait(2000)
			cy.get('[onclick="return saveLeaveOpeningCredit()"]').click({force: true})
			
		})

	
	it('COMPENSATORY OFF  Leave credit',function(){
			cy.get('#leave_detail_tab').click({force:true});
			cy.wait(2000)
		
			cy.get('#leaveEntryTab').click({force:true})
			cy.wait(2000)
			
			cy.get('.fa-edit').eq(1).click({force:true})
			
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force:true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('20')
			
			
			cy.wait(2000)
			cy.get('[onclick="return saveLeaveOpeningCredit()"]').click({force: true})
			
		})
		
		
	it('Casual Leave credit',function(){
			cy.get('#leave_detail_tab').click({force:true});
			cy.wait(2000)
		
			cy.get('#leaveEntryTab').click({force:true})
			cy.wait(2000)
			
			cy.get('.fa-edit').eq(2).click({force:true})
			
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force:true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('20')
			
			cy.wait(2000)
			cy.get('[onclick="return saveLeaveOpeningCredit()"]').click({force: true})
			
		})
	
	it('Leave_configuration_setting',function() {
			cy.visit('http://next.pockethrms.com/identity/Home/Index')
			cy.wait(1000)
			cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(1000)
			cy.get('#leaveConfig').click({force:true})
			cy.wait(2000)
			cy.get('#ddLeavType').select('Paid Leave')
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').type('2')
			cy.get('#btnSave').click()
	})
		
	
	it('Leave_Request_For_3_Days',function(){
		cy.wait(2000)
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		//cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(4000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(3000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('07/01/2020')
	   })
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('10/01/2020')
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Paid Leave',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave limit is exceeded,Allowed limit is : 2')
			cy.log(text.trim())
		})
		
	})
	
	it('Leave_Request_For_2_Days',function(){	
		cy.wait(2000)
		
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(3000)
		cy.get('.fa-plus').eq(0).click({force:true})
		
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/01/2020')
	   })
	   cy.wait(1000)
		cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('09/01/2020')
	   })
	   
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		
		cy.get('#leaveType').select('Paid Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(3000)
			cy.get('#btnAddLeave').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
			cy.log(text.trim())
			cy.wait(2000)
	})
	})

	it('Leave_configuration_Weekoffsetting',function() {
		cy.wait(3000)
			cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(2000)
			cy.get('#leaveConfig').click({force:true})
			cy.wait(2000)
			cy.get('#ddLeavType').select('Paid Leave')
			cy.wait(1000)
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').type('5')
			cy.wait(2000)
			cy.get('#whSetting').select('Yes')
			cy.get('#btnSave').click()
		
	})
	it('Leave_Request_OnWeekoffdaysAllowed',function(){	

		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(4000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('07/02/2020')
	   })
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('10/02/2020')
		})
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Paid Leave',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(2000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
			cy.log(text.trim())
		})
		//check days count for weekoff days are getting included or not  output should be 4 days.
		
		
	} )
	
	
	
	
	it('Leave_configuration_Weekoffsetting',function() {
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#leaveConfig').click({force:true})
		cy.wait(2000)
		cy.get('#ddLeavType').select('Paid Leave')
		cy.wait(1000)
		cy.get('#txtMaxDaysMonth').click({force:true})
		cy.get('#txtMaxDaysMonth').clear()
		cy.wait(1000)
		cy.get('#txtMaxDaysMonth').type('5')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#whSetting').select('No')
		cy.get('#btnSave').click()
		
	})
	
	
	it('Leave_Request_OnWeekoffdays_NotAllowed',function(){	
	cy.wait(2000)
	cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
	cy.wait(3000)
	cy.get('#globalSearch').type('cy01')
	cy.wait(3000)
	cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
	cy.wait(4000)
	//click on leave tab
	cy.get('#leave_detail_tab').click({force:true});
	cy.wait(2000)
	cy.get('#leaveEntryTab').click({force:true})
	cy.wait(2000)
	cy.get('.fa-plus').eq(0).click({force:true})
	cy.wait(2000)
	cy.get('#fromdate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val('05/01/2020')
   })
   cy.wait(1000)
	cy.get('#todate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val('05/01/2020')
	})
	cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	cy.get('#drpToDayType').select('FULL DAY',{force: true})
	cy.get('#leaveType').select('Paid Leave',{force: true})
	cy.get('#remarks').click({force: true})
	cy.get('#remarks').type('HOLIdayremark!!.');
	cy.wait(3000)
	cy.get('#btnAddLeave').click({force: true})
	cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('From Date is Weekly Off.')
		cy.log(text.trim())
	 })
	})
	
	
	it('Multiple leaves be not allowed on consecutive days for PL',function(){
		cy.visit('http://next.pockethrms.com/identity/Home/Index')

		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})

		cy.get('#leaveConfig').click({force:true})
		cy.get('#ddLeavType').select('Paid Leave')
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('10')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#ddMultipleLeaves').select('No')
		cy.get('#btnSave').click()
	})
	it('Multiple leaves be not allowed on consecutive days for Coff',function(){
		cy.visit('http://next.pockethrms.com/identity/Home/Index')

		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})

		cy.get('#leaveConfig').click({force:true})
		cy.get('#ddLeavType').select('COMPENSATORY OFF')
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('10')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#ddMultipleLeaves').select('No')
		cy.get('#btnSave').click()
	})
	it('Apply Compensatory off/multiple leaves-Not_Allowing',function(){
		cy.wait(2000)
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(3000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(3000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
	
		cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('22/01/2020')
		})
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.wait(1000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('22/01/2020')
		})  
	 
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('PL',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Compensatory off-Not_Allowing.');
	
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(9000)
		
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('24/01/2020')
		})
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})   
		cy.wait(2000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('24/01/2020')
		})
		cy.wait(2000)
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('PL',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('Multiple leaves-Not_Allowing.');
		cy.get('#btnAddLeave').click({force: true})
		
		cy.wait(8000)	
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('23/01/2020')
		})
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})	
		cy.wait(2000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('23/01/2020')
		})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Coff',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Compensatory off-Not_Allowing.');
	
		cy.get('#btnAddLeave').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('You are not allowed to take different type of Leave in consecutive days.')
			cy.log(text.trim())
		 }) 
	})
	
	
	
	it('Intervening Week off-Allowing',function(){
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(1000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get('#leaveConfig').click({force:true})
		cy.wait(1000)
		cy.get('#ddLeavType').select('Paid Leave')	
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('5')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#ddInterWeekOff').select('Yes')
		cy.get('#btnSave').click()
			
    })

	it('Holiday restricted -Not_Allowing',function(){
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)

		cy.get('#leave_detail_tab').click({force:true})
			
		cy.wait(1000)
		cy.get('#leaveConfig').click({force:true})
		
		cy.get('#ddLeavType').select('Paid Leave')
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('10')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#ddRestrictedHolidays').select('No')
		cy.get('#btnSave').click()
	})
	
	 it('Leave_Request_Onholidays_NotAllowed',function(){
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(3000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(4000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('25/12/2019')
	   })
	   cy.wait(1000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('25/12/2019')
		})

		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Paid Leave',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('From Date is holiday.')
			cy.log(text.trim())
		 })
	})
	
	it('Holiday restricted -Allowing',function(){
		cy.wait(1000)
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#leaveConfig').click({force:true})
		cy.get('#ddLeavType').select('Paid Leave')
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('5')
		cy.wait(2000)
		cy.wait(2000)
		cy.get('#ddRestrictedHolidays').select('Yes')
		cy.get('#btnSave').click()
	})


	it('Leave_Request_Onholidays_Allowed',function(){
		cy.wait(2000)
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(2000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(2000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/01/2020')
	   })
	   cy.wait(1000)
		cy.get('#todate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('06/01/2020')
		})

		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		cy.get('#leaveType').select('Paid Leave',{force: true})
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('From Date is Weekly Off.')
			cy.log(text.trim())
		 })
		 
		 cy.get(".toast-message").click({force:true})
		 cy.wait(1000)
		 cy.get('#myModal > .modal-dialog > .modal-content > .modal-header > .close').click()
	})

	it('Leave_Request for 10/02/2020',function(){
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').then(input => {
		input.val('10/02/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#todate').then(input => {
			input.val('10/02/2020')
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		
		cy.get('#leaveType').select('Paid Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		
		cy.wait(2000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
			cy.log(text.trim())
		})
		
		 cy.get(".toast-message").click({force:true})
	 cy.wait(1000)
	 cy.get('#myModal > .modal-dialog > .modal-content > .modal-header > .close').click()
	})


	it('Duplicate_Leave_Request for 10/02/2020',function(){
		cy.wait(5000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		cy.get('#fromdate').then(input => {
		input.val('10/02/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#todate').then(input => {
			input.val('10/02/2020')
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		
		cy.get('#leaveType').select('Paid Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		
		cy.wait(2000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave is already applied for the same date')
			cy.log(text.trim())
		})
	})	
	it(' Previous Date Leave Entry be ristricted for this leave.',function(){
		cy.wait(1000)
		cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(1000)
		cy.get('#leaveConfig').click({force:true})
		cy.get('#ddLeavType').select('Paid Leave')
		cy.wait(2000)
		cy.get('#txtMaxDaysMonth').type('10')
		cy.wait(2000)
		cy.get('#ddPreviousDateLeaveEntry').select('should')
		cy.wait(2000)
		cy.get('#ddRestrictedHolidays').select('Yes')
		cy.get('#btnSave').click()
	})
	
	
	
	it('Apply Previous Date Leave',function(){  // 7/7/2020  
	
		cy.wait(3000)
			cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(2000)
			cy.get('#leaveConfig').click({force:true})
			cy.wait(2000)
			cy.get('#ddLeavType').select('Paid Leave')
			cy.wait(1000)
			cy.get('#txtMaxDaysMonth').click({force:true})
			cy.get('#txtMaxDaysMonth').clear()
			cy.wait(2000)
			cy.get('#txtMaxDaysMonth').type('5')
			cy.wait(2000)
			cy.get('#leavCrCalBeforeDays').type('0')
			cy.get('#btnSave').click()
		
	})
	it('Apply Previous Date Leave 03/02/2020',function(){
		
		cy.wait(2000)
		cy.visit('http://next.pockethrms.com/Employee/Employee/EmployeeList')
		cy.wait(3000)
		cy.get('#globalSearch').type('cy01')
		cy.wait(2000)
		cy.contains('li', 'Krishna Nayak(cy01)').click({force: true})
		cy.wait(2000)
		//click on leave tab
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		cy.get('#leaveEntryTab').click({force:true})
		cy.wait(2000)
		cy.get('.fa-plus').eq(0).click({force:true})
		cy.wait(2000)
		
		cy.get('#fromdate').then(input => {
		input.val('03/02/2020')
	   })
	   
	   cy.wait(1000)
	   cy.get('#todate').then(input => {
			input.val('03/02/2020')
	   })
		cy.wait(1000)
		cy.get('#drpFromDayType').select('FULL DAY',{force: true})
		cy.get('#drpToDayType').select('FULL DAY',{force: true})
		
		cy.get('#leaveType').select('Paid Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').type('HOLIdayremark!!.');
		
		cy.wait(2000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal(' This Leave must be applied before 0 days.')
			cy.log(text.trim())
		})
		
		 cy.get(".toast-message").click({force:true})
	 cy.wait(1000)
	 cy.get('#myModal > .modal-dialog > .modal-content > .modal-header > .close').click()
	})

})
 
