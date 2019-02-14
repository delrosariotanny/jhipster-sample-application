import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from './department-my-suffix.service';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix';

@Component({
    selector: 'jhi-department-my-suffix-update',
    templateUrl: './department-my-suffix-update.component.html'
})
export class DepartmentMySuffixUpdateComponent implements OnInit {
    department: IDepartmentMySuffix;
    isSaving: boolean;

    locations: ILocationMySuffix[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected departmentService: DepartmentMySuffixService,
        protected locationService: LocationMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ department }) => {
            this.department = department;
        });
        this.locationService
            .query({ filter: 'department-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ILocationMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<ILocationMySuffix[]>) => response.body)
            )
            .subscribe(
                (res: ILocationMySuffix[]) => {
                    if (!this.department.locationId) {
                        this.locations = res;
                    } else {
                        this.locationService
                            .find(this.department.locationId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ILocationMySuffix>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ILocationMySuffix>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ILocationMySuffix) => (this.locations = [subRes].concat(res)),
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
        if (this.department.id !== undefined) {
            this.subscribeToSaveResponse(this.departmentService.update(this.department));
        } else {
            this.subscribeToSaveResponse(this.departmentService.create(this.department));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentMySuffix>>) {
        result.subscribe((res: HttpResponse<IDepartmentMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocationMySuffix) {
        return item.id;
    }
}
