import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MODEL_PROVIDER } from './model/model.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [MODEL_PROVIDER]
})
export class CoreModule { }
