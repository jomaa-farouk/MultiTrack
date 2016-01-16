Multitrack project

Installation de MongoDB + Installation de NodeJS + Installation de Mocha

1/ Lancer un premier terminal , taper mongod
2/ Lancer un deuxième terminal, taper mongo 
3/ Lancer un troisième terminal, accéder au source de app.js (le répertoire du serveur) ( par la commande cd CHEMIN)
4/ Taper "npm install" (package.json) pour installer les différents plugins (les dépendences) (il suffit d'installer une seule fois)
5/ Taper "npm install -g mocha" (il suffit d'installer une seule fois)
6/ Taper "npm install mongoose-auto-increment" (pour qu'on aura des id avec auto-increment) (il suffit d'installer une seule fois)
7/ Taper "node app.js"
8/ Lancer un quatrième terminal, Taper "mocha test.js" (pour les tests unitaires)
9/ Tester avec les URL existantes dans les différents routes (http://localhost:8080/ ou http://localhost:8080/users ou etc...)