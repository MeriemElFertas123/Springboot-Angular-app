import { NgClass } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // Show/hide password onClick of button using Javascript only
  isPasswordVisible:boolean=false;

  togglePasswordVisibility(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }


  /*
show() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'text');
}


hide() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
  if (pwShown == 0) {
      pwShown = 1;
      show();
  } else {
      pwShown = 0;
      hide();
  }
}, false);

*/


}
