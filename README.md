
# Guide simple d'un projet Node.js avec un serveur Mock et Docker

Source : https://www.browserstack.com/guide/nodejs-mock-server-setup

## 1. Initialisation du projet avec npm
Création du fichier package.json.
```
npm init -y
```

## 2. Ajout des dépendances
```
npm install express cors faker
```
- **express** : Serveur web.
- **cors** : Requête cross-origin.
- **faker** : Simuler des réponses serveur.

En cas de besoin :
```
npm fund
npm audit fix --force
npm i
```

## 3. Création des points de terminaison (endpoints)
Créer le fichier `server.js`.

```
const express = require('express');
const cors = require('cors');
const faker = require('faker');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/user', (req, res) => {
  res.json({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email()
  });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}/api/user`);
});
```

Lancer le serveur :
```
node server.js
```
Visiter la page `http://localhost:3000/api/user`


## 4. Construction du conteneur Docker
Source : https://docs.docker.com/get-started/workshop/02_our_app/

Créer le fichier `Dockerfile`.

```
FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "server.js"]
EXPOSE 3000
```

Créer le fichier `.dockerignore`.
```
node_modules
Dockerfile
```

Construire l'image docker.
```
docker build -t fake-server .
```

Démarrer le conteneur.
```
docker run -d -p 127.0.0.1:3000:3000 fake-server
```
Visiter la page `http://localhost:3000/api/user`