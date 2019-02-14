import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from './employee-my-suffix.service';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix';

@Component({
    selector: 'jhi-employee-my-suffix-update',
    templateUrl: './employee-my-suffix-update.component.html'
})
export class EmployeeMySuffixUpdateComponent implements OnInit {
    employee: IEmployeeMySuffix;
    isSaving: boolean;

    departments: IDepartmentMySuffix[];

    employees: IEmployeeMySuffix[];
    hireDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected employeeService: EmployeeMySuffixService,
        protected departmentService: DepartmentMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employee }) => {
            this.employee = employee;
            this.hireDate = this.employee.hireDate != null ? this.employee.hireDate.format(DATE_TIME_FORMAT) : null;
        });
        this.departmentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDepartmentMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDepartmentMySuffix[]>) => response.body)
            )
            .subscribe((res: IDepartmentMySuffix[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployeeMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployeeMySuffix[]>) => response.body)
            )
            .subscribe((res: IEmployeeMySuffix[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.employee.hireDate = this.hireDate != null ? moment(this.hireDate, DATE_TIME_FORMAT) : null;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(this.employeeService.create(this.employee));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeMySuffix>>) {
        result.subscribe((res: HttpResponse<IEmployeeMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDepartmentById(index: number, item: IDepartmentMySuffix) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeMySuffix) {
        return item.id;
    }
}
