Requirement:
1) NODE v14.8.0
2) MongoDB v4.4.0

To Run The Application
1) npm install
2) node index.js

Url: http://localhost:3000/api/scheduleMail
Method: POST
Description: This API will create a scheduling of mail for a user at a particular time (hour and minute of everyday)

RequestBody: {
        "email":"niskumar15@gmail.com",
        "time":"2020-09-05T12:01:00"
    }

Response: {
        "msg": "subscription created successfully"
    }

Note:
1) This is very basic application, not suitable for production.
2) mongoDb must be running locally or change the mongoUrl in config file
3) valid smptUrl must be provided in config file. Here a dummy url is used "smtps://emailname@gmail.com:somepassword@smtp.gmail.com"
