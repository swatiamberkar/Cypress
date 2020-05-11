describe('Attendence Process ', function() {
	
		const Day = Cypress.moment().format('DD')
		const Day1 = parseInt(Day)+1
		const Month = Cypress.moment().format('MM')
		const year = Cypress.moment().format('YYYY')
		const currentDate = Day+'/'+Month+'/'+year
		const tomorrowDate = Day1+'/'+Month+'/'+year
		
	var url = 'https://next.pockethrms.com/'
	
	var employeeCode = 'CY3'
	var lopMonth = 'April'
	let leave ={LeaveType: "Paid Leave", FromDate: "06/04/2020", FromDateDay: "FULL DAY", ToDate: "06/04/2020", ToDateDay: "FULL DAY"};
	
	let leaveDateRange =
		[{LeaveType: "Paid Leave", FromDate: "24/04/2020", FromDateDay: "FULL DAY", ToDate: "24/04/2020", ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid Leave", FromDate: "24/04/2020", FromDateDay: "FULL DAY", ToDate: "24/04/2020", ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid Leave", FromDate: "24/04/2020", FromDateDay: "FULL DAY", ToDate: "24/04/2020", ToDateDay: "SECOND HALF DAY"}, 
		];	
		
		/*
		{LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "FIRST HALF DAY", ToDate: currentDate, ToDateDay: "SECOND HALF DAY"},
		 {LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "FULL DAY"},
		 {LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "FIRST HALF DAY"},
		 {LeaveType: "Paid Leave", FromDate: currentDate, FromDateDay: "SECOND HALF DAY", ToDate: currentDate, ToDateDay: "SECOND HALF DAY"},
		 */
		 
	
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
		Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','.AspNetCore.Session','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XName','XSchemaName','XUserId','XUserName','_ga','_gid','ai_session','ai_user','new_username')
		cy.wait(2000)
    })
	
	it('Pocket HRMS Login', function() {
		cy.visit(url)
		
		cy.get('#Email').click()
		cy.get('#Email').type('nileshgajare@live.com')
		
		cy.get('#Password').click()
		cy.get('#Password').type('123456')
		
		cy.get('[type="submit"]').click({force: true})
		
		cy.wait(2000)
	})
		
	it('Change Company', function() {		 
		cy.changeCompany(); 	
	})
	
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
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
	
	Cypress.Commands.add('navigate_LeaveSetting',()=>{
    
			cy.wait(1000)
			cy.visit(url+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.get('#leave_detail_tab').click({force:true})
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
	
	Cypress.Commands.add('delete_EmployeesDebitLeaves',()=>{
	cy.get('div').then(($sp) => {
		if ($sp.is('#debitedLeaves')) {
			
		cy.get('#tableSorter > tbody >tr').then(listing => {
			var rowlength = Cypress.$(listing).length;
			if(rowlength != 0)
			{
				cy.get('#tableSorter > tbody >tr:nth-child(1) >td:nth-child(8) > button').click()
				cy.wait(3000)
			}
			if(rowlength != 1)
			{
			cy.delete_EmployeesDebitLeaves()
			}	
		})
		
		} 
		})	
		
		
		})	
		
		
	Cypress.Commands.add('set_DefaultLeaveConfiguration',(LeaveType)=>{
		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(8000)
		
		cy.get('#ddLeavType').select(LeaveType)
		cy.wait(2000)
		
		cy.get('#btnDelete').click({force:true})
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
	


	it('Verify Add Leave page',function(){
	const { softAssert, softExpect } = chai;
		
		
		
		
		
		
		for(let j=0; j< leaveDateRange.length; j++){
		cy.navigate_EmployeeLeave()	
		cy.delete_EmployeesAllLeaves()	
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveDateRange[j].LeaveType){
				expect(text).to.eq(leaveDateRange[j].LeaveType)
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)	
			}
			
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveDateRange[j].FromDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveDateRange[j].ToDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay,{force: true})
		//cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
		//cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
		cy.get('#leaveType').select(leaveDateRange[j].LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Test');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		
		cy.get('#btnclose').click({force: true})
		cy.wait(2000)
		
		var fromDate1 = (leaveDateRange[j].FromDate).toString();
		var toDate1 = (leaveDateRange[j].ToDate).toString();	
		var fromDate = new Date(fromDate1);
		var toDate = new Date(toDate1);
		cy.log("fromDate: "+fromDate.toDateString())
		cy.log("toDate: "+toDate.toDateString())

		
		cy.get(".toast-message").invoke('text').then((text) => {		
			cy.log(text.trim())
	
		cy.wait(2000)
		//if(fromDate.getTime() === toDate.getTime())
		//	if(fromDate.toDateString() === toDate.toDateString()){	
		
			if(leaveDateRange[j].FromDateDay == leaveDateRange[j].ToDateDay){
				softExpect(text.trim()).to.eq('Leave Updated Successfully');
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[1]/th[2]").eq(i).invoke('text').then((openingLeave) => {	
				cy.log("openingLeave: "+openingLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[3]/th[2]").eq(i).invoke('text').then((debitLeave) => {	
				cy.log("debitLeave: "+debitLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[4]/th[2]").eq(i).invoke('text').then((usedLeave) => {	
				cy.log("usedLeave: "+usedLeave)
				
				cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
				cy.log("availableLeave: "+availableLeave)
				var leaveResult = parseFloat(openingLeave) - parseFloat(usedLeave)  - parseFloat(debitLeave)
				softExpect(parseFloat(leaveResult)).to.eq(parseFloat(availableLeave));				
				})
				})
				})	
				})
				
				cy.get(".mb-lg-0 >div>h5").eq(0).invoke('text').then((leaveType) => {	
				cy.log("leaveType: "+leaveType)
				if('Paid Leave'==leaveDateRange[j].LeaveType)
				{
					softExpect(leaveType).to.eq('PL');	
				}
				})
				
				cy.get(".mb-lg-0 >div>p").eq(1).invoke('text').then((leaveDate) => {	
				cy.log("leaveDate: "+leaveDate)
				softExpect(leaveDate).to.eq(leaveDateRange[j].FromDate+' - '+leaveDateRange[j].ToDate);	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(2).invoke('text').then((leaveDay) => {	
				cy.log("leaveDay: "+leaveDay)
				if(leaveDateRange[j].FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDay).to.eq(' FullDay - FullDay');	
				}
				else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDay).to.eq(' FirstHalf - FirstHalf');	
				}
				else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDay).to.eq(' SecondHalf - SecondHalf');	
				}	
				})
				
				cy.get(".mb-lg-0 >div>p").eq(3).invoke('text').then((leaveDays) => {	
				cy.log("leaveDays: "+leaveDays)
				if(leaveDateRange[j].FromDateDay == 'FULL DAY')
				{
				softExpect(leaveDays).to.eq('1');
				}
				else if(leaveDateRange[j].FromDateDay == 'FIRST HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}
				else if(leaveDateRange[j].FromDateDay == 'SECOND HALF DAY')
				{
				softExpect(leaveDays).to.eq('0.5');	
				}	
				})
				
				
			}
			else{
				softExpect(text.trim()).to.eq('From Day and To Day type should be same.');
				cy.get('#btnclose').click({force: true})
			}
	//	}			
		})
		
		
		})
		}
		})			
		}) 	
		}		
		})
	
	
	it('Verify Sick Leave Request with Future date',function(){
		
		
		cy.navigate_EmployeeLeave()
		
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()=='Sick Leave'){
				expect(text).to.eq('Sick Leave')
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() =='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
				cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(tomorrowDate)
			})
	   
			cy.wait(1000)
			cy.get('#todate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(tomorrowDate)
			})
	
		cy.wait(1000)
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select('Sick Leave',{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Sick leave for Future Date');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Sorry, Sick Leave can be Availed only for past days.')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		}) 		
		})
	

	it('Verify Leave Request when Leave Opening balance is 0',function(){
		cy.navigate_LeaveSetting()
		cy.set_DefaultLeaveConfiguration(leave.LeaveType)
		
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave.LeaveType.trim()){
				expect(text).to.eq(leave.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() !='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('0');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
			cy.wait(5000)	
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
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
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave Opening is 0')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		}) 		
		})
		
		
	it('Verify Multiple Leave Request for same dates',function(){
		
		cy.navigate_EmployeeLeave()
		cy.delete_EmployeesAllLeaves()
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		cy.wait(5000)
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave.LeaveType.trim()){
				expect(text).to.eq(leave.LeaveType.trim())
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		
			if(availableLeave.trim() <='0'){
			
			cy.get('.fa-ellipsis-v').eq(i-1).click({force: true})
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(5000)
			
			}
				
				cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
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
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave Updated Successfully')	
		cy.get(".toast-message").click()			
		})
		
		cy.wait(5000)
		
		//cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force:true})
				cy.wait(2000)
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
		cy.get('#drpFromDayType').select(leave.FromDateDay,{force: true})
		cy.get('#drpToDayType').select(leave.ToDateDay,{force: true})
		cy.get('#leaveType').select(leave.LeaveType,{force: true})
		
		cy.get('#remarks').click({force: true})
		cy.get('#remarks').clear()
		cy.get('#remarks').type('Festival !.');
		
		cy.wait(3000)
		cy.get('#btnAddLeave').click({force: true})
		cy.wait(5000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Leave is already applied for the same date')		
		})
		cy.get('#btnclose').click({force: true})
		//cy.xpath("//button[contains(@class,'btn btn-xs btn-danger')]").click({force: true})
		
		})
		}
		})			
		
		
		}) 		
		})


	
	
	
})