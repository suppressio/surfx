🌐 **English** | [Italiano](README.it.md)

# Surfx

A desktop app (Angular + Electron) to open an XML file and browse it: the structure as a tree in the side panel, the elements in a table.

> **Early prototype.** Today it opens and shows XML files. JSON, editing, saving and export (CSV, Excel, PDF) are in the menus but not implemented yet: they are greyed out.

## Run

You need [Node.js](https://nodejs.org) 20.19 or later.

```bash
npm install
npm run electron    # builds the app and opens it in an Electron window
```

`npm start` runs it in the browser instead, on http://localhost:4200 (Angular development server).

Then **File → Open file...** and pick an XML file. `src/assets/test.config.xml` is a sample: the menu configuration of [luma_oled_menu](https://github.com/suppressio/luma_oled_menu).

## Development

```bash
npm run build    # Angular build in dist/surfx/
npm test         # unit tests (Karma)
```

| Path | What |
|---|---|
| `main.js` | Electron main process: opens a window on `dist/surfx/browser/index.html` |
| `src/app/menu/` | top menu bar (File, Edit, Settings, Export) |
| `src/app/dom-nav/` | tree view of the file in the side panel |
| `src/app/main-grid/` | table of the elements |
| `src/app/services/file-io.service.ts` | file reading and XML parsing (`fast-xml-parser`); JSON is a stub |
| `src/app/services/dom-tree-db.service.ts` | turns the parsed object into tree nodes |

`app.js` is an older Electron entry point, no longer used (`package.json` points to `main.js`).
