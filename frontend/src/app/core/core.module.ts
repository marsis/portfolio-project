import { DragDropModule} from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { UserState } from 'src/app/state/auth.state';
import { ColorPaletteState } from 'src/app/state/palette.state';
import { TaskState } from 'src/app/state/task.state';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      UserState,
      ColorPaletteState,
      TaskState
    ], {developmentMode: !environment.production}),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ]
})
export class CoreModule { }
