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

            it( "supports put add/clear", function (done) {
                var providers = {
                    second: [
                        ["first"],
                        function (d) { return d.first + "2"; }
                    ]
                };
                var slate = new Slate(providers, Promiser)

                slate.put("first", Promise.resolve("1"));

                slate.get("second").then(function(d) {
                    expect(d).toBe("12");

                    slate.clear();
                    slate.put("first", Promise.resolve("one"));
                    slate.get("second").then(function (dd) {
                        expect(dd).toBe("one2");
                        done();
                    });
                });
            })
        });
    }
);
