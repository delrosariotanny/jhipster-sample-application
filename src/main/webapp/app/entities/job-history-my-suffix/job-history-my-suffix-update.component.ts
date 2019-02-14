import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { JobHistoryMySuffixService } from './job-history-my-suffix.service';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { JobMySuffixService } from 'app/entities/job-my-suffix';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix';

@Component({
    selector: 'jhi-job-history-my-suffix-update',
    templateUrl: './job-history-my-suffix-update.component.html'
})
export class JobHistoryMySuffixUpdateComponent implements OnInit {
    jobHistory: IJobHistoryMySuffix;
    isSaving: boolean;

    jobs: IJobMySuffix[];

    departments: IDepartmentMySuffix[];

    employees: IEmployeeMySuffix[];
    startDate: string;
    endDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jobHistoryService: JobHistoryMySuffixService,
        protected jobService: JobMySuffixService,
        protected departmentService: DepartmentMySuffixService,
        protected employeeService: EmployeeMySuffixService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ jobHistory }) => {
            this.jobHistory = jobHistory;
            this.startDate = this.jobHistory.startDate != null ? this.jobHistory.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.jobHistory.endDate != null ? this.jobHistory.endDate.format(DATE_TIME_FORMAT) : null;
        });
        this.jobService
            .query({ filter: 'jobhistory-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IJobMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IJobMySuffix[]>) => response.body)
            )
            .subscribe(
                (res: IJobMySuffix[]) => {
                    if (!this.jobHistory.jobId) {
                        this.jobs = res;
                    } else {
                        this.jobService
                            .find(this.jobHistory.jobId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IJobMySuffix>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IJobMySuffix>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IJobMySuffix) => (this.jobs = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.departmentService
            .query({ filter: 'jobhistory-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDepartmentMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDepartmentMySuffix[]>) => response.body)
            )
            .subscribe(
                (res: IDepartmentMySuffix[]) => {
                    if (!this.jobHistory.departmentId) {
                        this.departments = res;
                    } else {
                        this.departmentService
                            .find(this.jobHistory.departmentId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDepartmentMySuffix>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDepartmentMySuffix>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDepartmentMySuffix) => (this.departments = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.employeeService
            .query({ filter: 'jobhistory-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployeeMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployeeMySuffix[]>) => response.body)
            )
            .subscribe(
                (res: IEmployeeMySuffix[]) => {
                    if (!this.jobHistory.employeeId) {
                        this.employees = res;
                    } else {
                        this.employeeService
                            .find(this.jobHistory.employeeId)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IEmployeeMySuffix>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IEmployeeMySuffix>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IEmployeeMySuffix) => (this.employees = [subRes].concat(res)),
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
        this.jobHistory.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.jobHistory.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.jobHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.jobHistoryService.update(this.jobHistory));
        } else {
            this.subscribeToSaveResponse(this.jobHistoryService.create(this.jobHistory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IJobHistoryMySuffix>>) {
        result.subscribe((res: HttpResponse<IJobHistoryMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackJobById(index: number, item: IJobMySuffix) {
        return item.id;
    }

    trackDepartmentById(index: number, item: IDepartmentMySuffix) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployeeMySuffix) {
        return item.id;
    }
}
