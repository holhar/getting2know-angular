import { Component } from '@angular/core';
import { CoursesService } from './courses.service';

// Applying 'Component' decorator function
@Component({
    selector: 'courses',
    template: `
        <h2>{{ title }}</h2>
        <img [src]="imageUrl" />
        <table>
            <tr>
                <td *ngFor="let course of courses" [attr.colSpan]="colSpan">
                    {{ course }}
                </td>
            </tr>
        </table>
        <button 
            class="btn btn-primary" 
            [class.active]="isActive"
            [style.backgroundColor]="isActive ? 'hotpink' : 'white'"
        >
            Save
        </button>
    `
})
export class CoursesComponent {
    title = "List of courses";
    imageUrl = "https://picsum.photos/400/200"
    colSpan = 2;
    isActive = true;
    courses;

    constructor(service: CoursesService) {
        this.courses = service.getCourses();
    }
}