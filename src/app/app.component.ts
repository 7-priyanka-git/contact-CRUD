import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactApiService } from './contact-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  submitted: boolean = false;
  mode:string = '';
  title:string = '';
  contacts = [];
  contactForm: FormGroup;
  isAddContactForm: boolean = false;

  constructor(private contactApiService: ContactApiService) {
  }

  ngOnInit(): void {
    this.contactApiService.getContacts().subscribe((response) => {
      this.contacts = response;
    },
    (error) => {
     alert('Something went wrong!! :-(')
   })
  }

  // Initializing form
  public initializeForm() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required]),
      id: new FormControl('', [])
    });
  
  }

  // To handle add button click
  public addHandler() {
    this.mode = 'add';
    this.isAddContactForm = true;
    this.title = `Add new record`
    this.initializeForm();
}

  // To handle edit button click
  public editHandler(i) {
    this.contactForm.setErrors(null);
    this.mode = 'edit'
    this.isAddContactForm = true;
    this.title = `Edit Contact id: ${i+1}`
    this.contactForm.patchValue({
      'firstName': this.contacts[i].firstName,
      'lastName': this.contacts[i].lastName,
      'phone': this.contacts[i].phone,
      'id': this.contacts[i].id
    })
  }

  // To handle delete button click
  public deleteHandler(event) {
    this.contacts.splice(event, 1)    
  }
  
  // To handle close icon of popup contact form
  close() {
    this.isAddContactForm = false;
  }

  // To handle submit button click of the contact form while adding or editing record
  submit(event) {
    this.submitted = false;
    console.log('this.contactForm', this.contactForm)
    if(this.contactForm.status === "VALID") {
    if(this.mode === 'add') {
      const newId = this.contacts.length + 1;
      this.contactForm.value.id = newId;
        this.contacts.push(this.contactForm.value);
        alert('SUCCESS!! :-)')
        this.isAddContactForm = false;    
      } else {
        this.contacts.splice(this.contactForm.value.id-1, 1, this.contactForm.value);
        alert('SUCCESS!! :-)')
        this.isAddContactForm = false;    
      }
    }
  }
}

