import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { AccountService } from 'app/core';
import { RegionMySuffixService } from './region-my-suffix.service';

@Component({
    selector: 'jhi-region-my-suffix',
    templateUrl: './region-my-suffix.component.html'
})
export class RegionMySuffixComponent implements OnInit, OnDestroy {
    regions: IRegionMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected regionService: RegionMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.regionService
            .query()
            .pipe(
                filter((res: HttpResponse<IRegionMySuffix[]>) => res.ok),
                map((res: HttpResponse<IRegionMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: IRegionMySuffix[]) => {
                    this.regions = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRegions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRegionMySuffix) {
        return item.id;
    }

    registerChangeInRegions() {
        this.eventSubscriber = this.eventManager.subscribe('regionListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
