import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ContactFormBuilder } from '../config/contact-form.builder';
@Component({
  selector: 'app-contact',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})

export class ContactComponent implements OnInit{

  contact = ContactFormBuilder.contact();
  private myForm: AngularFirestoreCollection<any> | undefined;

  constructor(private firestore: AngularFirestore, private toast: HotToastService, private router: Router) { }

ngOnInit(): void {

  this.myForm=this.firestore.collection('mails');
}


  submit(value: any) {
    const {fullname, email, message} = this.contact.value
    if (!this.contact.valid || !fullname || !email || !message) {
      return;
    }
    this.myForm?.add(value).then(res=>{

        this.toast.success("Twoje zgłoszenie zostało wysłane, skontaktujemy się z tobą w ciągu 24 godzin")
      })
    .catch(err=>{
      this.toast.error("Wystąpił błąd")
    })
    this.router.navigate(['/dashboard']);
  }

}
