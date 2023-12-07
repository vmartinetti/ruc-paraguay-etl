import { CronJob } from 'cron';
import { URL_ROOT, CRON_SCHEDULE, TIMEZONE } from './config';
import axios from 'axios';
import AdmZip from 'adm-zip';
import { PrismaClient } from '@prisma/client';
import { Contribuyente } from './types';

const prisma = new PrismaClient();

const etlSchedule = new CronJob(
  CRON_SCHEDULE,
	main,
	null,
	false,
	TIMEZONE
);

etlSchedule.start();

/**
 * Downloads and parses a zip file based on the ending digit.
 * @param endingDigit - The ending digit used to determine the zip file to download.
 * @returns An array of `Contribuyente` objects parsed from the downloaded zip file.
 */
async function downloadAndParseZip(endingDigit: number): Promise<Contribuyente[]> {
  console.log('Downloading zip, and parsing data for ending digit: ', endingDigit)
  const fechaHoraImportacion = new Date().toISOString();
  const url = `${URL_ROOT}${endingDigit}.zip`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const zip = new AdmZip(Buffer.from(response.data, 'binary'));
  const zipEntries = zip.getEntries();
  const txtFile = zipEntries[0];
  if (!txtFile) {
    console.log('No txt file found in zip');
    return [];
  }
  const content = txtFile.getData().toString('utf8');

  const lines = content.split('\n');
  const dataParsed = lines.map(line => {
    const [ruc, razonSocial, digitoVerificador, rucAnterior, estado] = line.split('|');
    if (!ruc || !razonSocial || !digitoVerificador ) {
      return undefined;
    } else {
      return { ruc, razonSocial, digitoVerificador, rucAnterior, estado, fechaHoraImportacion };
    }
  })
  const data: Contribuyente[] = dataParsed.filter((item): item is Contribuyente => item !== undefined);
  return data;
}


/**
 * Stores the given array of `Contribuyente` objects in the database.
 * @param data - The array of `Contribuyente` objects to store.
 */
async function storeData(contribuyentes: Contribuyente[]) {
  console.log('Storing data...');
  for (const item of contribuyentes) {
    try {
      await prisma.contribuyente.upsert({
        where: { ruc: item.ruc },
        update: item,
        create: item,
      });
    } catch (error) {
      console.log('Error storing item: ', item, error);
      break;
    }
  }
}

/**
 * Iterates over a range of ending digits, downloads and parses a zip file for each digit,
 * and stores the parsed data in a database.
 */
async function main(): Promise<void> {
  for (let endingDigit = 0; endingDigit < 10; endingDigit++) {
    const data = await downloadAndParseZip(endingDigit)
    console.log(`${data.length} contribuyentes found`);
    if (data.length){
      await storeData(data);
    }
    console.log('Done with ending digit: ', endingDigit);
  }
}


