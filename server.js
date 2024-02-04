const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { JWT } from 'google-auth-library';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication

const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID, serviceAccountAuth);

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define your API routes here

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});

app.get('/api/data/:page', (req, res) => {
    const { page } = req.params;
    const rowsPerPage = 30;
    doc.loadInfo().then(() => {
        const sheet = doc.sheetsByIndex[0];
        const range = `A${page * rowsPerPage + 1}:Z${(page + 1) * rowsPerPage}`
        sheet.loadCells(range).then(() => {
            sheet.getCellsInRange(range).then((v) => {
                res.json(v);
            });
        });
    });
});

app.post('/api/edit', (req, res) => {
    const { cell, data } = req.body;
    console.log(cell, data);
    const sheet = doc.sheetsByIndex[0];
    const cellRef = sheet.getCellByA1(cell);
    cellRef.value = data;
    sheet.saveUpdatedCells().then(() => {
        res.json({
            message: "Success"
        });
    }).catch((error) => {
        res.status(400).send(error);
    });
});