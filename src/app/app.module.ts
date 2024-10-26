import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PartidaComponent } from './components/partida/partida.component';
import { ConfModalComponent } from './components/main-page/conf-modal/conf-modal.component';
import { FormsModule } from '@angular/forms';
import { CartonesService } from './core/services/cartones.service';
import { InputRangeComponent } from './shared/components/input-range/input-range.component';
import { CartonPrincComponent } from './components/partida/carton-princ/carton-princ.component';
import { RandomBallComponent } from './components/partida/random-ball/random-ball.component';
import { CartonesComponent } from './components/partida/cartones/cartones.component';
import { InputRadioComponent } from './shared/components/input-radio/input-radio.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PartidaComponent,
    ConfModalComponent,
    InputRangeComponent,
    CartonPrincComponent,
    RandomBallComponent,
    CartonesComponent,
    InputRadioComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(), CartonesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
