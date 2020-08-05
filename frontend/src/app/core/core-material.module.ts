import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatProgressBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatFormFieldModule,
  MatMenuModule,
  MatRadioModule,
  MatBottomSheetModule,
  MatCheckboxModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules
})
export class CoreMaterialModule {
}
