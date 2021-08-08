// from webAPI
const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));

// print lat long of each sapcex station
d3.json(url).then(spaceXResults.map ==> return spaceXResults.location.latitude);

