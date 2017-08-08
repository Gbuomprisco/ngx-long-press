import { LongPressModule } from './../src/long-press.module';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';

import { Home } from './home/home';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        LongPressModule
    ],
    declarations: [ Home ],
    bootstrap: [ Home ],
    entryComponents: [ Home ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
