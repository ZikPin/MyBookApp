import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StoryGalleryComponent } from './story/story-gallery/story-gallery.component';

export const routes: Route[] = [
    { path: '', component: HomeComponent },
    {
        path: 'book-gallery',
        component: StoryGalleryComponent,
        title: 'Books Overview'
    },
    {
        path: 'book-page',
        loadChildren: () => import('./story/story-page.module').then(m => m.StoryPageModule)
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Books'
    },
    {
        path: '**',
        component: HomeComponent,
        title: 'Books'
    }
];
