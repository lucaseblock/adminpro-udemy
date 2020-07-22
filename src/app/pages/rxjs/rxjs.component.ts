import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => {

    //     console.log( valor );

    //   },
    //   error => {

    //     console.warn(error);

    //   },
    //   () => {

    //     console.info('Obs terminado');
    //   }
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

retornaIntervalo(): Observable<number> {

  return interval(100).pipe(
    // take(10),
    map(
      valor => valor + 1
      ),
      filter( valor => ( valor % 2 === 0 ? true : false )  ),
    ); 
}

retornaObservable(): Observable<number> {
  let i = -1;

  return new Observable<number>( Observer => {


    const intervalo = setInterval( () => {
     
      i++;
      Observer.next(i);

      if ( i === 4 ) {
        clearInterval( intervalo );
        Observer.complete();
      }

      if ( i === 2 ) {
        Observer.error('i llegó a dos');
      }

    }, 1000);
    
  });

}



}
