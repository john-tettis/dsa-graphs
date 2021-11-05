class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex =>this.addVertex(vertex))
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    for(let connection of vertex.adjacent){
      connection.adjacent.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let values=[];


    function recurse(node = start,seen=new Set([start])){
      values.push(node.value);
      seen.add(node)
      for(let n of node.adjacent){
        if(!seen.has(n))recurse(n,seen)
      }
    }
    recurse();
    return values;

  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let q=[start];
    let values =[start.value];
    let seen = new Set([start]);
    while(q.length>0){
      let current = q.shift()
      for(let node of current.adjacent){
        if(!seen.has(node)){
          seen.add(node)
          q.push(node);
          values.push(node.value);
        }
      }

    }
    return values;

  }
}

module.exports = {Graph, Node}