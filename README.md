# RUC Paraguay ETL 🇵🇾
[Need english instructions 🇬🇧 🇺🇸? No worries, click here](README.es.md)

Un ETL Node.js con base de datos local de RUCs de Paraguay 🏢

## Motivación 💡
- El gobierno de Paraguay no ofrece un webservice para obtener datos de contribuyentes.
- Encontré repos en GitHub con soluciones para esto, pero ninguno en Javascript.

Así que decidí crear la versión en Javascript. 🤓

## Cómo funciona
La aplicación ejecuta una tarea programada todos los días. Puedes programarla según lo que mejor te convenga. 🔄

El ETL obtiene la información del sitio web del gobierno, extrae los datos de archivos zip, los analiza y los guarda en una base de datos SQLite. 💾

## Cómo ejecutarlo
### Requisitos previos
- NodeJS 18 🚀

### Pasos
1. Clona el repositorio
2. Accede al repositorio
3. Copia el archivo `.env.example` a `.env` y realiza los ajustes necesarios
4. Ejecuta `npm install`
5. Ejecuta `npm run build`
6. Ejecuta `npm start`

Si has seguido los pasos correctamente, deberías ver el proceso iniciándose en el horario programado, y la salida debería verse así:
<br>
`Downloading zip, and parsing data for ending digit:  0`<br>
`173995 contribuyentes found`<br>
`Storing data...`<br><br>
Y, después de un tiempo, deberías ver:<br>
`Done with ending digit:  0`


El proceso se repetirá para todos los dígitos finales (0-9).

## Precauciones
Hay que saber que el gobierno puede cambiar cualquier cosa en cualquier momento (por ejemplo, la URL, el formato de los archivos zip, etc.), por lo que el ETL podería dejar de funcionar. Obviamente, eso también me afectaría a mí, así que trataré de mantener este repositorio actualizado tanto como pueda.

## Recursos
TSConfig de Total Typescript<br>
[https://www.totaltypescript.com/tsconfig-cheat-sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)

¿Por qué usar SQLite?<br>
Primera motivación:
[https://kentcdodds.com/blog/i-migrated-from-a-postgres-cluster-to-distributed-sqlite-with-litefs](https://kentcdodds.com/blog/i-migrated-from-a-postgres-cluster-to-distributed-sqlite-with-litefs)

Eso me llevó a esto:<br>
[https://fly.io/blog/all-in-on-sqlite-litestream/](https://fly.io/blog/all-in-on-sqlite-litestream/)

## Lista de tareas pendientes
- [ ] Agregar una API simple
- [ ] Agregar pruebas
- [ ] Agregar un registro configurado para enviar notificaciones por correo electrónico en caso de errores

## Licencia
MIT
