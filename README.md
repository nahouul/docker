<p align="center">
  <img src="https://logospng.org/download/react/logo-react-256.png" />
  <img src="https://logospng.org/download/node-js/logo-node-js-256.png" />
  <img src="https://logospng.org/download/mysql/mysql-256.png" />
</p>

<h1 align="center">Docker</h1>

# **Music App**

Music App est une application web conteneurisée permettant de gérer des chansons et des playlists. Elle est développée avec **React.js** pour le frontend, **Node.js** pour le backend, et **MySQL** comme base de données.

---

## **Prérequis**

Avant d'exécuter le projet, assurez-vous d'avoir installé les outils suivants :
- **Docker** et **Docker Compose** : pour exécuter les services dans des conteneurs.
- **Node.js** et **npm** : pour exécuter ou modifier les services en local.

---

## **Étapes pour exécuter l’application**

  Cloner le dépôt Git :
    git clone <url-du-repo>
    cd projectdocker
   
  Build et lancer le projet :
    compose up --build

  Accéder à l'application :

    Frontend : http://localhost:80


## **Liste des endpoints de l’API**

  - POST	  "/register"	:                             Ajouter une nouvelle chanson.
  - GET	    "/songs" :	                              Récupérer toutes les chansons.
  - PUT	    "/edit" :	                                Modifier une chanson existante.
  - DELETE	"/delete/:id" :                         	Supprimer une chanson par son ID.
  - POST	  "/playlists" :	                          Créer une nouvelle playlist.
  - GET	    "/playlists" :	                          Récupérer toutes les playlists.
  - PUT	    "/playlists/:id" :	                      Renommer une playlist existante par son ID.
  - DELETE	"/playlists/:id" :	                      Supprimer une playlist par son ID.
  - POST	  "/playlists/:playlistId/songs" :	        Ajouter une chanson à une playlist.
  - GET	    "/playlists/:playlistId/songs" :	        Récupérer les chansons d'une playlist par son ID.
  - DELETE	"/playlists/:playlistId/songs/:songId" :	Supprimer une chanson d'une playlist par son ID.



## **Fonctionnalités de l’interface utilisateur**
Gestion des chansons :
  - Ajouter une chanson avec des informations comme le titre, l'artiste, l'album, le genre, et la durée.
  - Afficher une liste complète des chansons disponibles.
  - Modifier les détails d'une chanson existante.
  - Supprimer une chanson de la liste.

Gestion des playlists :
  - Créer une nouvelle playlist avec un nom et une description.
  - Afficher la liste des playlists existantes.
  - Renommer une playlist.
  - Supprimer une playlist.
  - Ajouter des chansons à une playlist.
  - Supprimer des chansons d'une playlist.

## **Interface Utilisateur**
![screen layout](https://github.com/nailtonvital/react-node-crud-mysql/blob/master/screenshots/Chanson.png)


![screen layout](https://github.com/nailtonvital/react-node-crud-mysql/blob/master/screenshots/Playlist.png)


# Tools
<ul>
  <li><a href="https://github.com/facebook/react">Reactjs</a></li>
  <li><a href="https://github.com/nodejs/node">Nodejs</a></li>
  <li><a href="https://github.com/topics/mysql">Mysql</a></li>
</ul>

