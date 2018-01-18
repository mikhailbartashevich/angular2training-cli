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
import { DateControlComponent } from './controls/date-control.component';
import { DurationControlComponent } from './controls/duration-control.component';
import { ValidateNumberDirective } from './validators/number-validator.directive';
import { AuthorsControlComponent } from './controls/authors-control.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SharedFooterComponent,
    SharedHeaderComponent,
    SharedLoaderBlockComponent,
    TimePipe,
    ValidateDateFormatDirective,
    ValidateNumberDirective,
    DateControlComponent,
    DurationControlComponent,
    AuthorsControlComponent,
    NotFoundPageComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
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
    ValidateDateFormatDirective,
    ValidateNumberDirective,
    DateControlComponent,
    DurationControlComponent,
    AuthorsControlComponent
  ]
})
export class SharedModule { }
