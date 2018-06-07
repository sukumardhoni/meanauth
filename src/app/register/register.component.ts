import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  success: boolean
  failure: boolean
  registerForm
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  errMsg
  onRegister() {
    console.log(this.registerForm.value)
    this.authService.register(this.registerForm.value)
      .subscribe(res => {
        console.log(res)
        if (res.success) {
          this.success = true
          this.registerForm.reset()
          setTimeout(() => {
            this.success = false
          }, 5000)
        } else {
          this.failure = true
          
          this.errMsg = res.msg
          setTimeout(() => {
            this.failure = false
          }, 5000)
        }
      })

  }

}
