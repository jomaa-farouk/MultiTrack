

MULTITRACK PROJECT : Installation de MongoDB + NodeJS + Express + Installation de Mocha + Test unitaires



1/ Lancer un premier terminal , taper "mongod"
2/ Lancer un deuxi�me terminal, taper "mongo" si vous voulez consulter les diff�rents tables par suite.
3/ Lancer un troisi�me terminal, acc�der � l'emplacement de app.js (le r�pertoire du serveur) ( par la commande cd CHEMIN)
4/ Taper "npm install" (package.json) pour installer les diff�rents plugins (les d�pendences) (il suffit de l'installer une seule fois)
5/ Taper "npm install -g mocha" (il suffit de l'installer une seule fois)
6/ Taper "npm install mongoose-auto-increment" (pour qu'on aura des id avec auto-increment) (il suffit de l'installer une seule fois)




7/ Taper "node appTest.js" : qui est utile pour ex�cuter des test unitaires dans un table (un table de test) ind�pendant 
(MultiTrackDB_Test)
8/ Dans un quatri�me quatri�me terminal, acc�der � l'emplacement de app.js (le r�pertoire du serveur) ( par la commande cd CHEMIN) et taper "mocha test.js" pour consulter les r�sultats des divers tests unitaires.
==============> Avant chaque bloc de test, on effacera la table et ins�re les m�mes donn�es afin que les tests peuvent avoir les m�mes conditions d'ex�cution � chaque fois.





9/ Taper maintenant (CTRL + C ) dans le troisi�me terminal puis "node app.js" 
10/ Taper maintenant (CTRL + C )  puis "mocha init.js" dans le quatri�me terminal afin d'ins�rer le premier utilisateur (qui est l'administrateur) dans la table principale de l'application (qui est MultiTrackDB)





11/ Tester avec les URL existants dans les diff�rents routes (http://localhost:8080/ ou http://localhost:8080/users ou etc...)





12/ Visiter l'application sur "http://localhost:8080/#/"




