import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelService } from './model/model.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ ModelService ]
})
export class CoreModule { }
