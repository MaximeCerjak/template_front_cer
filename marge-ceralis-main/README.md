# Template application react + docker

Ce template comporte les éléments suivants :

- Node 21
- React js v18.2.0 + Redux
- Vite.js 5
- Tailwind CSS

# Utilisation de ce template (Développement)
1. Cloner le template (penser à renommer le template en nom de votre projet lors du git pull)
2. Modifier le fichier package.json pour mettre le nom de votre projet

3. Se placer dans le dossier du projet et effectuer la commande suivante :

```bash
docker-compose up -d
```

4. installer les dépendances :

```bash
docker exec -it <numero du conteneur> npm install
```

5. Enfin redémarrer le conteneur pour être sur que les dépendances soient prises en compte :
 
```bash
docker restart <numero du conteneur>
```
Le conteneur va démarrer un serveur de développement (localhost:3000)

6. Pour accéder au gestionnaire de données de Redux il faut installer l'extension Chrome "Redux DevTools"

## Production

A chaque push sur une branche, le pipeline de déploiement est déclenché. Il va construire l'image docker et la pousser sur le registry. Il va ensuite se connecter sur le serveur de recette et déployer l'image docker.

# Fonctionnement du fichier .gitlab-ci.yml pour le déploiement de l'application
Ce fichier de configuration permet de construire et de déployer automatiquement une application React sur un serveur de recette à l'aide de GitLab CI/CD et de Docker. Il utilise les outils suivants :

- L'image Docker ```docker:20.10.16``` pour exécuter les commandes dans les étapes de pipeline.
- Le service Docker ```docker:20.10.16-dind``` pour exécuter des commandes Docker à l'intérieur d'un conteneur Docker.
- Les variables d'environnement pour stocker les informations sensibles telles que les mots de passe et les clés privées.
- Les commandes SSH pour se connecter au serveur de recette et mettre à jour l'application.


### Etapes de pipeline
Le pipeline comporte les étapes suivantes :

- ```Build``` : Construit une image React à partir du code source de l'application, puis la pousse vers un registre d'images Docker.
- ```Deployment``` : Copie la configuration de docker-compose sur le serveur de recette, télécharge les nouvelles images, arrête les conteneurs existants et démarre les nouveaux conteneurs.

### Variables d'environnement
Les variables d'environnement suivantes sont utilisées dans ce fichier de configuration :

- ```REGISTRY_URL``` : L'URL du registre d'images Docker où les images de l'application seront poussées.
- ```REGISTRY_USER_LOGIN``` : Le nom d'utilisateur pour se connecter au registre d'images Docker.
- ```REGISTRY_USER_PASSWORD``` : Le mot de passe pour se connecter au registre d'images Docker.
- ```CI_PROJECT_TITLE``` : Le nom du projet GitLab CI/CD.
- ```CI_COMMIT_SHORT_SHA``` : Le code de commit court de l'application.
- ```RECETTE_API_URL``` : L'URL de l'API pour l'environnement de recette.
- ```PROJECT_RELEASE_ROOT_DIR``` : Le répertoire de déploiement de l'application sur le serveur de recette.
- ```SSH_PRIVATE_KEY``` : La clé privée SSH pour l'authentification avec le serveur de recette.
- ```RECETTE_WEBNET_PASSWORD``` : Le mot de passe pour se connecter en tant que utilisateur webnet sur le serveur de recette.

### Etape de Build

```yaml
image_react:
    stage: Build : Indique que cette étape de pipeline appartient à l'étape "Build" du pipeline.
    image: docker:20.10.16 : Spécifie l'image Docker à utiliser pour exécuter les commandes dans cette étape.
    before_script:
        - echo "${REGISTRY_USER_PASSWORD}" | docker login ${REGISTRY_URL} --username ${REGISTRY_USER_LOGIN} --password-stdin : Exécute une commande pour se connecter à un registre d'images Docker à l'aide des informations d'identification de l'utilisateur stockées dans des variables d'environnement.
    variables:
        TAG_PACKAGE_REACT: "${REGISTRY_URL}/${CI_PROJECT_TITLE}/cerfrance_react:${CI_COMMIT_SHORT_SHA}" : Définit une variable pour stocker l'étiquette de l'image React construite.
    script:
        - cp .env.recette .env : Initialise le fichier .env pour l'environnement de recette.
        - sed -i -e "s/\[API_URL\]/${RECETTE_API_URL}/g" .env : Remplace les variables dans le fichier .env pour l'environnement de recette.
        - docker build -t ${TAG_PACKAGE_REACT} . : Construit une image React à l'aide de la commande docker build en utilisant l'étiquette stockée dans la variable TAG_PACKAGE_REACT.
        - docker push ${TAG_PACKAGE_REACT} : Pousse l'image construite vers le registre d'images Docker spécifié dans la commande de login précédente.
    allow_failure: false : Indique que cette étape de pipeline ne doit pas être autorisée à échouer.
```

