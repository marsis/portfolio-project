import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ColorsPalette } from 'src/app/models/colorsPalette.model';
import { UserService } from 'src/app/services/user.service';

import { GetColorPalette } from 'src/app/state/palette.actions';
import { Injectable } from '@angular/core';

export class ColorPaletteModel {
  palette: ColorsPalette;
  backgroundUrl: string;
}

@State<ColorPaletteModel>({
  name: 'colorPalette',
  defaults: new ColorPaletteModel()
})
@Injectable()
export class ColorPaletteState {
  constructor(
    private store: Store,
    private userService: UserService
  ) {
  }

  @Selector()
  static backgroundUrl(state: ColorPaletteModel): string {
    return state.backgroundUrl;
  }

  @Selector()
  static palette(state: ColorPaletteModel): ColorsPalette {
    return state.palette;
  }

  @Action(GetColorPalette)
  getColorPalette(ctx: StateContext<ColorPaletteModel>) {
   return this.userService.getBackground().pipe(
      tap((response) => {
        ctx.patchState({
          backgroundUrl: response.imageUrl,
          palette: response.palette
        });
      })
    );
  }
}
