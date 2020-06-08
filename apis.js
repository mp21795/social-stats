// Here we will store all the apis

const API_ENDPOINT = "api.instagram.com";
const GRAPH_ENDPOINT = "graph.instagram.com";
const INSTAGRAM_APP_ID = "257304545693452";
const INSTAGRAM_APP_SECRET = "d1189e5d3f5e41cddf2b874829e98bef";
const apiUrl = 'https://' + API_ENDPOINT;
const graphUrl = 'https://' + GRAPH_ENDPOINT;

/*

https://api.instagram.com/oauth/authorize
  ?client_id={instagram-app-id}
  &redirect_uri={redirect-uri}
  &scope={scope}
  &response_type=code
  &state={state}        //Optional

 */
// Get Authorization
const getAuthorization = function () {
    var path = `${apiUrl}/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=/&scope=user_profile&response_type=code`;

    https.get(path,  (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                          `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                          `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
};

/*

GET https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret={instagram-app-secret}
  &access_token={short-lived-access-token}

 */
// Get Access Token
const getAccessToken = function () {
    var path = `/access_token?grant_type=ig_exchange_token&client_secret=${INSTAGRAM_APP_SECRET}&access_token=${short-lived-access-token}`;

    var options = {
        host: apiUrl,
        //port: 80,
        path: path,
        method: 'GET'
    };

    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
};
