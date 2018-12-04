const {randomPepperoni} = require('./main');

describe('Testing random locations for pepperoni', () => {
	test('location must be above 80 and below 270', () =>{
    const res = randomPepperoni();
		expect(res >= 80 && res <= 270).toBe(true);
	});
});
