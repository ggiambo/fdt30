# FdT30 - La Terza Reincarnazione Del Forum Dei Troll

## Prerequisiti
**JDK** Se non hai Java Development Kit installato vergognati e vai subito su https://jdk.java.net/ e scaricati una Reference Implemetation (Per esempio https://jdk.java.net/java-se-ri/11)

**Maven** Questo e' facile: Vai su https://maven.apache.org/ scarica e installa

**node** Facilissimo, vai su https://nodejs.org/ e scarica la versione 14 (Non so se altre versioni funzionano)

## Start !
### Backend
Piazzati nella directory principale e
```
export JWT_SECRET=mySecret!
mvn run:boot
```
La variabile d'ambiente `JWT_SECRET` viene usata per l'autentificazione client-server. Scegline una e non cambiarla !

### Frontend
Piazzati nella subdirectory `frontend` e
```
npm install
npm run start
```
Il primo comando, `npm install`, serve solo la prima volta o se ci sono nuove dipendenze.

Ora dovrebbe automagicamente aprirsi un browser che punta direttamente a http://localhost:3000/ - Buon divertimento !
