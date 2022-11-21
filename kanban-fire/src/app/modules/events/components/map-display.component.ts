import { ChangeDetectionStrategy, Component, Input, NgZone, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { PlaceSearchResult } from './place-autocomplete.component';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <google-map
     #map
    [zoom]="zoom"
    width="50vw"
    height="30vw"
    [center]="center"
    [options]="options"
    >
    <map-marker
        *ngFor="let markerPosition of markerPositions"
        [position]="markerPosition"
      >
      </map-marker>
    </google-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
})
export class MapDisplayComponent implements OnChanges {
  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  mapLocation: PlaceSearchResult | undefined;

  markerPositions: google.maps.LatLng[] = [];
  zoom = 12;
  center = {
    lat: 49.816761,
    lng: 19.044138,
  };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: true,
    zoomControl: true,
  }

  constructor() {}

  ngOnChanges() {
    const eventLocation = this.mapLocation?.location;
    if (eventLocation) {
      this.gotoLocation(eventLocation);
    }
  }
  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 17;
  }

}
