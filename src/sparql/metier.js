import React, { useState, useEffect } from 'react';
import * as rdf from 'rdflib';

const Metier = () => {
  const [jobs, setJobs] = useState([]);
//http://localhost:3000/RIME_11_0505.rdf
  useEffect(() => {
    const store = rdf.graph();
    const ontologyURI = 'http://localhost:3000/RIME_11_0505.rdf';
    // const ontology = store.sym(ontologyURI);

    /////////////////
    
    
    var timeout = 5000 // 5000 ms timeout
    var fetcher = new rdf.Fetcher(store, timeout)

    fetcher.nowOrWhenFetched(ontologyURI, function(ok, body, response) {
      if (!ok) {
          console.log("Oops, something happened and couldn't fetch data " + body);
      } else if (response.onErrorWasCalled || response.status !== 200) {
          console.log('Non-HTTP error reloading data! onErrorWasCalled=' + response.onErrorWasCalled + ' status: ' + response.status)
      } else {
          console.log("----data---")
      }
});

     /////////////////
    
    // rdf.parse(ontologyURI, store, ontology.uri, 'application/rdf+xml', (err, res) => {
    //   if (!err) {
    //     console.log('Fichier chargé avec succès',store);
    //   } else {
    //     console.log('Chargement du fichier échoué', err);
    //   }
    // });

    // const fetcher = new rdf.Fetcher(store);
    //console.log(fetcher)
    
    // Charge le fichier RDF dans le store
    fetcher.load('http://localhost:3000/RIME_11_0505.rdf').then(() => {
      console.log('Loaded RDF graph:', store);
  
      // Requête SPARQL pour récupérer les noms des métiers
      const query = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX ont: <http://www.semanticweb.org/kiebre_le_fariam/ontologies/2023/4/11/untitled-ontology-11/>
        
        SELECT ?nom
        WHERE {
          ?individu rdf:type ont:OWLClass_341b4f72_1a08_4673_abb2_55cb0606edb8 ;
                    ont:rdfs:label ?nom .
        }
        `;

        const query2 = rdf.SPARQLToQuery(query, false, store)

        console.log('Loaded RDF graph:7878787', store);
  
        // Exécute la requête SPARQL sur le store
        store.query(query2, (err, results) => {
          if (err) {
            console.error('Failed to execute SPARQL query:', err);
          } else {
            console.log('SPARQL query results:', results);
            const jobs = results.map(result => result.get('?nom').value);
            setJobs('resultat du Mise à jour du state avec les noms des métiers', jobs); // Mise à jour du state avec les noms des métiers
          }
        });
    }).catch((err) => {
      console.error('Failed to load RDF graph:', err);
    });
  }, []
  
  );

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
