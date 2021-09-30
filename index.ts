screenLog.init(); // affiche le log de la console
// Cliquez sur la flèche de rafraichissement dans la fenêtre de droite, juste à gauche de l'url pour relancer.

import { Observable, of, interval, merge} from 'rxjs';
import { mergeAll, take, tap } from 'rxjs/operators';


// Création de streams
function createStream(name: string, iterations: number, intervalle: number): Observable<any> {
  return interval(intervalle).pipe(
    take(iterations),
    tap(val => console.log(`[ Stream ${name} ] : ${val}`))
  )
}

// MergeAll
const streamA = createStream('A', 2, 100);
const streamB = createStream('B', 3, 200);
// Nous créons un Observable qui émet des deux Observables.
const exemple1 = of(streamA, streamB); 
exemple1.pipe(mergeAll()).subscribe();


// Merge
const example2 = merge(streamA, streamB);
setTimeout(() => console.log('-- MERGE --'), 2000);
setTimeout(() => example2.subscribe(), 2000);


// La différence est claire entre les deux : merge permet de fusionner plusieurs Observables. Alors que mergeAll permet de fusionner les inner Observables émis par un Observable.