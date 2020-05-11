var fs = require('fs');
var Crypto = require('crypto-js')


describe("Employee Roster", () => {
	
	var url = 'http://next.pockethrms.com'
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var employeeID1 ='CY21'
	var employeeID2 ='CY22'
	var employeeID3 ='CY23'
	
	var shift = 'General'
	var roster = 'Roster'
	var category = 'Staff'

	
	
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
	
		cy.changeCompany()	 	
	})
	
	Cypress.Commands.add('navigate_EmployeeProfile1',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID1)
		cy.wait(2000)
		cy.contains('li', employeeID1).click({force: true})
		cy.wait(3000)
	})
	
	
	
	Cypress.Commands.add('navigate_EmployeeRoster1',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile1()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_EmployeeRoster').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeProfile2',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID2)
		cy.wait(2000)
		cy.contains('li', employeeID2).click({force: true})
		cy.wait(3000)
	})
	
	
	
	Cypress.Commands.add('navigate_EmployeeRoster2',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile2()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_EmployeeRoster').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeProfile3',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID3)
		cy.wait(2000)
		cy.contains('li', employeeID3).click({force: true})
		cy.wait(3000)
	})
	
	
	
	Cypress.Commands.add('navigate_EmployeeRoster3',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile3()
		
		cy.get('#attendance_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Attendance_EmployeeRoster').click({force:true})
		cy.wait(3000)
	})
	
	
	it('Add Roster Master',function(){
		
		cy.visit(url+"/Settings/Employee/Index?module=attendance&submodule=rostermaster")
		
		cy.wait(1000)
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})

		cy.get('#insRosterName').click({force: true})	
		cy.get('#insRosterName').clear()
		cy.get('#insRosterName').type(roster)
		
		cy.get('#insDesc').click({force: true})
		cy.get('#insDesc').clear()
		cy.get('#insDesc').type('Testing')
		cy.get('#btnSaveRosterMaster').click({force: true})	
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Roster Master saved successfully.!')	
				
		})
	
	})	
		
	it('Set Roster Organize',function(){
		
		cy.visit(url+"/Settings/Employee/Index?module=attendance&submodule=rosterorganize")
		
		cy.wait(1000)
		cy.xpath("//i[@class='fas fa-edit text-info font-16']").click({force: true})
		
		cy.get('#Mon').select(shift)
		cy.get('#Tue').select(shift)
		cy.get('#Wed').select(shift)
		cy.get('#Thu').select(shift)
		cy.get('#Fri').select(shift)
			
		cy.get('#btnsaveUpdateRosterOrganize').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Record Save Successfully !')	
				
		})
		
		})	
	
	
	it('navigate_Employee Roster',function(){
		cy.navigate_EmployeeRoster1()
	})
	
	it('Verify Validation Massages - Please select Category.',function(){
		
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please select Category.')	
			cy.wait(2000)
			cy.get(".toast-message").click()	
		})
	})
	
	it('Verify Validation Massages - Please select Active Roster Type.',function(){
		cy.get('#CategoryId').select(category)	
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please select Active Roster Type.')	
			cy.wait(2000)
			cy.get(".toast-message").click()
				
		})
	})
	
	it('Verify Validation Massages - Please select Effective Date',function(){
		cy.get('#ActiveRoster').select('1')		
		
				
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please select Effective Date')	
			cy.wait(2000)
			cy.get(".toast-message").click()
				
		})
	})
	
	it('Verify Validation Massages - Please Select Roster.',function(){
		cy.get('#crEffDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
			
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please Select Roster.')	
			cy.wait(2000)
			cy.get(".toast-message").click()		
		})
	})
	
	
	
	it('Add Employee Roster - Single',function(){
		
		cy.wait(2000)
		cy.get('#sRoaster').select(roster)
	
		cy.get('#rdoSingle').click({force: true})	
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Records Saved Successfully.!')	
				
		})
		
		})	
		
	it('Roster Process',function(){
		cy.visit(url+ '/Attendance/Settings/RosterProcess')	
	
		cy.wait(2000)
	
		cy.get('#dtDateFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
			
			cy.get('#dtDateTo').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('30/04/2020')
			})
			
		cy.get("#btnProcess").click({force: true})		
		cy.wait(2000)
		cy.xpath("//div[@class='dvMsg alert alert-warning']").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('×\n        Process Completed Successfully.!')	
				
		})
		
		})
		
	
	it('Verify Shift Schedule',function(){
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeProfile1()
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(5000)
		cy.get("div[class='media-body align-self-center'] >h4").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('27/04/2020 - 30/04/202020/04/2020 - 24/04/202013/04/2020 - 17/04/202006/04/2020 - 10/04/202001/04/2020 - 03/04/2020');			
		})
		
		cy.xpath("//li[@class='list-inline-item mr-2']").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq(shift+shift+shift+shift+shift);			
		})
	})
	
	
	
	it('Verify Validation Massages - Please Select at Least one Roster.',function(){
		cy.navigate_EmployeeRoster2()
		cy.wait(2000)
		cy.get('#sRoaster').select(roster)
		cy.get('#CategoryId').select(category)
		cy.get('#ActiveRoster').select('2')
	
		cy.get('#crEffDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
		cy.get('#rdoWeekly').click({force: true})		
		cy.wait(2000)	
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please Select at Least one Roster.')	
			cy.wait(2000)
			cy.get(".toast-message").click()	
		})
	})
	
	it('Add Employee Roster - Weekly',function(){
		
		cy.xpath("//tr[@class='4']//select[@id='Week1']").select(roster)
		cy.xpath("//tr[@class='4']//select[@id='Week2']").select(roster)
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Records Saved Successfully.!')	
				
		})
		
		})	
		
	it('Roster Process',function(){
		cy.visit(url+ '/Attendance/Settings/RosterProcess')	
	
		cy.wait(2000)
	
		cy.get('#dtDateFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
			
			cy.get('#dtDateTo').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('30/04/2020')
			})
			
		cy.get("#btnProcess").click({force: true})		
		cy.wait(2000)
		cy.xpath("//div[@class='dvMsg alert alert-warning']").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('×\n        Process Completed Successfully.!')	
				
		})
		
		})
		
	
	it('Verify Shift Schedule',function(){
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeProfile2()
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(5000)
		cy.get("div[class='media-body align-self-center'] >h4").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('06/04/2020 - 10/04/202001/04/2020 - 03/04/2020');			
		})
		
		cy.xpath("//li[@class='list-inline-item mr-2']").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq(shift+shift);			
		})
	})
	
	it('Verify Validation Massages - Please Select at Least one Roster.',function(){
		cy.navigate_EmployeeRoster3()
		cy.wait(2000)
		cy.get('#sRoaster').select(roster)
		cy.get('#CategoryId').select(category)
		cy.get('#ActiveRoster').select('3')
	
		cy.get('#crEffDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
		cy.get('#rdoMonthly').click({force: true})		
		cy.wait(2000)	
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Please Select at Least one Roster.')	
			cy.wait(2000)
			cy.get(".toast-message").click()	
		})
	})
	
	
	
	it('Add Employee Roster - Monthly',function(){
		
		cy.xpath("//select[@id='mRoster_4']").select(roster)
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Records Saved Successfully.!')	
				
		})
		
		})	
		
	it('Roster Process',function(){
		cy.visit(url+ '/Attendance/Settings/RosterProcess')	
	
		cy.wait(2000)
	
		cy.get('#dtDateFrom').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/2020')
			})
			
			cy.get('#dtDateTo').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('30/04/2020')
			})
			
		cy.get("#btnProcess").click({force: true})		
		cy.wait(2000)
		cy.xpath("//div[@class='dvMsg alert alert-warning']").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('×\n        Process Completed Successfully.!')	
				
		})
		
		})
		
	
	it('Verify Shift Schedule',function(){
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeProfile3()
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(5000)
		cy.get("div[class='media-body align-self-center'] >h4").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('27/04/2020 - 30/04/202020/04/2020 - 24/04/202013/04/2020 - 17/04/202006/04/2020 - 10/04/202001/04/2020 - 03/04/2020');			
		})
		
		cy.xpath("//li[@class='list-inline-item mr-2']").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq(shift+shift+shift+shift+shift);			
		})
	})
	
	
})
