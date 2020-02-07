var axios = require('axios');

async function getThreeWords(addressBody) {
    return new Promise((resolve, reject) => {
        var address = getAddress(addressBody);
        queryOpenCage(address)
            .then(response => parseOpenCageResponse(response))
            .then(threeWords => resolve(threeWords))
            .catch(err => reject(err));
    })
};

/*
 *  Address Functions
 */

function getAddress(data) {
    var street = cleanUp(data.street);
    var city = cleanUp(data.city);
    var state = cleanUp(data.state);
    var zip = fixZip(data.zip);
    var country = "united states";
    return street + ", " + city + ", " + state + ", " + zip + ", " + country;
}

function cleanUp(addressPart) {
    addressPart = addressPart.toLowerCase();
    addressPart = addressPart.replace(/\+/g, " ");
    return addressPart;
}

function fixZip(zip) {
    zip = zip.toString();
    while (zip.length < 5) {
        zip = "0" + zip;
    }
    return zip;
}

/*
 *  What3Words Functions
 */

function queryOpenCage(addressString) {
    return axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
            key: process.env.OCD_API_KEY,
            q: addressString,
            countrycode: 'us',
            limit: '1'
        }
    });
}

function parseOpenCageResponse(response) {
    var words = response.data.results[0].annotations.what3words.words;
    return words;
}

exports.getThreeWords = getThreeWords;
exports.cleanUp = cleanUp;
exports.fixZip = fixZip;