const words_fetcher = require('./words_fetcher');

test('converts "El+Camino+Real" to "el camino real"', () => {
    expect(words_fetcher.cleanUp("El+Camino+Real")).toBe("el camino real");
});

test('converts "9999" to "09999"', () => {
    expect(words_fetcher.fixZip("9999")).toBe("09999");
})