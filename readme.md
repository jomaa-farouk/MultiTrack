L'impl�mentation du c�t� serveur de note application a suivit cet approche qui permet la :

- Cr�ation des fichiers contenant les diff�rents models qui sont en relation avec notre cas d'utilisation, qui sont : user.js, comment.js, track.js, rating.js, mix.js.
- Cr�ation du fichier routeManager.js qui contient toutes les m�thodes de gestion qu'on aura besoin pour �tablir des interactions avec la base des donn�es.

- Cr�ation du fichier app.js qui permet � travers la commande "node app.js" d'ex�cuter notre application dans sa base des donn�es principale.

- Cr�ation du fichier init.js qui permet l'insertion des premi�res donn�es n�cessaires pour garantir le bon fonctionnement de notre application. A titre d'exemple, ce fichier permet l'insertion des donn�es relatives premier utilisateur de l'application, qui est l'administrateur dans notre cas.

- Cr�ation du fichier appTest.js qui permet � travers la commande "node appTest.js" d'ex�cuter notre application dans sa base des donn�es de test.

- Cr�ation du fichier test.js qui contient les diff�rents tests unitaires relatifs � chaque m�thode. Dans ces tests, on a essay� de cr�er des m�thodes qui se d�roulent dans le m�me environnement, c'est � dire que les blocs des tests s'ex�cute avec la mani�re suivante :

1. Vider la base des donn�es (qui est la base de test).

2. Ins�rer un ensemble des donn�es (qui est le m�me � chaque fois).

3. Impl�menter les m�thodes des test unitaires.

Pour ex�cuter notre projet, il suffit de bien suivre ces �tapes :

1/ Lancer un premier terminal , taper "mongod" : qui permet de lancer MongoDB.

2/ Lancer un deuxi�me terminal, taper "mongo" si vous voulez consulter les diff�rentes bases des donn�es, ceci en tapant apr�s "show dbs" dans le m�me terminal.

3/ Lancer un troisi�me terminal, acc�der � l'emplacement du fichier app.js (existant dans le r�pertoire "server" de notre projet), ceci en tapant la commande cd CHEMIN.

4/ Dans ce troisi�me terminal, taper "npm install" (pour installer les diff�rents plugins (les d�pendances) qui sont mentionn�es dans le fichier "package.json", il suffit d'installer ces plugins juste pour la premi�re ex�cution.

5/ Dans ce troisi�me terminal, taper "npm install -g mocha" : afin d'installer tout les d�pendances qui sont en relation avec le Framework des tests unitaires "mocha", il suffit d'installer ces plugins juste pour la premi�re ex�cution.

6/ Dans ce troisi�me terminal, taper "npm install mongoose-auto-increment" : afin d'avoir des id g�n�r�s avec le principe d'auto-increment, il suffit d'installer ces plugins juste pour la premi�re ex�cution.

7/ Dans ce troisi�me terminal, taper "node appTest.js" afin de d�marer la base de donn�es de test intitul� "MultiTrackDB_Test", cette derni�re qui est ind�pendant du d�roulement de notre application principale.

8/ Dans un quatri�me terminal, acc�der � l'emplacement du fichier test.js (existant dans le r�pertoire "server" de notre projet), ceci en utilisant la commande cd CHEMIN et taper "mocha test.js" pour consulter les r�sultats des divers tests unitaires. Avant chaque bloc de test, on efface la base de donn�es et on ins�re les m�mes donn�es afin que les diff�rents tests peuvent avoir les m�mes conditions d'ex�cution � chaque fois.

9/ Taper maintenant (CTRL + C) dans le troisi�me terminal puis saisir la commande "node app.js".

10/ Taper maintenant (CTRL + C) dans le quatri�me terminal puis saisir la commande "mocha init.js" afin d'ins�rer le premier utilisateur qui repr�sente l'administrateur de notre application et �galement la liste des "tracks" initiales dans la base de donn�es principale de l'application intitul� MultiTrackDB.

11/ Tester avec les URL existants dans notre projet mentionn�s en bas du fichier "routeManager.js" qui est existant dans le dossier "routes". Taper par exemple cet URL " http://localhost:8080/users "  qui permet de r�cup�rer la liste des utilisateurs ins�r�es dans la base MultiTrackDB.

12/ Visiter l'application sur " http://localhost:8080/#/ ".
