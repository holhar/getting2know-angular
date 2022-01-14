import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log("github-profile component initialized");

    //let id = this.route.snapshot.paramMap.get('id');
    //console.log('id retrieved directly by snapshot: ' + id);

    // Retrieve id via observable without destroying the github profile component
    this.route.paramMap
      .subscribe(params => {
        let id = params.get('id');
        console.log('id retrieved by observable: ' + id);
      });
  }

  submit() {
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest' }
    });
  }

}
