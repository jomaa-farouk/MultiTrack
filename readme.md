

MULTITRACK PROJECT : Installation de MongoDB + NodeJS + Express + Installation de Mocha + Test unitaires



1/ Lancer un premier terminal , taper "mongod"
2/ Lancer un deuxième terminal, taper "mongo" si vous voulez consulter les différents tables par suite.
3/ Lancer un troisième terminal, accéder à l'emplacement de app.js (le répertoire du serveur) ( par la commande cd CHEMIN)
4/ Taper "npm install" (package.json) pour installer les différents plugins (les dépendences) (il suffit de l'installer une seule fois)
5/ Taper "npm install -g mocha" (il suffit de l'installer une seule fois)
6/ Taper "npm install mongoose-auto-increment" (pour qu'on aura des id avec auto-increment) (il suffit de l'installer une seule fois)




7/ Taper "node appTest.js" : qui est utile pour exécuter des test unitaires dans un table (un table de test) indépendant 
(MultiTrackDB_Test)
8/ Dans un quatrième quatrième terminal, accéder à l'emplacement de app.js (le répertoire du serveur) ( par la commande cd CHEMIN) et taper "mocha test.js" pour consulter les résultats des divers tests unitaires.
==============> Avant chaque bloc de test, on effacera la table et insère les mêmes données afin que les tests peuvent avoir les mêmes conditions d'exécution à chaque fois.





9/ Taper maintenant (CTRL + C ) dans le troisième terminal puis "node app.js" 
10/ Taper maintenant (CTRL + C )  puis "mocha init.js" dans le quatrième terminal afin d'insérer le premier utilisateur (qui est l'administrateur) dans la table principale de l'application (qui est MultiTrackDB)





11/ Tester avec les URL existants dans les différents routes (http://localhost:8080/ ou http://localhost:8080/users ou etc...)





12/ Visiter l'application sur "http://localhost:8080/#/"




