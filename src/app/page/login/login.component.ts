import {Component, OnInit} from '@angular/core';
import {LoginResponseDto} from '../../../models/Login';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logged?: LoginResponseDto;

  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  password: FormControl = new FormControl(null, [Validators.required]);
  form: FormGroup = new FormBuilder().group({
    email: this.email,
    password: this.password
  });

  constructor(private service: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.logged = this.service.currentUserValue;
  }

  logOut() {
    this.service.logout();
  }

  onSubmit() {

    this.service.login(this.form.value).subscribe({
      next: (rep) => {
        if (rep.type === HttpEventType.Response) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
          this.router.navigate([returnUrl]);
        }
      },
      error: () => {
        console.log('Invalid Credentials');
      }
    });
  }

  log(error) {
    console.log(error);
  }
}
