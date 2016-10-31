import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  UploadComponent } from './index';

@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        FormsModule,
        BrowserModule
    ],
    exports: [
        UploadComponent
    ]
})
export class UploadModule {
}
