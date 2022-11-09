import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/role-user.interface';
import { ImageUploadService } from 'src/app/services/image-upload-service/image-upload.service';
import { UsersService } from 'src/app/services/user-service/user.service';
import { ProfileFormBuilder } from '../config/profile-form.builder';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;
  profile = ProfileFormBuilder.profile();

  constructor(
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profile.patchValue({ ...user });
      });
  }

  uploadFile(event: any, { uid }: User) {
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Dodawanie zdjęcia profilowego...',
          success: 'Zdjęcie profilowe zostało dodane poprawnie',
          error: 'Wystąpił błąd',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  saveProfile() {
    const { uid, ...data } = this.profile.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Zapisywanie profilu...',
          success: 'Profil został zapisany pomyślnie',
          error: 'Wystąpił błąd',
        })
      )
      .subscribe();
  }
}
