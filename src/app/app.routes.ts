import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { AddComponent } from './pages/add/add.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'browse', component: BrowseComponent},
    {path: 'add-pokemon', component: AddComponent}
];
