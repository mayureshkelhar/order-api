# Validate the APIs to process orders


--- Tools/Framework ---

1. Mocha test framework
2. Chai assertion library
3. Javascript as PL
4. Mochawesome reporting lib


--- Setup/Install ---
-> Install dependancies by using "npm install"

--- Run Test ---
-> update variable "endPointURI" in Orderflow/common/constants.js and add your URI to local API run
e.g `export let endPointURI = "http://localhost:51544/v1/";`
-> navigate to path $cd orderflow
-> run comman "npm test"
