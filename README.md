# RUC Paraguay ETL
An ETL app to own your private database of Paraguay's RUC (As the goverment doesn't provide a webservice for that)
## Motivation
The goverment of Paraguay doesn't have a webservice to get the RUC information, so I decided to create my own database with the information of the RUCs.
## How it works
The apps runs a scheduled task every day at a given time (you can schedule it to what fits you best).
The ETL gets the information from the goverment website, extract the data from the zip files, parses it and saves it into a SQLite database.

## How to run it
### Prerequisites
- NodeJS 18

### Steps
1. Clone the repo
2. CD into the repo
3. Copy the `.env.example` file to `.env` and make the adjustments you need
4. Run `npm install`
5. Run `npm run build`
6. Run `npm start`

If you followed the steps correctly, you should see the process starting at your scheduled time, and the output should looks like this:
<br>
`Downloading zip, and parsing data for ending digit:  0
173995 contribuyentes found
Storing data...`<br><br>
And, after a little while, you should see:<br>
`Done with ending digit:  0`

The process will repeat for all the ending digits (0-9).

## Caveats
The main caveat is that the goverment can change anything at any moment (e.g. the url, the format of the zip files, etc) and the ETL would stop working. Obviously, that will affect me as well, so I'll try to keep this repo updated as much as I can.

## Resources
TSConfig from Total Typescript<br>
https://www.totaltypescript.com/tsconfig-cheat-sheet

Why use SQLite?<br>
First motivation:
https://kentcdodds.com/blog/i-migrated-from-a-postgres-cluster-to-distributed-sqlite-with-litefs

That lead me to this:<br>
https://fly.io/blog/all-in-on-sqlite-litestream/