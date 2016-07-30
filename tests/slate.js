define( [ "slate", "native-promise-only" ],
    function (Slate, Promiser) {
        describe( "Slate tests", function () {
            it( "Constructor!", function () {
                var slate = new Slate();

                expect(slate).toBeTruthy();
            });

            it( "handles nested dependencies", function (done) {
                var providers = {
                    last: [
                        ["first", "second", "third"],
                        function (first, second, third) {
                            return Promiser.resolve(first + second + third);
                        }
                    ],
                    third: [
                        [], function () { return Promiser.resolve("third"); }
                    ],
                    second: [
                        [], function () { return Promiser.resolve("second"); }
                    ],
                    first: [
                        [], function () { return Promiser.resolve("first"); }
                    ],
                    all: [
                        ["last"],
                        function (last) {
                            return Promiser.resolve(last);
                        }
                    ]
                };
                var slate = new Slate(providers, Promiser);

                slate.get("all").then(function (all) {
                    expect(all).toBe("firstsecondthird");
                    done();
                });
            });
        });
    }
);
