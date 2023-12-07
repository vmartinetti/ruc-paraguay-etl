# RUC Paraguay ETL 🇵🇾
[Necesitas las instrucciones en español🇪🇸? Sin problema, haz click aquí](README.es.md)

A Node.js ETL with the database of Paraguay's RUC (taxpayers id's)🏢

## Motivation 💡
As Paraguay gov doesn't provide a webservice to get taxpayers data, I decided to create a solution for that. 🤓

## How it works
The app runs a task on start and at a scheduled time every day. You can schedule it to what fits you best. 🔄

The ETL gets the information from the government website, extracts the data from zip files, parses it, and saves it into a SQLite database. 💾

## How to run it
### Prerequisites
- Node 🚀 (Tested with node 18)

### Steps
1. Clone the repo
2. CD into the repo
3. Copy the `.env.example` file to `.env` and make the adjustments you need
4. Run `npm install`
5. Ejecuta `npm run migrate --name init`
6. Run `npm run build`
7. Run `npm start`

If you followed the steps correctly, you should see the process starting at your scheduled time, and the output should look some like this:
<br>
`Downloading zip, and parsing data for ending digit:  0`<br>
`173995 contribuyentes found`<br>
`Storing data...`<br><br>
And, after a little while, you should see:<br>
`Done with ending digit:  0`


The process will repeat for all the ending digits (0-9).

## Caveats
The main caveat is that the goverment can change anything at any moment (e.g. the url, the format of the zip files, etc) so the ETL would stop working. Obviously, that will affect me as well, so I'll try to keep this repo updated as much as I can.

## Resources
TSConfig from Total Typescript<br>
https://www.totaltypescript.com/tsconfig-cheat-sheet

Why use SQLite?<br>
First motivation:
https://kentcdodds.com/blog/i-migrated-from-a-postgres-cluster-to-distributed-sqlite-with-litefs

That lead me to this:<br>
https://fly.io/blog/all-in-on-sqlite-litestream/

## TODO list
- [ ] Add a simple api
- [ ] Add tests
- [ ] Add a logger configured to send email notifications on errors

## License
MIT

