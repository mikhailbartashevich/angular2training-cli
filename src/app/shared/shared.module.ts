import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { SharedLoaderBlockComponent } from './shared-loader-block/shared-loader-block.component';
import { TimePipe } from './time.pipe';
import { AuthService } from './auth.service';
import { LoaderBlockService } from './loader-block.service';
import { AuthHttpInterceptor } from './auth.http.interceptor';
import { FormsModule } from '@angular/forms';
import { ValidateDateFormatDirective } from './validators/date-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    SharedFooterComponent,
    SharedHeaderComponent,
    SharedLoaderBlockComponent,
    TimePipe,
    ValidateDateFormatDirective
  ],
  providers: [
    AuthService,
    LoaderBlockService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
  exports: [
    SharedFooterComponent,
    SharedHeaderComponent,
    SharedLoaderBlockComponent,
    TimePipe,
    ValidateDateFormatDirective
  ]
})
export class SharedModule { }
