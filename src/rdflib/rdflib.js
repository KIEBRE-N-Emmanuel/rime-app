import  rdf, {Namespace} from 'rdflib';

const rdflib = () => {

var RDF = Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#")
var RDFS = Namespace("http://www.w3.org/2000/01/rdf-schema#")
var FOAF = Namespace("http://xmlns.com/foaf/0.1/")
var XSD = Namespace("http://www.w3.org/2001/XMLSchema#")

rdf.sym('http://xmlns.com/foaf/0.1/knows')

var foafKnows = FOAF('knows');
var store = rdf.graph()
var timeout = 5000 // 5000 ms timeout
var fetcher = new rdf.Fetcher(store, timeout)

fetcher.nowOrWhenFetched(url, function(ok, body, response) {
    if (!ok) {
        console.log("Oops, something happened and couldn't fetch data " + body);
    } else if (response.onErrorWasCalled || response.status !== 200) {
        console.log('    Non-HTTP error reloading data! onErrorWasCalled=' + response.onErrorWasCalled + ' status: ' + response.status)
    } else {
         console.log("---data loaded---")
})
};

export default Metier;