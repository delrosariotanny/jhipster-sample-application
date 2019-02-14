import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { AccountService } from 'app/core';
import { LocationMySuffixService } from './location-my-suffix.service';

@Component({
    selector: 'jhi-location-my-suffix',
    templateUrl: './location-my-suffix.component.html'
})
export class LocationMySuffixComponent implements OnInit, OnDestroy {
    locations: ILocationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected locationService: LocationMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.locationService
            .query()
            .pipe(
                filter((res: HttpResponse<ILocationMySuffix[]>) => res.ok),
                map((res: HttpResponse<ILocationMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: ILocationMySuffix[]) => {
                    this.locations = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILocationMySuffix) {
        return item.id;
    }

    registerChangeInLocations() {
        this.eventSubscriber = this.eventManager.subscribe('locationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
