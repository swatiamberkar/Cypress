
describe('Emp Wizard', function() {
	
   
   var  empid;
   
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

	it('Create Single Emp through EmpWizard', function() {
		 cy.server()
		   cy.wait(2000)
		    cy.visit('https://next.pockethrms.com/Employee/Employee/EmptyEmployeeList')
			cy.wait(2000)
				cy.get('.mb-1').find('i').then(listing => {
					var len = Cypress.$(listing).length;	
					if (len == 2 ) {
					cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true})
				} else {
					cy.get("a[onclick='getEmployeeWizard();']").click({force: true})
				}
				})
				
				cy.wait(3000)
				cy.get("#empWizardTitle").then(($span) => {
					 var basicdetailsheadertext = $span.text();
					   expect(basicdetailsheadertext).equal('Basic Details')
			   })
			   cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/BasicDetailsWizard').as('BasicDetailsWizard')
			   cy.wait(2000)
			cy.get("#msgs").then(($span) => {
				 var creditBalance = $span.text();
					if(creditBalance!=''){
					 creditBalance=creditBalance.replace(/[^0-9]+/ig,"");
					creditBalance=parseInt(creditBalance)+1;
					  empid="CY"+creditBalance;
					cy.get('input[name=code]').click({force: true})
					cy.get('input[name=code]').clear()
					cy.get('input[name=code]').type(empid.trim())
					}
					else if(creditBalance==''){
						var fristemp='CY1';
						cy.get('input[name=code]').click({force: true})
						cy.get('input[name=code]').clear()
						cy.get('input[name=code]').type(fristemp.trim())
					}
		   })
		   
		   
		 cy.get('input[name=fname]').click({force: true})		
		 cy.get('input[name=fname]').type('Loan')
		 cy.get('input[name=lname]').click({force: true})	
		 cy.get('input[name=lname]').type('test')
		 cy.contains('Male').click()
		 cy.get('select[name=category]').select('Staff',{force: true})
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
		 cy.wait('@BasicDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Basic Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
		cy.get(".toast-message").click({force: true})
		
		//Employee Details
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Employee Details')
       })
	   
	   cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/EmployeeDetailsWizard').as('EmployeeDetailsWizard')
	   
	   cy.wait(2000)
	    cy.get('input[name=FATHERNAME]').click({force: true})		
		cy.get('input[name=FATHERNAME]').type('subhash')
		
		 cy.get('select[name=DEPARTMENT]').select('HR',{force: true})
		 cy.get('select[name=DESIGNATION]').select('EMPLOYEE',{force: true})
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
		cy.get('select[name=BRANCH]').select('Pune',{force: true})
	   
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
	   
	   
	    cy.get('select[name=STOPPAYMENT]').select('No',{force: true})
	    cy.get('select[name=BANKNAME]').select('HDFC',{force: true})
		cy.get('select[name=LOCATION]').select('Pune',{force: true})
		cy.get('select[name=PAYMODE]').select('Account Transfer',{force: true})
		cy.get('select[name=SENIORCITIZEN]').select('No',{force: true})
		 
		 cy.wait(2000)
		cy.get('#btnEmployeeDetailSaveNext').click({force: true})
		cy.wait('@EmployeeDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Employee Details Records Saved Successfully.!')
			cy.log(text.trim())
		})  
	   cy.get(".toast-message").click({force: true})
		cy.wait(2000)
		//Personal Details
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Personal Details')
		})
			
		   cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/PersonalDetailsWizard').as('PersonalDetailsWizard')
		   cy.get('input[name=PERSONALEMAIL]').click({force: true})		
		   cy.get('input[name=PERSONALEMAIL]').type('greytreetest@gmail.com')
			
			cy.get('input[name=REMARKS]').click({force: true})		
			cy.get('input[name=REMARKS]').type('testremark')
			
			cy.get('input[name=PHONENO]').click({force: true})		
			cy.get('input[name=PHONENO]').type('9861238307')
			 
			 cy.get('select[name=BLOODGRP]').select('A+',{force: true})
			 
			 cy.get('input[name=ADDRESS1]').click({force: true})		
			 cy.get('input[name=ADDRESS1]').type('testaddress1')
			 
			 cy.get('input[name=ADDRESS2]').click({force: true})		
			 cy.get('input[name=ADDRESS2]').type('testaddress2')
			 
			 cy.get('input[name=PLACE]').click({force: true})		
			 cy.get('input[name=PLACE]').type('testplace')
			 
			 cy.get('input[name=CITY]').click({force: true})		
			 cy.get('input[name=CITY]').type('testcity')
			 
			 cy.get('input[name=PINCODE]').click({force: true})		
			 cy.get('input[name=PINCODE]').type('700405')
			 
			 cy.get('input[name=EMAIL]').click({force: true})		
			 cy.get('input[name=EMAIL]').type('greytreetest@gmail.com')
			 
			 cy.get('select[name=PRINTCHEQUE]').select('Yes',{force: true})
			 
			 cy.get('input[name=BANKACCNO]').click({force: true})		
			 cy.get('input[name=BANKACCNO]').type('4345346575')
			 
			 cy.get('input[name=BANKBRANCHCODE]').click({force: true})		
			 cy.get('input[name=BANKBRANCHCODE]').type('HDFC001')
			 
			 cy.get('input[name=CORR_ADDRESS1]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS1]').type('testcorraddress1')
			 
			 cy.get('input[name=CORR_ADDRESS2]').click({force: true})		
			 cy.get('input[name=CORR_ADDRESS2]').type('testcorraddress2')
			 
			 
			 cy.get('input[name=CORR_PLACE]').click({force: true})		
			 cy.get('input[name=CORR_PLACE]').type('correndplace')
			 
			 cy.get('input[name=CORR_CITY]').click({force: true})		
			 cy.get('input[name=CORR_CITY]').type('correndcity')
			 
			 
			 cy.get('input[name=CORR_PHONE]').click({force: true})		
			 cy.get('input[name=CORR_PHONE]').type('1234567890')
			 
			 cy.get('input[name=CORR_PINCODE]').click({force: true})		
			 cy.get('input[name=CORR_PINCODE]').type('400705')
			 
			 cy.get('input[name=PERSONALMOBILENO]').click({force: true})		
			 cy.get('input[name=PERSONALMOBILENO]').type('4007051234')
			 
			 cy.get('input[name=OFFICEMOBILENO]').click({force: true})		
			 cy.get('input[name=OFFICEMOBILENO]').type('4007051234')
			 
			 cy.get('input[name=OFFICEEXTNO]').click({force: true})		
			 cy.get('input[name=OFFICEEXTNO]').type('022')
			 
			 cy.get('select[name=HANDICAP]').select('No',{force: true})
		    cy.wait(2000)
			
			cy.get('#btnPersonalDetailSaveNext').click({force: true})
			cy.wait('@PersonalDetailsWizard').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Personal Details Records Saved Successfully.!')
				cy.log(text.trim())
			})  
	     cy.get(".toast-message").click({force: true})
		
		//Salary Details
		 cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Salary Details')
         })
		cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/EarningDetailsWizard').as('EarningDetailsWizard')
		cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/DeductionDetailsWizard').as('DeductionDetailsWizard')
		cy.wait(6000)
		
		cy.get('input[name=FB]').click({force: true})		
		cy.get('input[name=FB]').type('40000') 
		
		cy.get('input[name=FPROJ]').click({force: true})		
		cy.get('input[name=FPROJ]').type('10000')
		
		//cy.get('input[name=AB]').click({force: true})		
		//cy.get('input[name=AB]').type('50000')
		
		cy.get('input[name=FFIELD]').click({force: true})		
	    cy.get('input[name=FFIELD]').type('5000')
		
		////cy.get('input[name=FHRA]').click({force: true})		
		////cy.get('input[name=FHRA]').type('5000')
		
		
		cy.get('input[name=TDS]').click({force: true})		
		cy.get('input[name=TDS]').type('200')
		cy.wait(2000)
		
		cy.get('#btnEarningDeductionSaveNext').click({force: true})
		cy.wait('@EarningDetailsWizard').its('status').should('eq', 200)
		cy.wait('@DeductionDetailsWizard').its('status').should('eq', 200)
		cy.get(".toast-message").eq(0).invoke('text').then((earningtext) => {
				expect(earningtext.trim()).equal('Earning Details Records Saved Successfully.!')
				cy.log(earningtext.trim())
			})  
	     //cy.get(".toast-message").eq(0).click({force: true})
	   cy.get(".toast-message").eq(1).invoke('text').then((dedutext) => {
				expect(dedutext.trim()).equal('Deduction Details Records Saved Successfully.!')
				cy.log(dedutext.trim())
			})  
	     //cy.get(".toast-message").eq(1).click({force: true})
	
		
		cy.wait(3000)
		//click on Approval Matrix next button
		cy.get('#btnApprovalMatrixSaveNext').click({force: true})
		
		//Shift Details
		cy.wait(2000)
		
		
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Shift Details')
        })
		//cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/ShiftScheduleWizard').as('ShiftSchedule')
		cy.get('#shiftNameDrop').select('General',{force: true})
		cy.wait(2000)
		
		cy.get('#dateRange').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/2020 to 01/07/2020')
	   })
		
		
		cy.wait(2000)

		cy.get('#btnattendanceSaveNext').click({force: true})
		cy.wait(2000)
		//cy.wait('@ShiftSchedule').its('status').should('eq', 200)
		 cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Saved Successfully !')
		})  
	     cy.get(".toast-message").click({force: true})
		 
		//Leave Details
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('Leave Details')
         })
		
		cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/LeaveOpeningWizard').as('LeaveOpeningWizard')
		cy.wait(4000)	
		cy.get('input[name=LeaveOpening_CL]').click({force: true})		
		cy.get('input[name=LeaveOpening_CL]').type('5')
		
		cy.get('input[name=LeaveOpening_COFF]').click({force: true})		
		cy.get('input[name=LeaveOpening_COFF]').type('10')
		
		cy.get('input[name=LeaveOpening_PL]').click({force: true})		
		cy.get('input[name=LeaveOpening_PL]').type('20')
		
		cy.wait(1000)
		cy.get('#chkCredit_CL').check({force: true})
		cy.get('#chkCredit_COFF').check({force: true})
		cy.get('#chkCredit_PL').check({force: true})
	   	
		cy.get('#btnLeaveopeningSaveNext').click({force: true})
		cy.wait(2000)
		cy.wait('@LeaveOpeningWizard').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully.!')
		})
		cy.get(".toast-message").click({force: true})
		
		cy.wait(2000)
		//SelfService Details
		cy.get("#empWizardTitle").then(($span) => {
             var employeedetailsheadertext = $span.text();
			   expect(employeedetailsheadertext).equal('SelfService Details')
         })
		
         cy.route('POST', 'https://next.pockethrms.com/Employee/Employee/SelfServiceRoleWizard').as('selfservicerole')
		 cy.get('#ddlSelfServiceRole').select('User',{force: true})
		 cy.wait(2000)
		 cy.wait('@selfservicerole').its('status').should('eq', 200) 
		 cy.get("#credentials").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		 
		cy.get('#decActWiz').select('Yes',{force: true})
		
		cy.get('#decActWiz').select('Yes',{force: true})
		cy.get('#activeType').select('Yes',{force: true})
		
		cy.wait(2000)
		
		cy.get('#btnSelfServiceSaveNext').click({force: true})
		   
	   
	   
	   
	})
	
	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
	
	}) 