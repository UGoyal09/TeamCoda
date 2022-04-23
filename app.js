const express = require("express");
const { google } = require('googleapis');
const config = require('./utils/config')


const app = express();
app.use(express.json());

module.exports = app;

const sheetId = config.SHEET_ID;
const range = config.SHEET_RANGE;


const authentication = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const sheets = google.sheets({
        version: 'v4',
        auth: client
    });

    return { sheets }
}

app.get('/google-sheet', async (_req, res) => {
    try {
        const { sheets } = await authentication();

        //reading teh sheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range
        })
        var labels = response.data.values[0]
        var output = response.data.values.slice(1).map(item => item.reduce((obj, val, index) => {
            obj[labels[index]] = val
            return obj
        }, {}))
        res.status(200).send(output)
    } catch (e) {
        console.log("Error while reasing the sheet value::", e)
        res.status(400).send();
    }
});

app.post('/save-data', async (req, res) => {
    try {

        const { newCoin, price, volume, cap } = req.body;
        const { sheets } = await authentication();

        // I modified below script.
        const [, ...values] = (await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: range })).data.values;
        const obj = values.reduce((o, [a, ..._v], i) => ((o[a] = i + 2), o), {});
        let postReq;
        if (obj[newCoin]) {
            postReq = await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `${range}!A${obj[newCoin]}`,
                resource: { values: [[newCoin, price, volume, cap]] },
                valueInputOption: "USER_ENTERED",
            });
        } else {
            postReq = await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: range,
                valueInputOption: "USER_ENTERED",
                resource: { values: [[newCoin, price, volume, cap]] },
            });
        }
        if (postReq.status == 200) {
            res.status(200).send("The values are saved successfully");
        } else {
            res.status(400).send("Error in saving the values");
        }

    } catch (e) {
        console.log("Error while saving the data on the google sheets::", e);
        res.status(400).send();
    }
})