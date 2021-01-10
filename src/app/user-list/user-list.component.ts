import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  searchBar: FormControl = new FormControl(null);
  filterCriteria: FormControl = new FormControl('name');
  filterValue: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private _userService: UserServiceService) { }

  selectedUser: User;
  userList$: Observable<User[]>

  selectedOption = {
    name: true,
    designation: false,
    company: false
  }

  ngOnInit(): void {
    this.searchBar.valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.filterValue.next(data)
    })

    this.filterValue.subscribe(filterValue => {
      console.log(filterValue)
      if (filterValue === undefined) {
        this.userList$ = this._userService.getAllUsers();
      } else {
        this.userList$ = this._userService.getAllUsers().pipe(map(users => {
          return users.filter(user => {
            const modifieduser = { ...user, name: `${user.firstname} ${user.lastname}` }
            return JSON.stringify(modifieduser).toLowerCase().includes(filterValue.toLowerCase())

          })
        }))
      }
    })

  }

  onClickViewMore(user: User) {
    this.selectedUser = user;
  }

}
