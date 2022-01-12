import { Component } from '@angular/core';

// Applying 'Component' decorator function
@Component({
    selector: 'courses',
    template: '<h2>{{ "Title: " + getTitle() }}</h2>' 
})
export class CoursesComponent {
    title = "List of courses";

    getTitle() {
        return this.title;
    }
}