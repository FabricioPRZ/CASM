import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { FeedComponent } from './modules/feed/feed.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegisterComponent } from './modules/register/register.component';
import { RegisterVoluntaryComponent } from './modules/register-voluntary/register-voluntary.component';
import { DirectoryComponent } from './modules/directory/directory.component';
import { FavoritesComponent } from './modules/favorites/favorites.component';
import { ChatComponent } from './modules/chat/chat.component';
import { AboutComponent } from './modules/about/about.component';
import { NotesComponent } from './modules/notes/notes.component';
import { PremiumFormComponent } from './modules/premium-form/premium-form.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "home", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "feed", component: FeedComponent, /*canActivate: [authGuard]*/},
    {path: "profile", component: ProfileComponent,  /*canActivate: [authGuard]*/},
    {path: "register",  component: RegisterComponent},
    {path: "register-voluntary", component: RegisterVoluntaryComponent},
    {path: "directory", component: DirectoryComponent,  /*canActivate: [authGuard]*/},
    {path: "favorites", component: FavoritesComponent,  /*canActivate: [authGuard]*/},
    {path: "chat", component:  ChatComponent},
    {path: "about", component:  AboutComponent},
    {path: "notes", component: NotesComponent,  /*canActivate: [authGuard]*/},
    {path: "premium", component: PremiumFormComponent,  /*canActivate: [authGuard]*/},
];