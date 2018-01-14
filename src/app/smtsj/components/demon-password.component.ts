import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PasswordEncodings } from '../models/constants';
import { PasswordGeneratorComponent } from './password-generator.component';

@Component({
  selector: 'app-demon-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form">
      <textarea formControlName="password"></textarea>
    </form>
  `,
  styles: [`
    textarea { width: 98.5%; }
  `]
})
export class DemonPasswordComponent {
  @Output() passwordBytes = new EventEmitter<string>();

  form: FormGroup;
  engRegex = new RegExp(['^([', PasswordEncodings.engChars, ']){32}$'].join(''));
  passwordRegex = new RegExp([
    '^(\\s*)([', PasswordEncodings.jap, PasswordEncodings.engChars, ']){16}',
    '(\\s*)([', PasswordEncodings.jap, PasswordEncodings.engChars, ']){16}(\\s*)$'
  ].join(''));

  engBase64: { [char: string]: number; };
  japBase64: { [char: string]: number; };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.engBase64 = PasswordEncodings.eng.split('').reduce((acc, c, i) => { acc[c] = i; return acc; }, {});
    this.japBase64 = PasswordEncodings.jap.split('').reduce((acc, c, i) => { acc[c] = i; return acc; }, {});
    this.japBase64 = PasswordEncodings.jen.split('').reduce((acc, c, i) => { acc[c] = i; return acc; }, this.japBase64);

    this.form = this.fb.group({
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    });

    this.form.valueChanges.subscribe(form => {
      const password = form.password.replace(/\s/g, '');
      if (this.form.valid) {
        if (this.engRegex.test(password)) {
          this.passwordBytes.emit(password.split('').map(c => this.engBase64[c]));
        } else {
          this.passwordBytes.emit(password.split('').map(c => this.japBase64[c]));
        }
      }
    });
  }
}