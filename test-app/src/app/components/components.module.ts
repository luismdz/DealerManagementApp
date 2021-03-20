import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent, MenuComponent],
})
export class ComponentsModule {}
