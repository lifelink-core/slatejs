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
                        function (d) {
                            return Promiser.resolve(d.first + d.second + d.third);
                        }
                    ],
                    third: [
                        [], function () { return Promiser.resolve("3"); }
                    ],
                    second: [
                        [], function () { return Promiser.resolve("2"); }
                    ],
                    first: [
                        [], function () { return Promiser.resolve("1"); }
                    ],
                    all: [
                        ["last"],
                        function (d) {
                            return Promiser.resolve(d.last);
                        }
                    ]
                };
                var slate = new Slate(providers, Promiser);

                slate.get("all").then(function (all) {
                    expect(all).toBe("123");
                    done();
                });
            });
        });
    }
);
