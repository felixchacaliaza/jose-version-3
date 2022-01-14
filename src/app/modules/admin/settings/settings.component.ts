import { RegistroService } from 'app/core/services/registro/registro.service';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { PermisosService } from 'app/core/services/internal/permisos.service';

@Component({
    selector       : 'app-settings',
    templateUrl    : './settings.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy
{
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'account';
    estado = 0;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private permisosService: RegistroService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void>
    {
        // Setup available panels
        this.panels = [
            {
                id         : 'account',
                icon       : 'heroicons_outline:user-circle',
                title      : 'Mi Cuenta',
                description: 'Administra tu perfil público'
            },
            {
                id         : 'security',
                icon       : 'heroicons_outline:lock-closed',
                title      : 'Seguridad',
                description: 'Administra tu contraseña'
            }
        ];

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
            this.getData();
    }

    getData(){

        if(this.estado === 0){
            this.estado =2;
            this.permisosService.listarPermisos('10703259632').then((res)=>{
                console.log(res);
            });
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(1);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
