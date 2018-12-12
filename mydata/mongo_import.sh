#!/usr/bin/bash
## include --upsert if adding to a prexistitng collection
mongoimport -d taxisService -c clients --type csv --file d:\Yaroslav(2017-2018)\University-2018\Productive-web-systems\labs\lab3\apps\taxi-service-v-3\mydata\London_postcodes.csv --headerline