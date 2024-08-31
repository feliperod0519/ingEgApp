import {Observable} from 'rxjs';

export function transformPromiseToObservable<T>(promise: Promise<T>): Observable<T> {
    return new Observable<T>(observer => {
        promise.then(
        value => {
                observer.next(value);
                observer.complete();
            }
        ).catch(error => observer.error(error));
    }); 
}