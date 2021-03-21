import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FlexLayoutModule],
  exports: [HeaderComponent, MenuComponent],
})
export class ComponentsModule {}
