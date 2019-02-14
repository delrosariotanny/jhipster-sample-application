import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    JobHistoryMySuffixComponent,
    JobHistoryMySuffixDetailComponent,
    JobHistoryMySuffixUpdateComponent,
    JobHistoryMySuffixDeletePopupComponent,
    JobHistoryMySuffixDeleteDialogComponent,
    jobHistoryRoute,
    jobHistoryPopupRoute
} from './';

const ENTITY_STATES = [...jobHistoryRoute, ...jobHistoryPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        JobHistoryMySuffixComponent,
        JobHistoryMySuffixDetailComponent,
        JobHistoryMySuffixUpdateComponent,
        JobHistoryMySuffixDeleteDialogComponent,
        JobHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        JobHistoryMySuffixComponent,
        JobHistoryMySuffixUpdateComponent,
        JobHistoryMySuffixDeleteDialogComponent,
        JobHistoryMySuffixDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationJobHistoryMySuffixModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
