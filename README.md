# RUC Paraguay ETL
An ETL to own your private database of Paraguay RUC (As the goverment doesn't provide a webservice for that)
## Motivation
The goverment of Paraguay doesn't have a webservice to get the RUC information, so I decided to create my own database with the information of the RUCs.
## How it works
The apps runs a scheduled task every day at a given time (you can schedule it to what fits you best).
The ETL gets the information from the goverment website (zip files), extract the data from the zip files, parses it and saves it into a SQLite database.

## Caveats
The main caveat is that the goverment can change anything at any moment (e.g. the url, the format of the zip files, etc) and the ETL will stop working.

## Resources
TSConfig from Total Typescript<br>
https://www.totaltypescript.com/tsconfig-cheat-sheet

Why use SQLite?<br>
First motivation:
https://kentcdodds.com/blog/i-migrated-from-a-postgres-cluster-to-distributed-sqlite-with-litefs

That lead me to this:<br>
https://fly.io/blog/all-in-on-sqlite-litestream/