Multitrack project

Installation de MongoDB + Installation de NodeJS + Installation de Mocha

1/ Lancer un premier terminal , taper mongod
2/ Lancer un deuxi�me terminal, taper mongo 
3/ Lancer un troisi�me terminal, acc�der au source de app.js (le r�pertoire du serveur) ( par la commande cd CHEMIN)
4/ Taper "npm install" (package.json) pour installer les diff�rents plugins (les d�pendences) (il suffit d'installer une seule fois)
5/ Taper "npm install -g mocha" (il suffit d'installer une seule fois)
6/ Taper "npm install mongoose-auto-increment" (pour qu'on aura des id avec auto-increment) (il suffit d'installer une seule fois)
7/ Taper "node app.js"
8/ Lancer un quatri�me terminal, Taper "mocha test.js" (pour les tests unitaires)
9/ Tester avec les URL existantes dans les diff�rents routes (http://localhost:8080/ ou http://localhost:8080/users ou etc...)