var neo4js = require('neo4j');
var Step = require('./lib/step');

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
 *  .newNode(data, callback)
 *      Create a node and store in nodes var.
 *      @param data     = {'data' : 'value', 'data2' : 'value2'}
 *      @param callback = The callback
 *
 *  .getNode(node, key)
 *      Get data from a specific node
 *      @param node = (node id or null to get all nodes)
 *      @param key can be:
 *          - null: gets all the data
 *          - single key: gets all the data of a single level
 *          - Array: gets an specific data (now just accept 2 levels array)
 *
 *  .newRelation(node, toNode, type, data, callback)
 *      Create a relationship bettween `node` and `toNode`
 *      @param node      = Source node
 *      @param toNode    = Destination node
 *      @param type      = type rel (default 'goes')
 *      @param data      = data to rel (default {} )
 *      @param callback
 *
 */

var Graph = ( function(connect) {
	var db, nodeCount, nodes;

	this.nodeCount = 0;
	this.nodes = {};
	this.db = new neo4js.GraphDatabase( process.env.NEO4J_URL || connect);
});

Graph.prototype.newNode = function(data, callback) {
	this.nodes[ this.nodeCount ] = new Node( data, this.db, callback );
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

//create relationship
Graph.prototype.newRelation = function(node, toNode, type, data, callback) {
	this.nodes[ node ].newRelation( this.nodes[ toNode ], type, data, callback  );
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
 *  var node = new Node( data, dbConn, callback )
 *      @param data     = Data to store inside the node
 *      @param dbConn   = Object connection to DB
 *      @param callback
 *
 *  @Methods
 *
 *  .save( callback )
 *      Save the node into the DB
 *      @param callback = The callback to return when it finished
 *	
 *  .newRelation( to, type, data, callback )
 *      Creates a relationship betweet this node and `to` node
 *      @param to       = destination node
 *      @param type     = the relationship type (default 'goes')
 *      @param data     = data to add into the relationship
 *      @param callback
 */
var Node = ( function(NodeData, dbConn, callback) {
	var _node;

	this._node = dbConn.createNode(NodeData);
	this.save(callback);
});

Node.prototype.save = function(callback) {
	this._node.save( function(err) {
		callback(err, this);
	});
}

Node.prototype.newRelation = function(to, type, data, callback) {
	if (type === undefined)
		type = 'goes';
	if (data === undefined) 
		data = {};

	this._node.createRelationshipTo( to._node, type, data, callback);
}


//test code running...

//connect to db
var myGraph = new Graph('http://localhost:7474');
Step ( //this is just for async get sync.
	function () { //creating nodes
		myGraph.newNode( { 'stop' : 'Barcelona' }, this.parallel() );
		myGraph.newNode( { 'stop' : 'Tarragona' }, this.parallel() );
		myGraph.newNode( { 'stop' : 'Reus' }, this.parallel());
	},
	function (err, text) { //get some data?
		//console.log( myGraph.getNode() );
		//console.log( myGraph.getNode( 0 , ['data', 'db'] ));
		//console.log( myGraph.getNode(0) );
		return this;
	},
	function (err, text){ //creating relations
		myGraph.newRelation(0, 1, 'goes', {}, this.parallel() );
		myGraph.newRelation(1, 2, 'goes', {}, this.parallel() );
	},
	function (err, text) { //errors?
		if ( err !== undefined)
			console.log(err);

		return this;
	},
	function (err, text) { //get a path bettween relationships

	}
);