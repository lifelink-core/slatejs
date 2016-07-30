define( [ "slate" ],
    function (Slate, Promiser) {
        describe( "Slate tests", function () {
            it( "Constructor!", function () {
                var slate = new Slate();

                expect(slate).toBeTruthy();
            });
        });
    }
);
