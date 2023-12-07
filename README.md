# RUC Paraguay ETL 🇵🇾
[Need english README 🇬🇧 🇺🇸? No worries, click here](README.en.md)

Un ETL Node.js con base de datos local de RUCs de Paraguay 🏢

## Motivación 💡
- El gobierno de Paraguay no ofrece un webservice para obtener datos de contribuyentes.
- Encontré repos en GitHub con soluciones para esto, pero ninguno en Javascript.

Así que decidí crear la versión en Javascript. 🤓

## Cómo funciona
La aplicación ejecuta una tarea al iniciarse y la repite todos los días a una hora programada. Puedes programarla según lo que mejor te convenga. 🔄

El ETL obtiene la información del sitio web del gobierno, extrae los datos de archivos zip, los parsea y los guarda en una base de datos SQLite. 💾

## Cómo ejecutarlo
### Requisitos previos
- Node 🚀 (Testeado con node 18)

### Pasos
1. Clona el repositorio
2. CD al directorio
3. Copia el archivo `.env.example` a `.env` y realiza los ajustes necesarios
4. Ejecuta `npm install`
5. Ejecuta `npm run migrate --name init`
6. Ejecuta `npm run build`
7. Ejecuta `npm start`
...o, si quieres disparar el proceso ETL inmediatamente, ejecuta `npm run start -- startmeup`

Si has seguido los pasos correctamente, deberías ver el proceso iniciándose en el horario programado (o inmediatamente si lo iniciaste con el flag startmeup), y en la salida debería verse algo así:
<br>
`Downloading zip, and parsing data for ending digit:  0`<br>
`173995 contribuyentes found`<br>
`Storing data...`<br><br>
Y, después de un tiempo, deberías ver:<br>
`Done with ending digit:  0`


El proceso se repetirá para todos los dígitos finales (0-9).

### REST API
Una vez que tu base de datos contenga datos, puedes usar la API REST para consultarlos.

La aplicación expone una API REST simple con los siguientes endpoints:

`GET /ruc/:ruc` - Retorna los datos del contribuyente para el RUC dado

e.g. `/ruc/80000001` 

retorna
```
{
"ruc": "80000001",
"razonSocial": "NAVIERA CONOSUR SOCIEDAD ANONIMA",
"digitoVerificador": "3",
"rucAnterior": "NCOA905190H",
"estado": "BLOQUEADO",
"fechaHoraImportacion": "2023-12-07T11:31:51.496Z"
}
```

`GET /razon-social/:term` - Retorna un array de contribuyentes que contienen el término dado en su nombre (Razon Social)

e.g. `/razon-social/MARTINETTI LOPEZ`
retorna
```
[
{
"ruc": "2509803",
"razonSocial": "MARTINETTI LOPEZ, VICTOR ALEJANDRO",
"digitoVerificador": "9",
"rucAnterior": "MALV813370R",
"estado": "ACTIVO",
"fechaHoraImportacion": "2023-12-07T11:38:31.248Z"
},
{
"ruc": "2509804",
"razonSocial": "MARTINETTI LOPEZ, JUAN RAFAEL",
"digitoVerificador": "7",
"rucAnterior": "CAVI712851Z",
"estado": "ACTIVO",
"fechaHoraImportacion": "2023-12-07T11:42:02.729Z"
},
{
"ruc": "3187875",
"razonSocial": "MARTINETTI LOPEZ, FABIOLA GRACIELA",
"digitoVerificador": "0",
"rucAnterior": "MALF901730L",
"estado": "ACTIVO",
"fechaHoraImportacion": "2023-12-07T11:45:13.706Z"
}
]
```

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
- [✅] Agregar una API simple
- [ ] Agregar pruebas
- [ ] Agregar un logger configurado para enviar notificaciones por correo electrónico en caso de errores
- [ ] Agregar un crawler para intentar detectar cambios en el sitio web del gobierno

## Licencia
MIT
