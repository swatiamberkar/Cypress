describe('test_name', function() {

 it('Login', function() {
cy.visit('http://192.168.0.155:8080/')
 
    cy.viewport(1366, 625)
 
    cy.visit('http://192.168.0.155:8080/')
    cy.get('#UserName').type('admin@aipl.com')
	cy.get('#Password').type('pockethcm')
	
    cy.get('[type="submit"]').click({force: true})
	cy.get('#drpCompany').select('CPR')
   cy.wait(1000) 
   		Cypress.Cookies.preserveOnce('.AspNet.ApplicationCookie', '')

})



it('Employee wizard through Add employee', function() {
cy.visit('http://192.168.0.155:8080/Payroll/PremiumSettings/EmployeeWizard')
		  http://192.168.0.155:8080/Payroll/PremiumSettings/EmployeeWizard
cy.wait(3000)
})



})