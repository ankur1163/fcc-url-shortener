# Request Header Parser Microservice

Request Header Parser Microservice is a REST API which displays your browser's
reported IP address, language preference, and operating system.

## Resources

### GET /

Returns the browser's IP address, language and operating system

Example request URLs:

`https://request-header-parser-microservice.example.com/`

Example Headers:

    Accept-Language: en,en-us;q=0.7,nl;q=0.3
    User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0
    X-Forwarded-For: 141.81.129.241, 140.16.171.217, 71.145.61.198

#### Responses

**STATUS 200** - application/json

##### EXAMPLE

    {
      ipaddress: '141.81.129.241',
      language: 'en',
      software: 'Windows 10'
    }
