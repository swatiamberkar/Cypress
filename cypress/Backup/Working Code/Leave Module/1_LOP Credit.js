var fs = require('fs');
var Crypto = require('crypto-js')


describe("LOP Credit Process", () => {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company='CTest_25'
	var employeeID ='CY3'
	
	var lopMonth= 'April'
	
	const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)-3
		const Day2 = parseInt(Day)-2
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day1+'/'+Month+'/'+year
		const tomorrowDate = Day2+'/'+Month+'/'+year
	
	
	let leave ={LeaveType: "LD", FromDate: '08/04/2020', FromDateDay: "FULL DAY", ToDate:'09/04/2020', ToDateDay: "FULL DAY"};
	var lopDays = '2'
	
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username','GetLicenseData')
		cy.wait(2000)
    })
	

	
	it('Pocket HRMS Login', function() {
		cy.visit(url) 
		cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type(username)
		cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type(userPass)	
		cy.get('[type="submit"]').click({force: true})
		
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
	
	Cypress.Commands.add('navigate_EmployeeLOPCreditPage',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('LOP Credit')
		cy.wait(2000)
		cy.contains('li', 'LOP Credit').click({force: true})
		cy.wait(3000)
		cy.get('#searchEmpCodeName').click({force: true})		
		cy.get('#searchEmpCodeName').clear()
		cy.get('#searchEmpCodeName').type(employeeID)
		cy.get('#ESbtnSearch').click({force: true})
		cy.wait(1000)
		cy.get('#tempFnF').click({force: true})
	})	
	
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeLeave',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('delete_EmployeesAllLeaves',()=>{
		
		cy.get("i").then(($sp) => {
			var result = $sp.hasClass('text-danger')
			cy.log(result)
		if ($sp.hasClass('text-danger')) {
		
		cy.get('.text-danger').then(listing => {
			var leavelength = Cypress.$(listing).length;
			cy.log("leavelength: "+leavelength)
			
			if(leavelength != 0){		
			cy.get('.text-danger').eq(0).click()
			cy.wait(5000)
			}
			
			if(leavelength != 1)
			{
			cy.delete_EmployeesAllLeaves()
			}		
		})   	
		} 
		else {		
		}
		})	
	})
	
	it('Set LOP - Days Matching Setting ',function(){
		
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('Lop')
		cy.wait(2000)
		cy.contains('li', 'LOP - Days Matching').click({force: true})
		cy.wait(3000)

	cy.get('#ddlDaysComponent').select('LOPCD')
	
	cy.get('#globalSearch').click({force: true})	
	
	cy.get('#backMonth').click({force: true})		
	cy.get('#backMonth').clear().type('2')
		
	cy.xpath("//button[@class='btn btn-xs btn-primary waves-effect waves-light']").click({force: true})
	cy.wait(5000)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully!')	
				
		})
	
	})
	
	it('Set  LOP - Components Matching Setting ',function(){
		
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type('Lop')
		cy.wait(2000)
		cy.contains('li', 'LOP - Components Matching').click({force: true})
		cy.wait(3000)

	cy.get('#ddlCategoryLOP').select('Staff', {force: true})
	cy.wait(2000)
	//cy.get('#ddlCategoryLOP').select('Staff', {force: true})
	//cy.wait(2000)
	cy.get('#LOP').click({force: true})	
	
	cy.get('#btnSave').click()	
	cy.wait(2000)
	
	cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Data saved successfully!')	
				
		})
	
	})
	
	it('Delete Leave Posting',function(){
		cy.visit('https://next.pockethrms.com/Leave/transaction/LeavePost')
	cy.wait(2000)
		cy.get('#month').select(lopMonth,{force: true})
		
		cy.get('#catall').click({force: true})
		
		cy.get('#btnProcessLeavePost').click({force: true})
		cy.wait(5000)
		cy.get('#btnDeleteLeavePost').click({force: true})
		cy.wait(5000)
	})
	
	it('Verify LOP Credited or not for Perticular month ',function(){
	cy.navigate_EmployeeLOPCreditPage()
	cy.wait(2000)
	cy.get('#ApplyMonth').select(lopMonth)
	cy.xpath("//button[@value='View']").click({force: true})
	cy.wait(5000)
	
	})
	
	

	it('Add LOP ',function(){
		
	cy.get("div").then(($sp) => {
			var result = $sp.hasClass('alert-warning')
			cy.log(result)
			
	if ($sp.hasClass('alert-warning')) {
		cy.log('dsfsffdffffffffffffffff')
	
	
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click()
				cy.wait(5000)
				
				cy.get('#leaveType').select(leave.LeaveType)
				
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leave.FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leave.ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay)
		cy.get('#drpToDayType').select(leave.ToDateDay)
	
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave Updated Successfully')	
		cy.get(".toast-message").click()			
		})
		
		cy.wait(5000)
		
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})	
		
		} else {
		//cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fa fa-plus']").click({force: true});
		}
		
	})

})


	it('Leave posting for Perticular month & Verify Creadited LOP',function(){	
	cy.visit('https://next.pockethrms.com/Leave/transaction/LeavePost')
	cy.wait(2000)
		cy.get('#month').select(lopMonth,{force: true})
		
		cy.get('#catall').click({force: true})
		
		cy.get('#btnProcessLeavePost').click({force: true})
		cy.wait(5000)
		cy.get('#btnDeleteLeavePost').click({force: true})
		cy.wait(5000)
		cy.get('#btnPostLeavePost').click({force: true})
		cy.wait(5000)
		cy.get('#month').select(lopMonth,{force: true})
		
		cy.get('#catall').click({force: true})
		
		cy.get('#btnProcessLeavePost').click({force: true})
		
		cy.xpath("//table[@id='tableRow']//tbody//tr").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//table[@id='tableRow']//tbody//tr["+num+"]//td[2]").invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==employeeID.trim()){
				expect(text.trim()).to.eq(employeeID.trim())
				
			cy.xpath("//table[@id='tableRow']//tbody//tr["+num+"]//td[6]").invoke('text').then((text) => {	
			cy.log("text: "+text)
				expect(text.trim()).to.eq(lopDays)
			})
		
		}
		})
		})
	
	})
	
	
	it('Verify Lop in Monthly Input Page',function(){	
	cy.visit('https://next.pockethrms.com/payroll/transaction/monthlyinput')
	cy.wait(2000)
		cy.get('#inputMonth').select(lopMonth,{force: true})
		cy.wait(1000)
		cy.get('[value="View"]').click({force: true})
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		cy.get('.table >tbody').find('tr').each(function(row, i){
		var num = parseFloat(i+1)
		cy.log("num: "+num)
	
		cy.xpath("//table[@class='table table-bordered table-sm myTable']//tbody//tr["+num+"]//td[1]").invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==employeeID.trim()){
				
			expect(text.trim()).to.eq(employeeID.trim())
			cy.wait(2000)
			
			
			cy.get('.table > tbody > tr:nth-child('+num+') > td:nth-child(4) > .form-control').then($input => {
						expect($input.val()).to.contain(lopDays)
			})			
						
		}
		
		})
		})
	
	})


	
})
