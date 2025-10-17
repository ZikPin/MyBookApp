import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BookGalleryComponent } from './book-gallery/book-gallery.component';

export const routes: Route[] = [
    { path: '', component: HomeComponent },
    {
        path: 'book-gallery',
        component: BookGalleryComponent,
        title: 'Books Overview'
    },
    {
        path: 'book-page',
        loadChildren: () => import('./book-page/book-page.module').then(m => m.BookPageModule)
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
