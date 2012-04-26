/*
 *	Testing the graph database Neo4J with nodeJS
 *
 *	
 */

var neo4js = require('neo4j');

//create the graphdatabase
var db = new neo4js.GraphDatabase( process.env.NEO4J_URL || 'http://localhost:7474');


//create nodes
var bcn = db.createNode({'stop' : 'Barcelona'});
var reus = db.createNode({'stop' : 'Reus'});
var tgn = db.createNode({'stop' : 'Tarragona'});

//create relationships
bcn.createRelationshipTo(tgn, 'goes');
tgn.createRelationshipTo(reus, 'goes');

//save all into the db
/* ToDO: Find better way to resolve this */
tgn.save(function(err) { 
	reus.save(function() { 

		bcn.save(function(err) {
			console.log('nodes saved');

			//get the node
			/*db.getNodeById(1, function(err, res) {
				console.log(res.data.stop);
			});*/


			//get the path fron reus to barcelona
			/*neo4js.path(reus, bcn, function(err, res) {
				console.log(res);
			});*/


			//delete all nodes
			/* ToDO: find a better way*/
			bcn.delete();
			tgn.delete();
			reus.delete();

			//delete relationships

		});

	});
});