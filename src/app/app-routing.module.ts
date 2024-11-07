import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConfigComponent } from './components/config/config.component';
import { GameComponent } from './components/game/game.component';
import { HistoryComponent } from './components/history/history.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'game', component: GameComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
