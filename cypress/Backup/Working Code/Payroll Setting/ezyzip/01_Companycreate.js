describe('Create_Company and Popup Data', function() {
	

	var company='Test_94';
	function Randomcomapnyname(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for (var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return  'Test_'+result;
	}
	
	
	it('Pocket HRMS Login', function() {
		cy.visit('https://next.pockethrms.com/')
		//cy.get('#Email').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Email').should('exist')
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		//cy.get('#Email').should('have.value', 'nileshgajare@live.com')
		//cy.get('#Password').should('be.visible').should('have.css', 'border-radius') 
		//cy.get('#Password').should('exist')
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		//cy.get('#Password').should('have.value', '123456')
		//cy.get('[type="submit"]').should('have.css', 'background-color').and('eq', 'rgb(77, 121, 246)')
		cy.get('[type="submit"]').click({force: true})
		//cy.get('.validation-summary-errors').should('not.exist');
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
	
	it('Add Category For Staff', function() {
		cy.wait(2000)
		cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#employee_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#HR_Category').click({force: true})
		cy.get('[title="Add Category"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get("#categoryModalLabel").then(($span) => {
             var catagoryheadertex = $span.text();
			expect(catagoryheadertex).to.have.string('New Category')
		})
		cy.get('#categoryName').should('be.visible').should('not.disabled')
		cy.get('#categoryName').should('exist')
		
		cy.get('#description').should('be.visible').should('not.disabled')
		cy.get('#description').should('exist')

		cy.get('#displayOrder').should('be.visible').should('not.disabled')
		cy.get('#displayOrder').should('exist')
		
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').type('Staff')
		
		cy.get('#description').click({force: true})
		cy.get('#description').type('Staff')
		
		
		cy.get('#displayOrder').click({force: true})
		cy.get('#displayOrder').type('1')
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category added successfully.!')	
		})
		cy.get(".toast-message").click({force: true})
})	

	it('Add Category For Admin', function() {	
		cy.wait(1000)
		cy.get('[title="Add Category"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').type('Admin')
		
		cy.get('#description').click({force: true})
		cy.get('#description').type('Admintest')
	
		cy.get('#displayOrder').click({force: true})
		cy.get('#displayOrder').type('2')
		
		cy.get('#createBtn').should('be.visible').should('not.disabled')
		cy.get('#createBtn').should('exist')
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category added successfully.!')
			cy.log(text.trim())
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Edit Category For Satff', function() {	
		cy.wait(1000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#description').click({force: true})
		cy.get('#description').clear()
		cy.get('#description').type('Staff Category update')
		
		cy.get('#updateBtn').should('be.visible').should('not.disabled')
		cy.get('#updateBtn').should('exist')
		cy.get('#updateBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category updated successfully.!')
		})
		cy.get(".toast-message").click({force: true})
	
	})	
	
	
	it('Add Category For Manager', function() {	
		cy.wait(1000)
		cy.get('[title="Add Category"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#categoryName').click({force: true})
		cy.get('#categoryName').type('Manager')
		
		cy.get('#description').click({force: true})
		cy.get('#description').type('Manager Category')
	
		cy.get('#displayOrder').click({force: true})
		cy.get('#displayOrder').type('3')
		
		cy.get('#createBtn').should('be.visible').should('not.disabled')
		cy.get('#createBtn').should('exist')
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category added successfully.!')
		})
		cy.get(".toast-message").click({force: true})
	})	
	
	
	
	it('Joining document for Adhar card', function() {
		//cy.visit('https://next.pockethrms.com/Settings/Employee/Index?module=hr&submodule=PopupData')
		cy.get('#employee_detail_tab').click({force:true})
		cy.wait(2000)	
		cy.get('#HR_JoiningDocument').click({force:true})
		cy.wait(1000)
		cy.get('[title="Add New Joining Document"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#documentName').type('adhar card')
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Joining Document Saved Successfully.')
		})
		cy.get(".toast-message").click({force: true})
		cy.wait(2000)
	})
	it('Joining document for Pan card', function() {
		cy.wait(2000)	
		cy.get('[title="Add New Joining Document"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#documentName').type('Pan card')
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Joining Document Saved Successfully.')	
		})
		cy.get(".toast-message").click({force: true})
		
	})
	it('Edit Joining document ', function() {
		cy.wait(2000)
		cy.get('.fa-edit').eq(1).click({force: true})
		cy.wait(1000)
		cy.get('#documentName').should('be.visible').should('not.disabled')
		cy.get('#documentName').should('exist')
		cy.get('#documentName').click({force: true})
		cy.get('#documentName').clear()
		cy.get('#documentName').type('Driver Lin')
		cy.get('[type="radio"]').check('false',{force: true})
		cy.wait(1000)
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Joining Document Saved Successfully.')
		})
		cy.get(".toast-message").click({force: true})
	})	
	
	it('Delete Joining document ', function() {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(1).click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		 })
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Deleted Successfully.')
		})
		cy.get(".toast-message").click({force: true})
	})		


			
	
	it('Add Pop Up Data For ESI Location of Pune', function() {
		cy.wait(1000)
		cy.get('#HR_PopUpData').click({force: true})
		cy.wait(1000)
		cy.get('#metadatatable').select('ESI Location',{force:true})
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		//
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Pune')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})	
	
		
	
	it('Add Pop Up Data For  ESI Location of Hyderabad', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Hyderabad')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		 })
		cy.get(".toast-message").click({force: true})
	})	

    it('Add Pop Up Data For Bank Name of Axis', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Bank Name',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Axis')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})

	it('Add Pop Up Data For Bank Name  of  HDFC', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('HDFC')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Location of Pune', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Location',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Pune')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Add Pop Up Data For Location of Mumbai', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Mumbai')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Add Pop Up Data For ESI Dispensary of Mumbai', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('ESI Dispensary',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Mumbai')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For ESI Dispensary of THANE', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('THANE')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Add Pop Up Data For Designation of EMPLOYEE', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Designation',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('EMPLOYEE')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Designation of MANAGER', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('MANAGER')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	it('Add Pop Up Data For Grade of A', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Grade',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('A')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Grade of B', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('B')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	it('Add Pop Up Data For Cost Centre of Mumbai', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Cost Centre',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Mumbai')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Cost Centre of Pune', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Pune')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})

	it('Add Pop Up Data For Branch of Mumbai', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Branch',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Mumbai')
		cy.wait(1000)
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Branch of Pune', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('Pune')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Add Pop Up Data For Department of IT', function() {
		cy.wait(1000)
		cy.get('#metadatatable').select('Department',{force:true})
		cy.wait(2000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('IT')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	it('Add Pop Up Data For Department of HR', function() {
		cy.wait(1000)
		cy.get('[title="Add Popup"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#popupvalue').click({force: true})
		cy.get('#popupvalue').type('HR')
		cy.get('[onclick="submitData()"]').click({force: true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click({force: true})
	})
	
	
	it('Configuration Fields', function() {
		cy.wait(2000)
		cy.get('#HR_ConfigurationFields').click({force: true})
		cy.wait(3000)
		cy.get('[title="Add New Configuration Field"]').eq(0).click({force: true})
		cy.wait(2000)
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').type('Test Field')
		
		cy.get('select[name=FieldType]').select('TEXT',{force:true})
		cy.get('input[name=FieldSize]').click({force: true})
		cy.get('input[name=FieldSize]').clear()
		cy.get('input[name=FieldSize]').type('10')
		
		
		//cy.get('#chkValidate').check({force:true}) 
		//cy.get('#chkTransField').check({force:true}) 
		//cy.get('#Filter').check({force:true}) 
		cy.wait(1000)
		
		cy.get('#sbtBtn').click({force: true})
		cy.wait(4000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data added successfully.!')
		})
		cy.get(".toast-message").click({force: true})
	})	


	it('User Logout', function() {
		cy.wait(1000)
		cy.get('[role="button"]').eq(3).click({force: true})
		cy.wait(1000)
		cy.get('a[href="/Identity/Account/Signout"]').click({force: true})
		cy.wait(2000)
	})
	
	
})