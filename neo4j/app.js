/*
 *	Testing the graph database Neo4J with nodeJS
 *
 *	
 */

var neo4js = require('neo4j');

//create the graphdatabase
var db = new neo4js.GraphDatabase( process.env.NEO4J_URL || 'http://localhost:7474');

//Define nodes
var nodes = {
	1 : { 'stop' : 'Barcelona' },
	2 : { 'stop' : 'Tarragona' },
	3 : { 'stop' : 'Reus' }
};

//Define relations
var relations = {
	//1 : {'from', 'to' 'relation'},
	1 : { 'from':1, 'to':2, 'rel':'goes' }, //bcn to tgn
	2 : { 'from':2, 'to':3, 'rel':'goes' }// tgn to reus
};

//We create the nodes and store in the DB
nodes = createNodes(nodes);

//We create the relationships
//addRelationship(nodes, relations);

nodes[1].createRelationshipTo(nodes[2], 'goes');
//nodes[1].addRelationshipTo(nodes[2], 'goes');

//Purgue the DB of the new nodes
//deleteNodes(nodes);

//Purgue of relationships



/*
 * Functions space
 */

//create nodes based on a list and return the object nodes in a literal
function createNodes(data_nodes) {
	var node = {};
	for (id in data_nodes) {
		node[id] = db.createNode(data_nodes[id]); //this create the node
		//save into the DB		
		node[id].save();
	}
	return node;
}

//delete the node list from the db
function deleteNodes(nodes) {
	for (id in nodes) {
		nodes[id].delete();
	}
}

function addRelationship(nodes, relations) {
	var from, to, rel;
	for (id in relations) {

		from = nodes[ relations[id].from ];
		to = nodes[ relations[id].to ];
		rel = relations[id].rel;

		from.createRelationshipTo(to, rel);
	}
	/*
bcn.createRelationshipTo(tgn, 'goes');
tgn.createRelationshipTo(reus, 'goes');
*/
}

/*
//create relationships
bcn.createRelationshipTo(tgn, 'goes');
tgn.createRelationshipTo(reus, 'goes');

//save all into the db
/* ToDO: Find better way to resolve this *
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
			/* ToDO: find a better way*
			bcn.delete();
			tgn.delete();
			reus.delete();

			//delete relationships

		});

	});
});*/