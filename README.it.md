🌐 [English](README.md) | **Italiano**

# Surfx

Un'app desktop (Angular + Electron) per aprire un file XML e navigarlo: la struttura ad albero nel pannello laterale, gli elementi in una tabella.

> **Prototipo iniziale.** Oggi apre e mostra file XML. JSON, modifica, salvataggio ed esportazione (CSV, Excel, PDF) sono nei menu ma non ancora implementati: sono disattivati.

## Avvio

Serve [Node.js](https://nodejs.org) 20.19 o successivo.

```bash
npm install
npm run electron    # compila l'app e la apre in una finestra Electron
```

`npm start` invece la avvia nel browser, su http://localhost:4200 (server di sviluppo Angular).

Poi **File → Open file...** e scegli un file XML. `src/assets/test.config.xml` è un esempio: la configurazione del menu di [luma_oled_menu](https://github.com/suppressio/luma_oled_menu).

## Sviluppo

```bash
npm run build    # build Angular in dist/surfx/
npm test         # test unitari (Karma)
```

| Percorso | Cosa |
|---|---|
| `main.js` | processo principale Electron: apre una finestra su `dist/surfx/browser/index.html` |
| `src/app/menu/` | barra dei menu in alto (File, Edit, Settings, Export) |
| `src/app/dom-nav/` | vista ad albero del file nel pannello laterale |
| `src/app/main-grid/` | tabella degli elementi |
| `src/app/services/file-io.service.ts` | lettura del file e parsing XML (`fast-xml-parser`); JSON è solo uno stub |
| `src/app/services/dom-tree-db.service.ts` | trasforma l'oggetto letto in nodi dell'albero |

`app.js` è un vecchio punto di ingresso Electron, non più usato (`package.json` punta a `main.js`).
