# Travel App

Travel App è una Progressive Web App (PWA) sviluppata con Vue.js e Vite, progettata per aiutare gli utenti a organizzare e tenere traccia dei loro viaggi.
Gli utenti possono creare e gestire diversi viaggi, aggiungere tappe a ciascun viaggio, e monitorare il completamento delle tappe. Inolotre è possibile visualizzare le proprie tappe sulla mappa.

## Funzionalità Principali

- **Aggiunta di Viaggi:** Crea nuovi viaggi e organizza le tappe da visitare.
- **Gestione delle Tappe:** Aggiungi, modifica, e rimuovi tappe per ciascun viaggio.
- **Visualizzazione dello Stato delle Tappe:** Ogni tappa è visualizzata in uno stepper con uno stato (completata o non completata).
- **Mappa delle Tappe:** Visualizza tutte le tappe su una mappa interattiva.
- **Salvataggio Offline:** L'applicazione è una PWA che permette l'accesso e la modifica dei dati anche senza connessione Internet.

## Tecnologie Utilizzate

- **Vite:** Utilizzato per la configurazione del progetto e per gestire il bundling delle risorse.
- **Vue:** Il framework principale utilizzato per costruire l'interfaccia utente dell'applicazione
- **Vue Router:** Gestisce la navigazione tra le diverse pagine dell'applicazione
- **vueuse - motion:** Libreria utilizzata per animare le sezioni al caricamento della pagina
- **PWA Plugin (Vite PWA):** Utilizzato per trasformare l'applicazione in una Progressive Web App, aggiungendo funzionalità come il funzionamento offline e la possibilità di installare l'app sul dispositivo dell'utente.
- **Leaflet:** Librerie utilizzata per la visualizzazione delle mappe, impostata per mostrare le tappe dei viaggi su una mappa interattiva.
- **LocalStorage:** Utilizzato per la persistenza dei dati sul lato client, permettendo di salvare lo stato dell'applicazione localmente nel browser dell'utente.
- **CSS/SCSS/Bootstrap:** Utilizzati per aggiungere gli stili grafici all'applicazioone
