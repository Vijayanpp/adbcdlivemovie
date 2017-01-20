import { Routes } from '@angular/router';
import {LoginComponent } from './login/login.component';
import {CreatemoviedataComponent} from './createmoviedata/createmoviedata.component'
// import { MovieComponent } from './movie/movie.component';
// import { GenresComponent } from './genres/genres.component';
// import { UpcomingComponent } from './upcoming/upcoming.component';
// import { PopularSeriesComponent } from './popular-series/popular-series.component';
// import { SerieComponent } from './serie/serie.component';
// import { ActorComponent } from './actor/actor.component';
// import { MalayalamComponent } from './malayalam/malayalam.component';
// import { BollywoodComponent } from './bollywood/bollywood.component';
// import { TollywoodComponent } from './tollywood/tollywood.component';
// import { KollywoodComponent } from './kollywood/kollywood.component';
// import { HollywoodComponent } from './hollywood/hollywood.component';
// import {MoviedetailComponent } from './moviedetail/moviedetail.component'
export const appRoutes: Routes = [
     {path:'',component:CreatemoviedataComponent}
    // {path: 'movie/:id', component: MovieComponent},
    // {path: 'tv/:id', component: SerieComponent},
    // {path: 'actor/:id', component: ActorComponent},
    // {path: 'genres/:id/:name', component: GenresComponent},
    // {path: 'upcoming', component: UpcomingComponent},
    // {path: 'popular/series', component: PopularSeriesComponent},
    // {path: 'malayalam', component:  MalayalamComponent},
    // {path: 'bollywood', component:  BollywoodComponent},
    // {path: 'tollywood', component:  TollywoodComponent},
    // {path: 'kollywood', component:  KollywoodComponent},
    // {path: 'hollywood', component:  HollywoodComponent},
    // {path: 'moviedetail/:id', component: MoviedetailComponent }
];