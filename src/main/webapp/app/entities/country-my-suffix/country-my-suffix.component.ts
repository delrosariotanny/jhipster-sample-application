import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { AccountService } from 'app/core';
import { CountryMySuffixService } from './country-my-suffix.service';

@Component({
    selector: 'jhi-country-my-suffix',
    templateUrl: './country-my-suffix.component.html'
})
export class CountryMySuffixComponent implements OnInit, OnDestroy {
    countries: ICountryMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected countryService: CountryMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.countryService
            .query()
            .pipe(
                filter((res: HttpResponse<ICountryMySuffix[]>) => res.ok),
                map((res: HttpResponse<ICountryMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: ICountryMySuffix[]) => {
                    this.countries = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCountries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICountryMySuffix) {
        return item.id;
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe('countryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
