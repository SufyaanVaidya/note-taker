const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
var app = express();
var PORT = process.env.PORT || 3001;

