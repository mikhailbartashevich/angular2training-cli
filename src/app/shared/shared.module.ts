import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { SharedLoaderBlockComponent } from './shared-loader-block/shared-loader-block.component';
import { TimePipe } from './time.pipe';
import { AuthService } from './auth.service';
import { LoaderBlockService } from './loader-block.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    SharedFooterComponent,
    SharedHeaderComponent,
    SharedLoaderBlockComponent,
    TimePipe
  ],
  providers: [AuthService, LoaderBlockService],
  exports: [
    SharedFooterComponent,
    SharedHeaderComponent,
    SharedLoaderBlockComponent,
    TimePipe
  ]
})
export class SharedModule { }