### Etape de Deployment
```yaml
recette:
stage: Deployment : Indique que cette étape de pipeline appartient à l'étape "Deployment" du pipeline.
image: docker:20.10.16 : Spécifie l'image Docker à utiliser pour exécuter les commandes dans cette étape.
variables:
PROJECT_RELEASE_ROOT_DIR: "/home/webnet/${CI_PROJECT_TITLE}" : Définit une variable pour stocker le répertoire de déploiement de l'
before_script:
 - echo "${REGISTRY_USER_PASSWORD}" | docker login ${REGISTRY_URL} --username ${REGISTRY_USER_LOGIN} --password-stdin : Se connecte à un registre d'images Docker à l'aide des informations d'identification de l'utilisateur stockées dans des variables d'environnement.
 - 'which ssh-agent || ( apt-get install -qq openssh-client )' : Vérifie si l'outil ssh-agent est installé, et l'installe s'il n'est pas présent.
 - eval $(ssh-agent -s) : Démarre l'agent ssh.
 - ssh-add <(echo "$SSH_PRIVATE_KEY") : Ajoute la clé privée SSH pour l'authentification avec le serveur de recette.
 - mkdir -p ~/.ssh : Crée le répertoire ssh s'il n'existe pas.
 - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config' : Désactive la vérification de la clé d'hôte pour éviter tout problème de connexion SSH.
script:
 - cp docker-compose-prod.yml.dist docker-compose-prod.yml : Initialise le fichier docker-compose-prod.yml.
 - sed -i -e "s/\[IMAGE_REACT_VITE\]/${REGISTRY_URL}\/${CI_PROJECT_TITLE}\/cerfrance_react:${CI_COMMIT_SHORT_SHA}/g" docker-compose-prod.yml : Remplace les liens vers les images React dans le fichier de configuration de docker-compose avec les étiquettes de l'image construite dans l'étape précédente.
 - ssh webnet@192.168.220.37 "rm -f ${PROJECT_RELEASE_ROOT_DIR}/docker-compose.yml && exit" : Supprime le fichier de configuration de docker-compose existant sur le serveur de recette en utilisant la connexion SSH.
 - scp ${CI_PROJECT_DIR}/docker-compose-prod.yml webnet@192.168.220.37:${PROJECT_RELEASE_ROOT_DIR}/docker-compose.yml : Copie le fichier de configuration de docker-compose fraichement créé sur le serveur de recette en utilisant la connexion SSH.
 - echo "${RECETTE_WEBNET_PASSWORD}" | ssh webnet@192.168.220.37 "cd ${PROJECT_RELEASE_ROOT_DIR} && sudo -S docker compose pull && exit" : Télécharge les nouvelles images React sur le serveur de recette en utilisant la connexion SSH et la commande docker-compose pull.
 - echo "${RECETTE_WEBNET_PASSWORD}" | ssh webnet@192.168.220.37 "cd ${PROJECT_RELEASE_ROOT_DIR} && sudo -S docker compose stop && exit" : Arrête les conteneurs React existants sur le serveur de recette en utilisant la connexion SSH et la commande docker-compose stop.
 - echo "${RECETTE_WEBNET_PASSWORD}" | ssh webnet@192.168.220.37 "cd ${PROJECT_RELEASE_ROOT_DIR} && sudo -S docker compose up -d && exit" : Démarre les nouveaux conteneurs React sur le serveur de recette en utilisant la connexion SSH et la commande docker-compose up -d.
```


# Fonctionnement détaillé du fichier Dockerfile

Ce fichier Dockerfile permet de construire et de déployer automatiquement une application Node.js avec Nginx. Il est composé de deux étapes :

### Étape 1 : Build
- ```FROM node:19-alpine as builder``` : Utilise l'image de node version 19 basée sur Alpine Linux pour créer un conteneur de build.
- ```RUN mkdir /app``` : Crée un répertoire app.
- ```COPY package.json .``` : Copie le fichier package.json dans le répertoire courant.
- ```RUN npm install``` : Installe les dépendances décrites dans package.json.
- ```COPY . .``` : Copie tous les fichiers de l'application dans le répertoire courant.
- ```RUN npm run build``` : Construit l'application en utilisant les commandes décrites dans package.json

### Étape 2 : Deployment
- ```FROM nginx:1.23-alpine``` : Utilise l'image de nginx version 1.23 basée sur Alpine Linux pour créer un conteneur de production.
- ```WORKDIR /usr/share/nginx/html``` : Définit le répertoire de travail pour les commandes suivantes.
- ```RUN rm -rf ./*``` : Supprime tous les fichiers existants dans le répertoire de travail.
- ```COPY --from=builder /dist .``` : Copie les fichiers de l'application construite dans le répertoire de travail en utilisant l'étiquette builder pour référencer le conteneur de build.
- ```ENTRYPOINT [ "nginx", "-g", "daemon off;" ]``` : Définit la commande pour lancer l'application lorsque le conteneur démarre.
Ce fichier utilise les commandes COPY, RUN, FROM et ENTRYPOINT pour automatiser la construction et le déploiement de l'application. Il est conçu pour être utilisé avec un outil de CI/CD tel que GitLab CI pour automatiser les processus de build et de déploiement.
