import React, { useState, useEffect } from 'react';
import * as rdf from 'rdflib';

const Metier = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const store = rdf.graph();
    const ontologyURI = 'http://localhost:3000/RIME_04_0804.rdf';
    const ontology = rdf.sym(ontologyURI);
    
    rdf.parse(ontologyURI, store, ontology.uri, 'application/rdf+xml', (err, res) => {
      if (!err) {
        console.log(store);
      } else {
        console.log(err);
      }
    });

    const fetcher = new rdf.Fetcher(store);
    
    // Charge le fichier RDF dans le store
    fetcher.load('http://localhost:3000/RIME_04_0804.rdf').then(() => {
      console.log('Loaded RDF graph:', store);
  
      // Requête SPARQL pour récupérer les noms des métiers
      const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX ont: <http://www.semanticweb.org/kiebre_le_fariam/ontologies/2023/4/2/RIME_04_0756#>
        
        SELECT ?metier
        WHERE {
            ?metier rdf:type ont:Métier .
        }
        
        `;
  
         // Exécute la requête SPARQL sur le store
        const results = store.query(query);
        console.log(results);
        const jobs = results.map(result => result.metier.value);
        setJobs(jobs); // Mise à jour du state avec les noms des métiers
    }).catch((err) => {
      console.error('Failed to load RDF graph:', err);
    });
  }, []);
  

  return (
    <div>
      <h1>Liste des métiers</h1>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
};

export default Metier;
