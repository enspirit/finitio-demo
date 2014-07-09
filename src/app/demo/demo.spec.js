describe( 'demo section', function() {
  beforeEach( module( 'finitio.demo' ) );

  it( 'should have a dummy test', inject( function() {
    expect( true ).toBeTruthy();
  }));
});

