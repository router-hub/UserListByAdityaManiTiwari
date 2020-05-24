import { Component, OnInit ,Inject } from '@angular/core';
import { UserService } from '../../Services/user.service';
import {userList } from '../../shared/userList';
import { FormControl , FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  value=""
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  users:userList[];
  errMess:string;
  tempFilteredOptions:Array<string>=[];
  title = 'Users of Decision Point';
  constructor(private UserService: UserService,
    @Inject('BaseURL') public BaseURL) {  }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(users=>{this.users=users;
          for(let i=0;i<users.length;i++)
          this.tempFilteredOptions.push(users[i].name);
    },errmess=>this.errMess=<any>errmess);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      console.log(this.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // console.log(this.tempFilteredOptions);
    return this.tempFilteredOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}

