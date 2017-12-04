import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedFooterComponent } from './shared-footer/shared-footer.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { TimePipe } from './time.pipe';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedFooterComponent, SharedHeaderComponent, TimePipe],
  providers: [AuthService],
  exports: [SharedFooterComponent, SharedHeaderComponent, TimePipe]
})
export class SharedModule { }
