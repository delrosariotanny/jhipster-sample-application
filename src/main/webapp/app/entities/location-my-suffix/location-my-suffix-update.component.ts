import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from './location-my-suffix.service';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix';

@Component({
    selector: 'jhi-location-my-suffix-update',
    templateUrl: './location-my-suffix-update.component.html'
})
export class LocationMySuffixUpdateComponent implements OnInit {
    location: ILocationMySuffix;
    isSaving: boolean;

    countries: ICountryMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected locationService: LocationMySuffixService,
        protected countryService: CountryMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ location }) => {
            this.location = location;
        });
        this.countryService
            .query({ filter: 'location-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ICountryMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICountryMySuffix[]>) => response.body)
            )
            .subscribe(
                (res: ICountryMySuffix[]) => {
                    if (!this.location.countryId) {
                        this.countries = res;
                    } else {
                        this.countryService
                            .find(this.location.countryId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ICountryMySuffix>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ICountryMySuffix>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ICountryMySuffix) => (this.countries = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.location.id !== undefined) {
            this.subscribeToSaveResponse(this.locationService.update(this.location));
        } else {
            this.subscribeToSaveResponse(this.locationService.create(this.location));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationMySuffix>>) {
        result.subscribe((res: HttpResponse<ILocationMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCountryById(index: number, item: ICountryMySuffix) {
        return item.id;
    }
}
