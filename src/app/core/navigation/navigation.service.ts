/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NavigationService
{
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private apiAdmin = environment.backend.Admin;
    private readonly apiListarNavegacion: string;
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Authorization': sessionStorage.getItem('token')
        })
    };

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        this.apiListarNavegacion = this.apiAdmin + '/Admin/ListarPermisos';

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation>
    {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation>
    {
/*         return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                console.log(navigation);
                this._navigation.next(navigation);
            })
        ); */

        return this._httpClient.get<any>(`${this.apiListarNavegacion}?Usuario=${'10703259632'}`,this.httpOptions ).pipe(
            tap((navegacion: any) => {

              const navigation = {
                    compact: navegacion.Data,
                    default: navegacion.Data,
                    futuristic: navegacion.Data,
                    horizontal: navegacion.Data,
                };
                console.log(navigation);
                this._navigation.next(navigation);
            })
        );
    }
}
