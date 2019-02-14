import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'region-my-suffix',
                loadChildren: './region-my-suffix/region-my-suffix.module#JhipsterSampleApplicationRegionMySuffixModule'
            },
            {
                path: 'country-my-suffix',
                loadChildren: './country-my-suffix/country-my-suffix.module#JhipsterSampleApplicationCountryMySuffixModule'
            },
            {
                path: 'location-my-suffix',
                loadChildren: './location-my-suffix/location-my-suffix.module#JhipsterSampleApplicationLocationMySuffixModule'
            },
            {
                path: 'department-my-suffix',
                loadChildren: './department-my-suffix/department-my-suffix.module#JhipsterSampleApplicationDepartmentMySuffixModule'
            },
            {
                path: 'task-my-suffix',
                loadChildren: './task-my-suffix/task-my-suffix.module#JhipsterSampleApplicationTaskMySuffixModule'
            },
            {
                path: 'employee-my-suffix',
                loadChildren: './employee-my-suffix/employee-my-suffix.module#JhipsterSampleApplicationEmployeeMySuffixModule'
            },
            {
                path: 'job-my-suffix',
                loadChildren: './job-my-suffix/job-my-suffix.module#JhipsterSampleApplicationJobMySuffixModule'
            },
            {
                path: 'job-history-my-suffix',
                loadChildren: './job-history-my-suffix/job-history-my-suffix.module#JhipsterSampleApplicationJobHistoryMySuffixModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
