var neo4js = require('neo4j');


/*
 *  Graph abstraction Class
 *
 *  @Vars
 *
 *  var db        -> DB connection object
 *  var nodeCount -> Number of noeds
 *  var nodes     -> Nodes itself in an object
 *
 *  @Creation
 *
 *  var something = new Graph( connect );
 *      @param connect = (Connection string)
 *
 *  @Methods
 *
 *  .newNode(data)
 *      Create a node and store in nodes var.
 *      @param data = {'data' : 'value', 'data2' : 'value2'}
 *
 *  .getNode(node, key)
 *      Get data from a specific node
 *      @param node = (node id or null to get all nodes)
 *      @param key can be:
 *          - null: gets all the data
 *          - single key: gets all the data of a single level
 *          - Array: gets an specific data (now just accept 2 levels array)
 *
 */

var Graph = ( function(connect) {
	var db, nodeCount, nodes;

	this.nodeCount = 0;
	this.nodes = {};
	this.db = new neo4js.GraphDatabase( process.env.NEO4J_URL || connect);
});

Graph.prototype.newNode = function(data) {
	this.nodes[ this.nodeCount ] = new Node( data, this.db );
	this.nodeCount ++;
};

Graph.prototype.getNode = function(node, key) {
	if (node === undefined)
		return this.nodes;

	if ( key === undefined) {
		return this.nodes[node]['data']; //all the data to me!
	}else if (typeof key === 'object' ) {
		return this.nodes[node]['data'][ key[0] ][ key[1] ]; //search for recursivity
	}
	return this.nodes[node]['data'][key]; //get just the data of the key
};

//del node
//save node?

//create relationship
Graph.prototype.newRelation = function(node, toNode, type, data) {
	this.nodes[ node ].newRelation( this.nodes[ toNode ], type, data  );
};

//get relationship
//delete relationship

/*
 *  Node abstraction Class
 *	
 *  @vars
 *	
 *  var _node -> Data inside the node
 *	
 *  @Creation
 *	
 *  var node = new Node( data, dbConn )
 *      @param data = Data to store inside the node
 *      @param dbConn = Object connection to DB
 *
 *  @Methods
 *
 *  .save()
 *      Save the node into the DB
 *
 *	
 */
var Node = ( function(NodeData, dbConn) {
	var _node;

	this._node = dbConn.createNode(NodeData);
	this.save();
});

Node.prototype.save = function() {
	this._node.save( function(err) {
		if (err !== undefined) {
			console.log(err);
		}
	});
}

Node.prototype.newRelation = function(toNode, type, data) {
	if (type === undefined)
		type = 'goes';
	if (data === undefined) 
		data = {};

	this._node.createRelationshipTo( toNode, type, data, function(err, rel) {
		//callback for err
		console.log('err: '); console.log(err);
		//console.log(rel);

	});
}

var myGraph = new Graph('http://localhost:7474');
myGraph.newNode( { 'stop' : 'Barcelona' } );
myGraph.newNode( { 'stop' : 'Tarragona' } );
myGraph.newNode( { 'stop' : 'Reus' } );

//console.log( myGraph.getNode( 0 , ['data', 'db'] ));
//console.log( myGraph.getNode(0) );
//console.log( myGraph.getNode() );

myGraph.newRelation(0, 1, 'goes', {});