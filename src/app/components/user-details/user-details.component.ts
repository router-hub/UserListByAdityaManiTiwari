import { Component, OnInit,Inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { userPosts } from '../../shared/userPost';
import { Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userPosts:userPosts[];
  errMess:String;
  visibility:String;

  constructor(private UserService:UserService,
    private route: ActivatedRoute,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.UserService.getPosts(+params['id']); }))
    .subscribe(userPosts => { this.userPosts = userPosts; this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
      
}
}
