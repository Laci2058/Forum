## MEAN Stack Fórum Alkalmazás

Ez egy egyszerű fórum webalkalmazás, ahol felhasználók posztokat és hozzászólásokat hozhatnak létre. A rendszer admin jogosultságokat is kezel.

---

## Technológiák

* **MongoDB** – Adatbázis
* **Express.js** – Backend REST API
* **Angular** – Frontend SPA
* **Node.js** – Backend futtatókörnyezet
* **Ionic Framework** – Felhasználóbarát felület

---

## Telepítés és futtatás

### 1. Backend beállítása

#### Követelmények:

```bash
# Server mappa
cd server

# Függőségek telepítése
npm install

# .env fájl létrehozása (pl.:)
touch .env
```

#### `.env` példa:

```
PORT=5000
MONGO_URI={atlas connection string}
```

#### Indítás:

```bash
# .ts fájlok fordítása .js-re
npx tsc
# indítás
node .\build\app.js
```

> A szerver alapértelemezetten a `http://localhost:5000` címen fog futni.

---

### 2. Frontend (Angular + Ionic) beállítása

#### Követelmények:

* Node.js
* Angular CLI
* Ionic CLI (globálisan):

  ```bash
  npm install -g @ionic/cli
  ```

```bash
# Frontend mappa
cd client/Forum

# Függőségek telepítése
npm install
```

#### Indítás:

```bash
ionic serve
```

> A frontend alapértelemezetten `http://localhost:8100` címen lesz elérhető.
