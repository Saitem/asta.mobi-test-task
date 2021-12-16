# Covid stat


## How to start


```
npm run dev 
```

## Routes documentation

```
localhost:5000/
/api
  /auth
    POST
    /signup
      name: String,
      lastname: String,
      phoneNumber: String,
      password: String,
      countries: Array, //Array of countries
    POST
    /signin
      phoneNumber: String,
      password: String,

  /covid-stat //Covid statistic
    GET:
    /get-data-by-country/:country
      headers: {
        access_token: authToken
      }

    GET:
    /update-covid-stat

  GET
  /notification
    /send-notification-to-user
      headers: {
        access_token: authToken
      }

```
