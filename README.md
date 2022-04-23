# TeamCoda

## API's Description

### GET API
 API signature is: **GET /google-sheet**
 
 **API Description**
 In returns the details of all the coins as an array of JSON.
 Sample like:
 ```
[
    {"Coin":"BTH","Price":"$2,901.89","Volume":"1215983","Cap":"$24953BN"},
    {"Coin":"EETH","Price":"$29","Volume":"12983","Cap":"$253BN"},
    ..
    ..
]
```
### POST API
 API Signature is : **POST /save-data**
 The API needs to be passed with a body with all the coin details like as follows:
  ```
    {
    "newCoin":"BTH",
    "price":"$2,901.89",
    "volume":"1215983",
    "cap":"$24953BN"
    }
```
  **API Description**
POST API update the values of the coin if it is already present, if the coin is not listed in the sheet it will add it with all the details.

## Google Sheets

The database for this project is been setup on GOOGLE SHEETS.
The are two sheets:
- SHEET1: This is the main sheet from where the data is been retreived and posted.
- TEST SHEET: This sheet is used for testing the APIS.

The google sheet can be viewed with the following link:
https://docs.google.com/spreadsheets/d/1gEK-ngWKHcI2oqc9dgOLbqAh94_4KOkmXe2XV2Ps5rk/edit?usp=sharing

## Run APP on Docker
Clone the repository.
```
git clone <CLONE_URL>
```

Build the app on docker.
```
docker build -t <YOUR_NAME>
```

Run the app on docker.

```
docker run -p 4000:4000 -d <YOUR_NAME>
```

After the last command the app will be running on the port 4000 as a localhost and the APIS can be tested using **Postman** and the database can be viewed on the above google sheet link.

**GET API**
http://localhost:4000/google-sheet

**POST API***(call this with coin information in body)
http://localhost:4000/save-data


## Run APP on local machine
Clone the repository.
```
git clone <CLONE_URL>
```

Run the command to install all the dependencies
```
npm install
```

Run the app using the command, the app will be run as a nodemon.

```
npm start
```

After the last command the app will be running on the port 4000 as a localhost and the APIS can be tested using **Postman** and the database can be viewed on the above google sheet link.

**GET API**
http://localhost:4000/google-sheet

**POST API***(call this with coin information in body)
http://localhost:4000/save-data

## Running test cases
### On Docker
The test cases will run on docker with command:
```
docker run <YOUR_NAME> npm run test
```
### On local machine

Command to run the test cases on the local machine is:

```
npm test
```

## Comments
- The code quality is measured using SonarLint's recommendations. As its extension been installed on the VSCode while developing.
- For testing the APIS the JEST framework is been used.
- For the running the APIs Postman is been used.


>Utkarsh Goyal


