function fuzzTest() {
  var url = "https://example.com/api"; // Replace with the URL of your web application
  var sheet = SpreadsheetApp.getActiveSheet(); // Replace with the name of your Google Sheets sheet
  
  // Define an array of payloads to fuzz the application with
  var payloads = [
    "'; DROP TABLE users; --", // Example SQL injection payload
    "<script>alert('XSS');</script>", // Example XSS payload
    "password123", // Example weak password
    "admin", // Example common username
    // Add more payloads here
  ];
  
  // Loop through the payloads and send a request to the application with each one
  for (var i = 0; i < payloads.length; i++) {
    var payload = payloads[i];
    var options = {
      'method' : 'post',
      'contentType': 'application/json',
      'payload' : JSON.stringify({'query': 'query { example(input: "' + payload + '") }'})
    };
    var response = UrlFetchApp.fetch(url, options);
    sheet.appendRow([payload, response.getResponseCode(), response.getContentText()]);
  }
}
