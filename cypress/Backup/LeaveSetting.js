describe('Login', function() {
beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider')
		cy.wait(2000)
    })


 it('Login', function() {
    cy.viewport(1366, 657)
 
    cy.visit('http://next.pockethrms.com/')
	
	cy.get('.px-3 > .form-horizontal > .form-group > .input-group > #Email').click()
 
    cy.get('.px-3 > .form-horizontal > .form-group > .input-group > #Email').type('administrator@bhagya.com')
 
    cy.get('.px-3 > .form-horizontal > .form-group > .input-group > #Password').click()
	
    cy.get('.px-3 > .form-horizontal > .form-group > .input-group > #Password').type('123456')
 
    cy.get('.px-3 > .form-horizontal > .form-group > .col-12 > .btn').click()
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')

	cy.wait(4000)
 })
 
 it('Change Company', function() {
		
		cy.get('[onclick="changeCompanyModal()"]').invoke('text').then((text) => {
			var comnpanyname=text.trim();
			if(comnpanyname!='Chennai Demo Company')
			 {
				cy.get('[onclick="changeCompanyModal()"]').click({force: true})
				cy.get('[type="radio"]').check('3',{force: true})
				cy.wait(1000)
				cy.get('[onclick="changeCompany()"]').click({force: true})
			 }

		 })
		
				
	})


})

 it('FinancialYear_CalenderMonth', function() {

    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .menu-name').click( {force: true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click( {force: true})
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(2) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
 
    cy.get('#leavebody > .row > .col-9 > .btn > .fa').click()
	
	cy.wait(2000)
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #txtStartDt').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-next-month > svg').click()
 
	cy.xpath('/html/body/div[5]/div[2]/div/div[2]/div/span[4]').click()
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-5 > #drpDefault').select('Yes')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddComponent').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddHoli').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddLeaveCredit').select('CATEGORY')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddWeekOff').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddCompOff').select('COMPCODE')
 
    cy.get('#modalLeaveSett > .modal-dialog > .modal-content > .modal-footer > #btnSaveFinSet').click( {force: true})
 
 })
 
  it('FinancialYear_DatetoDate', function() {

    cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click({force: true})
	cy.wait(2000)
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(2) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.wait(2000)
    cy.get('div > #leavebody > .row > .col-9 > .btn').click({force: true})
 
    cy.get('#formGeneral > #divCollapse > .form-group-sm > .normalLabel > #rdoDate').click()
 
    cy.get('#formGeneral > #divCollapse > .form-group-sm > .normalLabel > #rdoDate').type('Date')
 
    cy.get('.row > .row > #dateToDate > .col-sm-4 > #drpFromDays').select('2')
	cy.wait(2000)
   cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #txtStartDt').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
 
    cy.get('.modal-open > .flatpickr-calendar > .flatpickr-months > .flatpickr-prev-month > svg').click()
	
    cy.get('.flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .arrowUp').click({force: true})
 
    cy.get('.flatpickr-months > .flatpickr-month > .flatpickr-current-month > .numInputWrapper > .arrowUp').click({force: true})

  //  cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #txtStartDt').type('01/04/2021')
	cy.xpath('/html/body/div[5]/div[2]/div/div[2]/div/span[5]').click()

    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-5 > #drpDefault').select('No')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddComponent').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddHoli').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddLeaveCredit').select('CATEGORY')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddWeekOff').select('COMPCODE')
 
    cy.get('#divCollapse > .row > .form-group-sm > .col-sm-4 > #ddCompOff').select('COMPCODE')
 
    cy.get('#modalLeaveSett > .modal-dialog > .modal-content > .modal-footer > #btnSaveFinSet').click({force: true})
 
 })


 it('Add_NewLeave_withSelectAll', function() {
	 cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click( {force: true})
 cy.wait(2000)
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click( {force: true})
 
    cy.get('#leave_detail > .row > .col-lg-3 > .card > .card-body > div > .education-activity > .activity').click()
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(4) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.wait(2000)
    cy.get('#leavForm > .row > .col-9 > .btn > .fa').click({force:true})

    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-2 > #leavName').type('CL')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-3 > #leavDesc').type('Causal Leave')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-4 > #leavCategory').select('EL')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-4 > #leavCategory').select('CL')
 
 
	cy.get('[type="radio"]').first().check({force:true})
 //  cy.get('.col-sm-6 > .row > .col-sm-6 > .radio > #catall').type('all')
 
    cy.get('.modal-dialog > .modal-content > .modal-body > .modal-footer > #btnLeaveDefinationSave').click({force:true})
   
 
 })
 it('Add_NewLeave_Deselect', function() {
	 cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click( {force: true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click( {force: true})
	
    cy.get('#leave_detail > .row > .col-lg-3 > .card > .card-body > div > .education-activity > .activity').click()
	cy.wait(2000)
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(4) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
    cy.wait(2000)
	cy.get('#leavForm > .row > .col-9 > .btn > .fa').click({force:true})

    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-2 > #leavName').type('CL')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-3 > #leavDesc').type('Causal Leave')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-4 > #leavCategory').select('EL')
 
    cy.get('.container > .form-group-sm > .form-group-sm > .col-sm-4 > #leavCategory').select('CL')
 
  //  cy.get('.col-sm-6 > .row > .col-sm-6 > .radio > #catall').type('particular')
 
    cy.get('.modal-dialog > .modal-content > .modal-body > .modal-footer > #btnLeaveDefinationSave').click({force:true})
   
 
 }) 
 
	it('Delete', function() {

    cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click({force:true})
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(4) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.get('#btnDelete').click({force:true})
	
})



describe('LeaveConfiguration', function() {
	beforeEach(function(){
        window.console.log('Enter the beforeEach function')
		Cypress.on('uncaught:exception', (err,runnable) => {
			return false;
		});
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider')
		cy.wait(2000)
    })
	
	it('Leave_configuration_save',function(){
		
		   cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click({force:true})
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(6) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
 
    cy.get('form > .col-sm-12 > .form-group-sm > .col-sm-4 > #ddLeavType').select('Coff')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #txtMaxOpen').type('10')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #leavCrBasedOn').select('DATEOFANNIVERSARY')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #leavCrBasedOn').select('DATEOFJOINING')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #leavCrBasedOn').select('DATEOFANNIVERSARY')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #leavCrBasedOn').select('CONFIRMATIONDATE')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #leavCrCalAfter').type('2')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #leavCrCalAfter').type('1')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #leavCrCalAfter').type('2')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #leavCrCalAfter').type('3')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #whSetting').select('Yes')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #whSetting').select('No')
 
    cy.get('tr > td > .form-group-sm > .col-sm-1 > #leavCrCalBeforeDays').type('1')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #DocumentFSettingMandetory').select('Yes')
 
    cy.get('tr > td > .form-group-sm > .col-sm-2 > #DocumentFSettingMandetory').select('No')
 
    cy.get('.card > .card-body > form > .text-right > #btnSave').click()
 
 })

it('LeaveConfiguration_delete',function(){
	
	
		   cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click({force:true})
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(6) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
 
    cy.get('form > .col-sm-12 > .form-group-sm > .col-sm-4 > #ddLeavType').select('Coff')
	cy.get('#btnDelete').click({force:true})
	
	
})


 it('WeekOff_save', function() {
	 cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click()
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(8) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.get('#listWeekDays_0__DayChecked').check('true') 
	cy.get('#btnSave').click({forcr:true})
 })

 

 it('WeekOffDelete', function() {

    cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click()
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(8) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
 
    cy.get('#listWeekDays_0__DayChecked').check('true')
 
    cy.get('#btnDelete').click()
 
})

	it('Holiday_Add', function() {
		
	cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr:nth-child(2) > .menu-name-td').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click()
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(10) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
 
    cy.get('#leavebody > .row > .col-9 > .btn > .fa').click()
 
    cy.get('.modal-content > .modal-body > .form-group > .col-sm-9 > #HolidayDate').click()

    cy.xpath('/html/body/div[5]/div[2]/div/div[2]/div/span[4]').click({force:true})
 
    cy.get('.modal-content > .modal-body > .form-group > .col-sm-9 > #HolidayReason').click()
 
    cy.get('.modal-content > .modal-body > .form-group > .col-sm-9 > #HolidayReason').type('New year')
 
    cy.get('.modal-content > .modal-body > .form-group > .col-sm-2 > #chkOptional').select('No')
	cy.get('#btnSaveFinSet').click({force:true})
			
	})

	it('Holiday_Edit', function() {
		
	cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr:nth-child(2) > .menu-name-td').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click()
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(10) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.get('#holidayDiv > div > div:nth-child(4) > div > div > div > div.col-sm-3.align-self-center > div > a:nth-child(1) > i').click({force:true})
	cy.get('#chkOptional').type('No')
	cy.get('#btnSaveFinSet').click()
})	

it('Holiday_Delete', function() {
		
	cy.viewport(1517, 730)
 
    cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click({force:true})
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr:nth-child(2) > .menu-name-td').click()
 
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('.card > .card-body > #pills-tab > .nav-item > #leave_detail_tab').click()
 
    cy.get('#leave_detail > .row:nth-child(1) > .col-lg-3:nth-child(1) > .card:nth-child(1) > .card-body:nth-child(1) .education-activity:nth-child(1) > .activity:nth-child(1) > .time-item:nth-child(10) > .item-info:nth-child(1) .m-0:nth-child(1)').click()
	cy.get('#holidayDiv > div > div:nth-child(20) > div > div > div > div.col-sm-3.align-self-center > div > a:nth-child(2) > i').click({force:true})

})
}) 


