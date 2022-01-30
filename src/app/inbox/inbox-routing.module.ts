import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EmailPlaceholderComponent} from "./email-placeholder/email-placeholder.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', component: EmailPlaceholderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
