import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    JobMySuffixComponent,
    JobMySuffixDetailComponent,
    JobMySuffixUpdateComponent,
    JobMySuffixDeletePopupComponent,
    JobMySuffixDeleteDialogComponent,
    jobRoute,
    jobPopupRoute
} from './';

const ENTITY_STATES = [...jobRoute, ...jobPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobMySuffixComponent,
        JobMySuffixDetailComponent,
        JobMySuffixUpdateComponent,
        JobMySuffixDeleteDialogComponent,
        JobMySuffixDeletePopupComponent
    ],
    entryComponents: [JobMySuffixComponent, JobMySuffixUpdateComponent, JobMySuffixDeleteDialogComponent, JobMySuffixDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationJobMySuffixModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
