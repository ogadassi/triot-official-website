-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: triot
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (4,'TRIOT (Self-Titled)','60aec094-3fd7-4272-b282-5b30aaf49cf3.jpg'),(5,'MTV (My Terrible Vuture)','b3d4ac60-4151-4427-b00d-a53d7118927b.png');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `part` varchar(100) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'Adar','Ohayon','Adar is the heartbeat of the punk rock scene. With relentless energy and a fearless attitude, Adar delivers explosive rhythms and driving beats, igniting stages and sparking revolutions.','Drummer, Mixer, Backing Vocalist','8cd25677-d867-4104-a77c-34af50875b33.jpg'),(2,'Ohad','Gadassi','Ohad is the heartbeat of the punk rock scene. With relentless energy and a fearless attitude, Ohad delivers poweful vocals and melodic riffs, igniting stages and sparking revolutions.','Guitarist, Vocalist','26bb5fc4-0595-4a3a-8bd1-a734bd56eb30.jpg'),(4,'Ofek','Shlinger','Ofek is the chugging bass of the punk rock scene. With relentless energy and a fearless attitude, Ofek delivers walking basslines , igniting stages and sparking revolutions.','Bassist','8f3e8d61-21a9-457c-aa01-a062d1c550bc.jpg');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `albumId` int NOT NULL,
  `durationInSeconds` int NOT NULL,
  `description` varchar(300) NOT NULL,
  `lyrics` varchar(4000) NOT NULL,
  PRIMARY KEY (`id`,`albumId`),
  KEY `albumRelation_idx` (`albumId`),
  CONSTRAINT `albumRelation` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (1,'MTV (My Terrible Vuture)',5,176,'Misunderstood young adult craves chill time (MTV, games) over job pressure. Rebelling for a life of fun, their way. ','Can\'t sit at home without them ©️\nBugging me all the time ©️\n\"You need to get a job, ©️\n ©️ ©️\nWhat are you gonna do with your life?\" ©️\nThey think i\'m lazy ©️\nDaisy chain if dreams that will all fail  ©️\nBut i\'ll show them by hiring myself ©️\nTo my own job, that\'ll show them ©️\n ©️ ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby  ©️\nGonna watch some F.R.I.E.N.D.S ©️\n\'Cuz I think my life\'s alright ©️\n ©️ ©️\n\"Too much TV rots your brain\" ©️\nDoes it look like I give a damn? ©️\nI got a grip on life but ©️\nThey don\'t really see it m my way ©️\nI may be old enough but I did not mature at all ©️\nThe outside\'s not for me ©️\nI much prefer to play games \'til I fall ©️\n ©️ ©️\nSo sick of you  ©️\nJust wanna relax for a minute or two ©️\nSo many voices around ©️\nLost in the chaos but i\'m holding my ground ©️\n ©️ ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna watch some F.R.I.E.N.D.S ©️\n\'Cuz I think my life\'s alright ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna play some games ©️\n\'Cuz I think my life\'s alright ©️\n ©️ ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna watch some F.R.I.E.N.D.S ©️\n\'Cuz I think my life\'s alright ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna play some games ©️\n\'Cuz I think my life\'s alright ©️\n ©️ ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna watch some F.R.I.E.N.D.S ©️\n\'Cuz I think my life\'s alright ©️\n ©️ ©️\nWasting time at home watching MTV ©️\nSleeping on the couch, snoring loudly ©️\nI\'m not a little kid, don\'t need a lullaby ©️\nGonna play some games ©️\n\'Cuz I think my life\'s alright ©️\n'),(2,'Hate Your Guts',5,147,'Burn track roasts obnoxious braggart. Calls out fake friends, empty threats & leech-like behavior.','Walk around like your some hot shit ©️\nDoesn\'t know how to take a hint ©️\nA nobody with zero grace ©️\nMy eyes hurt from looking at your face ©️\nYou flip me off, but I don\'t care ©️\nBecause your word\'s weaker than your last affair ©️\nI don\'t know what they saw in you ©️\nBut they must\'ve been blind to the horrible truth, you say ©️\n ©️\n\"Fuck this, and fuck you ©️\nI\'m leaving cuz I\'ve got better things to do\" ©️\nBut we both know it\'s not true ©️\nCuz nobody really likes you ©️\nYou say \"Fuck this, and fuck you ©️\nI\'m leaving cuz I\'ve got better things to do\" ©️\nBut we both know it\'s not true ©️\nCuz nobody really likes you ©️\n ©️\nWalk the walk, talk the talk you can ©️\nToo bad you\'re just a mannequin ©️\nYou never learned how to give ©️\nYou only know how to receive ©️\nBut now it\'s time to say goodbye ©️\nI hope I never catch you in my eye ©️\nYou\'re just a fucking social parasite ©️\nSo pack your shit up and just get outta my sight, you say ©️\n ©️\n\"Fuck this, and fuck you ©️\nI\'m leaving cuz I\'ve got better things to do\" ©️\nBut we both know it\'s not true ©️\nCuz nobody really likes you ©️\nCuz nobody really likes you ©️\nCuz nobody really likes you ©️'),(4,'Evil In Her',4,245,'Deceived lover trashes manipulative ex. Questions addiction & blames for lost innocence. Raw ballad.','It\'s all set and done ©️\nand we\'ve not had fun ©️\nI know it\'s not easy ©️\nIt was all made up ©️\nAnd I\'ve given up ©️\nYour touch Was not worth it ©️\n ©️\nI felt loved, unloved  ©️\nI was young and dumb ©️\nI didn\'t know ©️\nif it was real ©️\nShe was a bloody whore  ©️\nright down into her core ©️\nShe was the ©️\ndevil in disguise ©️\nI wanna know ©️\n ©️\nHow could you break a heart and enjoy it? ©️\nHow did you become the drug I could not quit? ©️\nWhy\'d you entice me to lock me out?   ©️\nI\'m figuring out ©️\nShe\'s got evil in her, there\'s no doubt ©️\n ©️\nAnd I rued the day ©️\nThat I\'d let her play  ©️\nDisguised as a lover ©️\nI endured the pain ©️\nThat drove me insane ©️\nA wreck Left to find my way ©️\n ©️\nThe damage has been done  ©️\nAll happiness is gone ©️\nMy vision\'s black, my soul is sick ©️\nA toy inside her hands ©️\nA feeling so immense ©️\nand now I\'ve lost my innocence  ©️\nSo tell me now ©️\n ©️\nHow could you break a heart and enjoy it? ©️\nHow did you become the drug I could not quit? ©️\nThe state of my heart is still unknown ©️\nAs I\'m figuring out ©️\nShe\'s got evil in me, there\'s no doubt ©️\n ©️\nAt the last day of hell  ©️\nI made her sit and tell ©️\nWhat is it that she wants from me ©️\nShe said the love burned out ©️\nIt was without a doubt ©️\nJust a sadistic fucking game of hate ©️\nand love! ©️\n ©️\nHow could you break a heart and enjoy it? ©️\nHow did you become the drug I could not quit? ©️\nWhy\'d you entice me just to lock me out? ©️\nI\'m figuring out ©️\nShe\'s got evil in her, there\'s no doubt ©️\n ©️\nHow could you break a heart and enjoy it? ©️\nHow did you become the drug I could not quit? ©️\nThe state of my heart is still unknown ©️\nAs I\'m figuring out ©️\nShe\'s got evil in me, there\'s no doubt ©️\n'),(5,'A Hell of a Ride',5,224,'Perseverance and determination in the face of adversity. It encourages listeners to keep pushing forward despite challenges, believing that hard work will eventually lead to success.','Thinking about your life ©️\nWhat is it you desire? ©️\nWell, what\'s inside of you, ©️\nThat will that lights your fire? ©️\nI know it\'s not that easy ©️\nBut it\'s easy to be let down ©️\nSo don\'t pay attention to anyone ©️\nAnd turn your life around! ©️\n ©️\nSo just wake up! ©️\nAnd hold on tight ©️\nCuz you\'re on for one hell of a ride ©️\nYou can\'t give up! ©️\nTo get to ©️\nWhere you wanted for so long ©️\nSo just get up! and try your best ©️\nWork like a dog without a rest ©️\nBut in time! you will see ©️\nIt will pay off in the end ©️\n ©️\nWell, now he\'s fighting back ©️\nAnd his wish will come true ©️\nHe\'s making minimum wage and ©️\nTrying to pull through ©️\nWill he make it to the stage ©️\nAnd feel the bright white light? ©️\nOr was it all in vain, ©️\nWas everyone right? ©️\n ©️\nSo just wake up! and hold on tight ©️\nCuz you\'re on for one hell of a ride ©️\nYou can\'t give up! to get to ©️\nWhere you wanted for so long ©️\nSo just get up! and try your best ©️\nWork like a dog without a rest ©️\nBut in time! you will see ©️\nIt will pay off in the end ©️\n ©️\nSo just wake up! and hold on tight ©️\nCuz you\'re on for one hell of a ride ©️\nYou can\'t give up! to get to ©️\nWhere you wanted for so long ©️\nSo just get up! and try your best ©️\nWork like a dog without a rest ©️\nBut in time! you will see ©️\nIt will pay off in the end ©️'),(6,'Rocking the Wagon',5,242,'This rock ballad describes a jaded rockstar who achieved fame but lost himself in the self-destructive lifestyle. Despite the struggles, he finds strength to break free and start anew.','Turn the lights on ©️\nAnd get ready ©️\nFor the greatest goddamn show of your fucking life! ©️\nIt\'s a shame that ©️\nHe\'s the only one who thinks he\'s fine ©️\nSo, you made it ©️\nYou\'re a rockstar ©️\nAnd you might think that everything\'s alright ©️\nBut the truth is ©️\nThat living on the wagon is a bumpy ride ©️\n ©️\nStrumming hard, fall apart, running and jumping around ©️\nLiving hell, better days never to come back around ©️\nIt\'s all the worthless in the end when sanity cannot be found ©️\nFeelings being tossed away ©️\n ©️\nThis life is a mess ©️\nRocking out loud and getting my fix ©️\nPuffing a cloud and downing some drinks ©️\nDon\'t know how much more I can take, I\'m gonna break ©️\nBut I must go on ©️\nTeaching these bastards how to have fun ©️\nNow sit the fuck down, the lesson\'s begun ©️\nI\'m starting to see this isn\'t my thing ©️\nI lost my wings ©️\n ©️\nNow you see it ©️\nIt\'s so clear now ©️\nIt was all an illusion and fame led you astray ©️\nCan\'t believe that ©️\nYou were blinded to think everything\'s okay ©️\nAll your problems, disconcerting ©️\nYou had it all but you jumped way in too deep ©️\nYou were living ©️\nAt the top, but now it\'s all damn cheap ©️\n ©️\nCoughing up, falling down, one shot doesn\'t help enough ©️\nGetting head, living dead, hangovers are getting rough ©️\nNeed some help to stop the habit of pretending to be tough ©️\nHeadlining a dead parade ©️\n ©️\nThis life is a mess ©️\nRocking out loud and getting my fix ©️\nPuffing a cloud and downing some drinks ©️\nDon\'t know how much more I can take, I\'m gonna break ©️\nShould I just move on? ©️\nQuit all the bars, the shows and step down ©️\nTurn off the mic and hand off the crown ©️\nReality is turning unreal ©️\nThat\'s how I feel ©️\n ©️\nI\'ve been on this road for so fucking long ©️\nIt seems like we\'ve made it but we\'re so far from home ©️\nI promised myself that I won\'t lose my mind ©️\nWell, I\'m Sorry but it was such a hell of a ride! ©️\n ©️\nThis life is a mess ©️\nRocking out loud and getting my fix ©️\nPuffing a cloud and downing some drinks ©️\nDon\'t know how much more I can take, I\'m gonna break ©️\nBut I am not done ©️\nWon\'t let it go, I gotta rock on ©️\nI\'ve been on this road for so fucking long ©️\nAnd it may seem like time has run out ©️\nA career of doubt is ending now ©️\n ©️\nI\'ve been on this road for so fucking long ©️\nIt seems like I\'ve made it since that bad habit\'s gone ©️\nI feel like I lost it when I got to the top ©️\nMy world is much brighter with no wagon to rock! ©️'),(8,'Say Goodbye',4,150,'This is a break-up song where the singer feels used and disrespected. They\'re kicking the other person out and reveling in their newfound freedom. There\'s a lot of anger and harsh language directed at the ex.','Why don’t you sit down and listen up ©️\nCuz I’ve got something special to say ©️\nBut I’m not sure that you’re gonna like it ©️\nCause I ain\'t staying here another day ©️\nLet’s open up now And be real ©️\nYou thought that you could play with my heart ©️\nBut now it’s time to Let you know ©️\nI’m so glad i’m kicking you out ©️\n ©️\nSo say goodbye to me and you ©️\nThis is the last time we\'ll meet ©️\nBut dry your tears and put on a smile ©️\nMaybe that way someone will pick you off the street ©️\nNow i’m so happy that we are over©️\nI know that you\'ve been fucking with me©️\nWell let me tell ya that i’m no fool©️\nSay goodbye to all the feels©️\nIt’s time to dump you out to the curb©️\nYou’re always sitting in my chair©️\nYou’re nothing to me But thin air©️\nGo END YOUR LIFE cuz I don\'t care©️\n©️\nSo say goodnight to me and you©️\nThis is the chance to say goodbye©️\nAnd from this day, your lesson’s learned©️\nAnd now you’ll live your life in hopes to die©️\n©️\n‘Twas nice to know ya You dirty whore©️\nNow get the fuck out of my sight©️\nWell, now it’s over You filthy slut©️\nI guess it’s time to say good night©️\nBitch.©️'),(9,'Demons of Our Kind',4,192,'Misjudged outcasts, labeled demons, fight back against societal control and hypocrisy, carving their own path.','We are the demons of our kind©️\nWe are the ones who lost their minds©️\nWe are the ones to gain control!©️\nWoah-oh woah-oh oh oh!©️\n©️\nThe ones that watch but never play©️\nThe ones who try but never pray ©️\nWere shaped alike but nothing more!©️\nWoah-oh woah-oh oh oh!©️\nWoah-oh woah-oh oh oh!©️\n©️\nSo, spare me your prayers©️\nYou\'re all just fucking morons, all repeat the same©️\nWell, have it your way©️\nwe\'ll stay away from your kind, damn it all to hell©️\nYour art is depraved©️\nWhy would you let them turn you into mindless slaves?©️\nSo sorry I yelled©️\nI hope your egotistic soul could take the hit.©️\n©️\nWe make decisions on our own©️\nPrepared to take the casted stone(s)©️\nThe evil\'s hiding in you all©️\nWoah-oh woah-oh oh oh!©️\n©️\nWe\'ll pave the path right to the top©️\nAnd shout and drink until we drop©️\nWe\'ll put an end to your control©️\nWoah-oh woah-oh oh oh!©️\nWoah-oh woah-oh oh oh!©️\n©️\nSo, spare me your prayers©️\nYou\'re all just fucking morons, R.I.P the same©️\nWe\'ll have it our way©️\nwe\'ll stay away from your kind, damn you all to hell©️\nYour art is depraved©️\nWhy would you let them turn you into mindless slaves?©️\nSo sorry I yelled©️\nI hope your egotistic soul could take the hit©️'),(10,'Forever Spectator\n ',4,193,'The song is about being tired of pointless negativity. The singer is bombarded by constant complaining and meaningless conversations. They call out the hypocrisy and vapidness of those around them, feeling like a silent observer.','©️\nWell, I\'m sitting breathing silent with my head aching numb©️\n\'Cause it\'s another blinding morning and the bullshit©️\nis too loud©️\nA hundred thousand people walking, passing me by©️\nand they all spit out the dumbest shit I\'ve heard in my life©️\nYeah I sit and listen to them bitch and whine \'bout their lives©️\nLike how every morning they get in a fight with their wives©️\nI haven\'t heard the new word from your musically blessed©️\nBut I\'ve heard it all before so please just give me a rest©️\n©️\nIf I had a dime for©️\nEvery time I heard you spout©️\nNonsense in my ears I©️\nCould afford to shut your mouth©️\nOverstayed your welcome©️\nNow my patience\'s running out©️\nSo you better leave \'cause©️\nI don\'t think you\'re better off with me©️\n©️\nForever, Spectator©️\nthe witness of your ignorant behavior©️\nyour stories blend together©️\nso devoid of meaning and are never getting better©️\nObserver, Bystander©️\nHe told her that he loves her but I hate her©️\nYou better catch a mirror©️\nYou\'ll see for yourself the uglier picture you are©️\n©️\nHave you taken but a moment just to look at yourself©️\nCuz the people all around you love to act like they\'re deaf©️\nI\'ve heard about enough from you, now listen to me©️\n©️\nI\'m nodding to your rhythm ©️\nas the conversation flows©️\nLost all idea how time works©️\nwhile im listening it froze©️\ncuz the shit you\'re saying ain\'t right©️\nand im losing all my daylight©️\nand now my own insanity has come too close©️\nNow I\'m left to wonder©️\n©️\nIf I had a dime for©️\nEvery time I heard you spout©️\nNonsense in my ears I©️\nCould afford to shut your mouth©️\nAs your fate is sealed shut©️\nHope your hell won\'t be too rough©️\nSo you better leave \'cause©️\nI don\'t think you\'re better off with me©️\n©️\nForever, Spectator©️\nthe witness of your ignorant behavior©️\nyour stories blend together©️\nso devoid of meaning and are never getting better©️\nObserver, Bystander©️\nHe told her that he loves her but I hate her©️\nYou better catch a mirror©️\nYou\'ll see for yourself the uglier picture you are©️\n©️\n©️\nForever, Spectator©️\n\'Cause watch and learn do not end up together©️\nyour stories are a big blur©️\nHaven\'t heard an interesting or good one in forever©️\nObserver, Bystander©️\nHe told her that he loves her but I hate her©️\nYou better catch a mirror©️\nThe sooner the best, so reflect and repent©️\nthen you could see for yourself the uglier picture you are©️\n©️\nAs your fate is sealed shut©️\nHope your hell won\'t be too rough©️\nSo you better leave \'cause©️\nI don\'t think you\'re better off with me©️\n');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'User ','Main','user@gmail.com','470c0cd361542e4e6f3fc98d834a1b585cddd5ce7f19131c33f1b2835f9ccce0b73b6eb64428a6dc630a4371385b56e36ab85122aad6da18a5032f87f60ccb8d');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-27 11:49:46
