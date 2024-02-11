import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegformComponent } from './regform/regform.component';
import { ListComponent } from './list/list.component';
import { NgForm} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegformComponent , ListComponent, NgForOf,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'app';registrations: any[] = [];
  formData: any = {
    email: '',
    firstName: '',
    lastName: '',
    userName: '',
    branch: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };
  selectedIndex: number = -1;

  constructor() {
    // Load registrations from localStorage on component initialization
    const storedRegistrations = localStorage.getItem('registrations');
    this.registrations = storedRegistrations ? JSON.parse(storedRegistrations) : [];
  }

  saveRegistrationsToLocalStorage() {
    // Save registrations to localStorage
    localStorage.setItem('registrations', JSON.stringify(this.registrations));
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.selectedIndex === -1) {
        // Add new registration
        this.registrations.push({ ...this.formData });
        console.log('New Registration Added:', this.registrations[this.registrations.length - 1]);
      } else {
        // Update existing registration
        this.registrations[this.selectedIndex] = { ...this.formData };
        this.selectedIndex = -1;
      }

      form.resetForm();

      // Save registrations to localStorage after adding/updating
      this.saveRegistrationsToLocalStorage();
    }
  }

  onEdit(index: number) {
    this.selectedIndex = index;
    this.formData = { ...this.registrations[index] };
  }

  onDelete(index: number) {
    this.registrations.splice(index, 1);
    this.selectedIndex = -1;

    // Save registrations to localStorage after deleting
    this.saveRegistrationsToLocalStorage();
  }
}
