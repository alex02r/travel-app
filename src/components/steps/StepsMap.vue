<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'StepsMap',
  props: {
    trip: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      map: null,
      markers: []
    }
  },
  mounted() {
    this.initMap();
    this.addAllStages();
  },
  methods: {
    //funzione che inizializza la mappa
    initMap() {
      this.map = L.map('map').setView([0, 0], 2); // Vista iniziale del mondo
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    },
    //funzione che aggiunge le tappe alla mappa
    async addAllStages() {
      const bounds = L.latLngBounds();
      for (let i = 0; i < this.trip.stages.length; i++) {
        const stage = this.trip.stages[i];
        const coords = await this.getCoordinates(stage.address);
        if (coords) {
          const stageNumber = i + 1;
          const markerTitle = `Tappa [${stageNumber}], ${stage.title}`
          this.addMarker(coords, markerTitle);
          bounds.extend(coords);
        }
      }
      this.map.fitBounds(bounds);
    },
    //funzione che aggiunge il marker alla mappa in base alle cordinate che passiamo
    addMarker(coords, title) {
      const marker = L.marker(coords).addTo(this.map);
      marker.bindPopup(title);
      this.markers.push(marker);
    },
    //funzione che ci restituisce le cordinate dall'indirizzo
    async getCoordinates(address) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
      return null;
    }
  }
}
</script>
<template>
    <div id="map" style="height: 400px;"></div>
</template>
<style scoped>
    @import 'leaflet/dist/leaflet.css';
</style>