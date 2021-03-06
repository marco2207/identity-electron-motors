const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const url = require("url");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
var sfUsername, sfPassword, username;
const db = require("./db.js");

const SALESFORCE_COMMUNITY_URL = process.env.SALESFORCE_COMMUNITY_URL;
const SALESFORCE_CLIENT_ID = process.env.SALESFORCE_CLIENT_ID;
const SALESFORCE_REDIRECT_URI = process.env.SALESFORCE_REDIRECT_URI;
const SALESFORCE_MODE = process.env.SALESFORCE_MODE;
const SALESFORCE_SAVE_ACCESS_TOKEN = process.env.SALESFORCE_SAVE_ACCESS_TOKEN;
const SALESFORCE_SELF_REGISTER_ENABLED = process.env.SALESFORCE_SELF_REGISTER_ENABLED;
const SALESFORCE_SELF_REGISTER_STARTURL_ENABLED = process.env.SALESFORCE_SELF_REGISTER_STARTURL_ENABLED;
const SALESFORCE_FORGOT_PASSWORD_ENABLED = process.env.SALESFORCE_FORGOT_PASSWORD_ENABLED;


express()
    .use(express.static(path.join(__dirname, "public")))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())
    .set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .get("/", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/index", {
                account: data.account,
                vehicle: data.vehicle,
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
            });
        });
    })
    .get("/announce", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/announce", {
                account: data.account,
                vehicle: data.vehicle,
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
            });
        });
    })
    .get("/order", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/order", {
                account: data.account,
                vehicle: data.vehicle,
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
            });
        });
    })
    .get("/customize", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/customize", {
                account: data.account,
                vehicle: data.vehicle,
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
            });
        });
    })
    .get("/dashboard", function (request, response) {
        var username = request.cookies.username;
        db.getAccountAndVehicleByUsername(username, data => {
            response.render("pages/dashboard", {
                account: data.account,
                vehicle: data.vehicle,
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
            });
        });
    })
    .get("/api/account", function (req, res) {
        var username = req.query.username;
        db.getAccountByUsername(username, function (account) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(account, null, 3));
        });
    })
    .get("/api/vehicle", function (req, res) {
        var username = req.query.username;
        db.getVehicleByUsername(username, function (vehicle) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(vehicle, null, 3));
        });
    })
    .post("/api/vehicle", function (req, res) {
        var vehicle = req.body;
        db.updateVehicle(vehicle, function (updatedVehicle) {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(updatedVehicle, null, 3));
        });
    })
    .post("/api/pricequote", function (req, res) {
        var vehicle = req.body;
        var data = db.getPrice(vehicle);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(data, null, 3));
    })
    .get("/_callback", function (request, response) {
           response.render("pages/_callback", {
                SALESFORCE_COMMUNITY_URL : SALESFORCE_COMMUNITY_URL,
                SALESFORCE_CLIENT_ID : SALESFORCE_CLIENT_ID,
                SALESFORCE_REDIRECT_URI : SALESFORCE_REDIRECT_URI,
                SALESFORCE_MODE : SALESFORCE_MODE,
                SALESFORCE_SAVE_ACCESS_TOKEN : SALESFORCE_SAVE_ACCESS_TOKEN,
                SALESFORCE_SELF_REGISTER_ENABLED : SALESFORCE_SELF_REGISTER_ENABLED,
                SALESFORCE_SELF_REGISTER_STARTURL_ENABLED : SALESFORCE_SELF_REGISTER_STARTURL_ENABLED,
                SALESFORCE_FORGOT_PASSWORD_ENABLED : SALESFORCE_FORGOT_PASSWORD_ENABLED
           })
    })
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
