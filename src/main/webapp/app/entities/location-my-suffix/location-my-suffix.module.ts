import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    LocationMySuffixComponent,
    LocationMySuffixDetailComponent,
    LocationMySuffixUpdateComponent,
    LocationMySuffixDeletePopupComponent,
    LocationMySuffixDeleteDialogComponent,
    locationRoute,
    locationPopupRoute
} from './';

const ENTITY_STATES = [...locationRoute, ...locationPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocationMySuffixComponent,
        LocationMySuffixDetailComponent,
        LocationMySuffixUpdateComponent,
        LocationMySuffixDeleteDialogComponent,
        LocationMySuffixDeletePopupComponent
    ],
    entryComponents: [
        LocationMySuffixComponent,
        LocationMySuffixUpdateComponent,
        LocationMySuffixDeleteDialogComponent,
        LocationMySuffixDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationLocationMySuffixModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
