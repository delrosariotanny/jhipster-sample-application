import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { AccountService } from 'app/core';
import { DepartmentMySuffixService } from './department-my-suffix.service';

@Component({
    selector: 'jhi-department-my-suffix',
    templateUrl: './department-my-suffix.component.html'
})
export class DepartmentMySuffixComponent implements OnInit, OnDestroy {
    departments: IDepartmentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected departmentService: DepartmentMySuffixService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.departmentService
            .query()
            .pipe(
                filter((res: HttpResponse<IDepartmentMySuffix[]>) => res.ok),
                map((res: HttpResponse<IDepartmentMySuffix[]>) => res.body)
            )
            .subscribe(
                (res: IDepartmentMySuffix[]) => {
                    this.departments = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDepartments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDepartmentMySuffix) {
        return item.id;
    }

    registerChangeInDepartments() {
        this.eventSubscriber = this.eventManager.subscribe('departmentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
