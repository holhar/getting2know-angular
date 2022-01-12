import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  title = "The complete Angular course";
  rating = 4.9745;
  students = 30213;
  price = 190.95;
  releaseDate = new Date(2016, 3, 1);

  constructor() { }

  ngOnInit(): void {
  }

}
