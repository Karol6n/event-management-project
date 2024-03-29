import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface PlaceSearchResult {
  address?: string;
  location?: google.maps.LatLng;
  iconUrl?: string;
  name?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <mat-form-field appearance="outline">
      <input [placeholder]="placeholder" #inputField matInput />
    </mat-form-field>
  `,
  styles: [
    `
      .mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class PlaceAutocompleteComponent implements AfterViewInit {
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Wpisz adres';

  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  listener: any;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: new google.maps.LatLng(place?.geometry?.location.lat(), place?.geometry?.location.lng()),
          iconUrl: place?.icon,
        };

        this.placeChanged.emit(result);
      });
    });

  }

}
