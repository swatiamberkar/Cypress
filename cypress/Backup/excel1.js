
import excel from './excel';

describe("Dynamically Generated Tests", () => {
it('successfully Page loads', function() {
	const home = new excel();
	cy.log(excel.PrintText)
})
});