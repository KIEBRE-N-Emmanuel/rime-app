import * as rdf from 'rdflib';

const store = rdf.graph();
const fetcher = new rdf.Fetcher(store);

fetcher.load('RIME_04_0804.rdf').then(() => {
  console.log('Loaded RDF graph:', store);
}).catch((err) => {
  console.error('Failed to load RDF graph:', err);
});
