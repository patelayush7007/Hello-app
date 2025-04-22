import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-twitter-success',
  standalone: true,
  templateUrl: './twitter-success.component.html',
  styleUrls: ['./twitter-success.component.css']
})
export class TwitterSuccessComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user = {
        username: params['username'],
        name: params['name'],
        photo: params['photo']
      };

      // Save to localStorage (or use UserService)
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log(this.user);
      

      // Optionally navigate to home after saving
      // this.router.navigate(['/home']);
      
    });
  }
}
