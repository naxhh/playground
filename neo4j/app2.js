var neo4js = require('neo4j');
var Step = require('./lib/step');

/*
 *  Graph abstraction Class
 *
 *  @Vars
 *
 *  var db        -> DB connection object
 *  var nodeCount -> Number of nodes
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
 *      @param callback
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
	this.nodes = [];
	this.db = new neo4js.GraphDatabase( process.env.NEO4J_URL || connect);
});

Graph.prototype.newNode = function(data, callback) {
	this.nodes[ this.nodeCount ] = this.db.createNode(data);
	
	this.nodes[ this.nodeCount ].save( callback );
	this.nodeCount ++;
};

Graph.prototype.getNode = function(node, key) {
	if (node === undefined)
		return this.nodes;

	if ( key === undefined) {
		return this.nodes[node]; //all the data to me!
	}else if (typeof key === 'object' ) {
		return this.nodes[node][ key[0] ][ key[1] ]; //search for recursivity
	}
	return this.nodes[node][key]; //get just the data of the key
};

//del node
Graph.prototype.delNode = function(node, callback) {
	var that = this;

	this.nodes[node].del( function(err) {
		delete that.nodes[node];
		callback(err, this);
	});
};

//create relationship
Graph.prototype.newRelation = function(node, toNode, type, data, callback) {
	if (type === undefined)
		type = 'goes';
	if (data === undefined) 
		data = {};

	this.nodes[ node ].createRelationshipTo( this.nodes[ toNode ], type, data, callback);

};

//get relationship
//delete relationship

//get path
Graph.prototype.getPath = function(from, to, callback) {
	//neo4js.path( this.nodes[from], this.nodes[to], callback);

	var query = [
		'START s=node(3), e=node(2)',
		'MATCH p = shortestPath( s-[*..15]->e )',
		'RETURN p'
	].join('\n');

	//this.db.query(query, callback);
	this.db.query(query, function(err, res) {
		if (err !== null)
			console.log(err);
		console.log(res);
	});
}


//test code running...

//connect to db
var myGraph = new Graph('http://localhost:7474');


Step ( //this is just for async get sync.
	function () { //creating nodes
		myGraph.newNode( { 'stop' : 'Barcelona' }, this );
		myGraph.newNode( { 'stop' : 'Tarragona' }, this );
		myGraph.newNode( { 'stop' : 'Reus' }, this);
	},
	function (err, text) { //get some data?
		//console.log( myGraph.getNode() );
		//console.log( myGraph.getNode( 0 , 'data' ));
		//console.log( myGraph.getNode( 0 , ['db', 'url'] ));
		//console.log( myGraph.getNode(0) );
		return this;
	},
	function (err, text){ //creating relations
		myGraph.newRelation(0, 1, 'goes', {}, this.parallel() );
		myGraph.newRelation(1, 2, 'goes', {}, this.parallel() );
	},
	function (err, text) {
		myGraph.getPath(0, 1, this);
	},
	function (err, text) { //get a path bettween relationships
		if (err !== null)
			console.log(err);
		console.log(text);
	}/*,

	function (err, text) {//delete nodes
		myGraph.delNode(0, this.parallel());
		myGraph.delNode(1, this.parallel());
		myGraph.delNode(2, this.parallel());
	},
	function (err, text) {
		if (err !== undefined)
			console.log(err);
		console.log( myGraph.getNode().length );
		//console.log( myGraph.getNode() );
	}*/
);