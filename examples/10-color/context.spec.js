describe( 'Color', function() {

  it( 'is defined', function() {
    expect(Color).toBeDefined();
  });

  it('has a rgb contract', function(){
    var c = Color.rgb([12, 13, 14]);
    expect(c instanceof Color).toBeTruthy();
    expect(c.toRgb()).toEqual([12, 13, 14]);
  });

  it('has a hex contract', function(){
    var c = Color.hex("#0c0d0e");
    expect(c instanceof Color).toBeTruthy();
    expect(c.toRgb()).toEqual([12, 13, 14]);
    expect(c.toHex()).toEqual("#0c0d0e");
  });
});
