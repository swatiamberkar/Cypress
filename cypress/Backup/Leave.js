describe('Add Earnings  Fields ', function() {
	
	var company ='A  j'
	
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
                Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
                cy.wait(2000)
				cy.reload()
		cy.wait(5000)
		//selectedDepartment = selectedDepartment
    })


	function Randomcomapnyname(length) {
	   var result           = '';
	   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	   var charactersLength = characters.length;
	   for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return result;
	}
	
	
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
	cy.wait(10000)
	})
	

	
/*	it('LeaveSetting-financial year',function() {	
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

*/

it('Add_NewLeave_PL', function() {
	
	cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force:true})
	cy.wait(1000)
	cy.get('#leave_detail_tab').click({force:true})
	cy.wait(1000)
	cy.get('#leaveDefine').click( {force: true})
	cy.wait(1000)
	
	cy.get('span').then(($sp) => {
    if ($sp.hasClass('mb-1')) {
       cy.xpath("//span[@class='btn buttons-bg-color btn-facebook mb-1']").click();
    } else {
       cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click();
    }
  })
 
    cy.get('#leavName').type('PL')
 
    cy.get('#leavDesc').type('Paid Leave')
 
    cy.get('#leavCategory').select('EL')
 
	cy.get('#catall').check({force:true})
 
	//cy.get('[type="radio"]').first().check({force:true})
 //  cy.get('.col-sm-6 > .row > .col-sm-6 > .radio > #catall').type('all')
 
    cy.get(' #btnLeaveDefinationSave').click({force:true})
	cy.get(".toast-message").invoke('text').then((text) => {
	cy.log(text.trim())		
	expect(text.trim()).equal('Records Saved Successfully!!!')
					
		})
	
   
 })
 
 it('Add_NewLeave_COFF', function() {
	 cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click( {force: true})
 cy.wait(2000)
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('#leave_detail_tab').click( {force: true})
	cy.get('#leaveDefine').click( {force: true})
   cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click();
   
    cy.get('#leavName').type('Coff')
 
    cy.get('#leavDesc').type('COMPENSATORY OFF') 
    cy.get('#leavCategory').select('COF')
	cy.get('#catall').check({force:true})
 
	//cy.get('[type="radio"]').first().check({force:true})
 //  cy.get('.col-sm-6 > .row > .col-sm-6 > .radio > #catall').type('all')
 
    cy.get(' #btnLeaveDefinationSave').click({force:true})
   
 })
 
 it('Add_NewLeave_CL', function() {
	 cy.visit('http://next.pockethrms.com/identity/Home/Index')
 
    cy.get('.nav-link:nth-child(9) > table > tbody > tr > .menu-name-td > .img-fluid').click( {force: true})
 cy.wait(2000)
    cy.visit('http://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsetting')
 
    cy.get('#leave_detail_tab').click( {force: true})
	cy.get('#leaveDefine').click( {force: true})
   cy.get('#leaveContentTitle > div > div.col-8.text-right > a > i').click();
   
    cy.get('#leavName').type('CL')
 
    cy.get('#leavDesc').type('Casual Leave')
 
    cy.get('#leavCategory').select('CL')
 
	cy.get('#catall').check({force:true})
 
	//cy.get('[type="radio"]').first().check({force:true})
 //  cy.get('.col-sm-6 > .row > .col-sm-6 > .radio > #catall').type('all')
 
    cy.get(' #btnLeaveDefinationSave').click({force:true})
   
 })
 
})
 
 
 