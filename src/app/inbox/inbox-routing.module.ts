import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {EmailPlaceholderComponent} from "./email-placeholder/email-placeholder.component";
import {EmailShowComponent} from "@inbox/email-show/email-show.component";
import {EmailResolverService} from "@inbox/email-resolver.service";
import {NotFoundComponent} from "@inbox/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'not-found', component: NotFoundComponent},
      {
        path: ':id', component: EmailShowComponent, resolve: {
          email: EmailResolverService
        }
      },
      {path: '', component: EmailPlaceholderComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
