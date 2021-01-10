import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgModel, NgForm, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  message: String;

  constructor(private _userService: UserServiceService, private renderer: Renderer2) { }

  addUserForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    contact: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    company: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    designation: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
  })

  //Template Driven User Form
  userForm = {
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    address: '',
    company: '',
    designation: ''
  }

  showReactiveForm: boolean = false;

  ngOnInit(): void {
  }

  toggleForm() {
    this.showReactiveForm = !this.showReactiveForm
  }

  onAddUserFormSubmit(user: User) {

    console.log(user)
    this._userService.addUser(user).subscribe((data: any) => {
      console.log(data)
      this.message = data.message;
      this.addUserForm.reset()
      this.renderer.removeClass(document.getElementById('successMessage'), 'hideMessage')
      this.renderer.addClass(document.getElementById('successMessage'), 'showMessage')
      setTimeout(() => {
        this.renderer.removeClass(document.getElementById('successMessage'), 'showMessage')
        this.renderer.addClass(document.getElementById('successMessage'), 'hideMessage')
      }, 2000)
    }, (err) => {
      this.message = "Something went wrong";
      this.renderer.removeClass(document.getElementById('errorMessage'), 'hideMessage')
      this.renderer.addClass(document.getElementById('errorMessage'), 'showMessage')
      setTimeout(() => {
        this.renderer.removeClass(document.getElementById('errorMessage'), 'showMessage')
        this.renderer.addClass(document.getElementById('errorMessage'), 'hideMessage')
      }, 2000)
    })

  }

}
