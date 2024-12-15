import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { AddComponent } from './pages/add/add.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'browse', component: BrowseComponent},
    {path: 'add-pokemon', component: AddComponent},
    {path: 'details/:id', component: DetailsComponent}
];
