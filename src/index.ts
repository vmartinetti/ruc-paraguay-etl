import { CronJob } from 'cron';
import { URL_ROOT, CRON_DAILY } from './config';
import axios from 'axios';
import AdmZip from 'adm-zip';

const extractDaily = new CronJob(
	// '0 */1 * * * *', // cronTime
	CRON_DAILY, // cronTime
	main, // onTick
	null, // onComplete
	false, // start
	'America/Los_Angeles' // timeZone
);

extractDaily.start();

async function main() {
  const endingDigit = 0;
  const data = await downloadAndParseZip(endingDigit)
  console.log(data);
}

async function downloadAndParseZip(endingDigit: number) {
  const url = `${URL_ROOT}${endingDigit}.zip`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const zip = new AdmZip(Buffer.from(response.data, 'binary'));
  const zipEntries = zip.getEntries();
  const txtFile = zipEntries[0];
  if (!txtFile) {
    throw new Error('No txt file found in zip');
  }
  const content = txtFile.getData().toString('utf8');

  const lines = content.split('\n');
  const data = lines.map(line => {
    const [ruc, nombre, digitoVerificador, rucAnterior, estado] = line.split('|');
    return { ruc, nombre, digitoVerificador, rucAnterior, estado };
  });

  return data;
}