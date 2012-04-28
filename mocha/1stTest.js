//Just understanding how it works
describe('Array', function() {
	before(function() {

	});

	describe('#indexOf()', function() {
		it('should return -1 when not present', function() {
			[1,2,3].indexOf(4).should.equal(-1);
		});
	});

	describe('#slice()', function() {
		it('should return [1,2] when sliced', function() {
			var a = [1,2,3];
			a.slice(0, a.length-1).should.eql([1,2]);
		});
	});
});