Voici le fichier `README.md` complet et prêt à coller dans ton repo GitHub **Bouria-ux/ChillInParis**. Il présente ton projet de manière claire, pro, et complète :

---

## ✅ `README.md`

````md
# 🌳 ChillInParis

> Une application web interactive pour explorer les espaces verts à Paris.

---

## 📌 Objectif

Ce projet permet de :
- Visualiser les espaces verts de Paris sur une carte interactive 🗺️
- Rechercher par nom, filtrer par arrondissement ou présence de clôture
- Analyser les connexions de proximité entre espaces avec Neo4j
- Expérimenter une stack MERN + Neo4j moderne

---

## 🧱 Technologies utilisées

| Frontend         | Backend       | Base de données     | Graphe         |
|------------------|---------------|----------------------|----------------|
| React + Leaflet  | Node.js + Express | MongoDB (Atlas)    | Neo4j          |
| Axios, CSS       | REST API      | Mongoose             | Neo4j driver   |

---

## 🚀 Lancement du projet

### 1. Cloner le projet

```bash
git clone https://github.com/Bouria-ux/ChillInParis.git
cd ChillInParis
````

### 2. Lancer MongoDB et Neo4j

#### MongoDB

> Utilise MongoDB Atlas (voir `.env`)

#### Neo4j avec Docker

```bash
docker run --name chillin-neo4j \
  -p7474:7474 -p7687:7687 \
  -d -e NEO4J_AUTH=neo4j/test1234 \
  neo4j:5
```

---

### 3. Lancer le serveur backend

```bash
cd server
npm install
npm run dev
```

---

### 4. Importer les données

```bash
cd server/etl
node fetch_parcs.js          # Import des données de Paris
node send_to_neo4j.js        # Envoi des espaces verts vers Neo4j
node create_voisinages.js    # Création des relations de voisinage
```

---

### 5. Lancer le frontend

```bash
cd ../client
npm install
npm start
```

Ouvre [http://localhost:5435](http://localhost:5435)

---

## 🌍 Interface utilisateur

* Carte interactive centrée sur Paris
* Marqueurs dynamiques avec Popups
* Filtres par :

  * nom de l’espace vert
  * arrondissement (code postal)
  * présence de clôture
* Pagination intelligente
* Connexions entre espaces proches (Neo4j)

---

## 🔧 Exemple `.env` à placer dans `/server`

```
PORT=5433

MONGO_URI=mongodb+srv://chillin:chillin1234@cluster0.ky1ov0t.mongodb.net/chillinparis?retryWrites=true&w=majority

NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=test1234
```

---

## 🧠 Graphe de proximité

Chaque espace vert est un nœud.
Deux nœuds sont reliés si leur distance est < 500m (relation `VOISIN_DE`).

Visualisation possible dans Neo4j Browser : [http://localhost:7474](http://localhost:7474)

---

## ✍️ Réalisé par

**Ibrahima Sory DIALLO**


---

## 📄 Licence

Projet open-source à des fins pédagogiques uniquement.

````




