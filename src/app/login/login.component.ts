import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  success: boolean
  failure: boolean
  loginForm

  constructor(private authService: AuthService,private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  errMsg:String
  onLogin() {
    console.log(this.loginForm.value)
    this.authService.authenticate(this.loginForm.value)
      .subscribe(res => {
        console.log(res)
        if (res.success) {
          this.authService.storeUserData(res.token,res.user)
          this.success = true
          this.loginForm.reset()
          this.router.navigate(['/dashboard']);
          setTimeout(() => {
            this.success = false
          }, 5000)
        } else {
          console.log(res.msg)
          this.errMsg = res.msg
          this.failure = true
          setTimeout(() => {
            this.failure = false
          }, 5000)
        }
      })
  }
}
