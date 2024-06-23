# Programmeren 4

Eind opdracht programmeren 4 `Share-a-meal API`

### Inhoudsopgave

1. [Server beschrijving](#server-beschrijving)
1. [Endpoints](#endpoints)
1. [Authenticatie](#authenticatie)

## Server beschrijving

De Share-a-meal API is een server die is ontwikkeld als eindopdracht voor het vak Programmeren 4. Deze API stelt gebruikers in staat om maaltijden te delen en informatie over gebruikers en maaltijden op te vragen. De server maakt gebruik van verschillende endpoints om deze functionaliteit mogelijk te maken. Hieronder vind je een overzicht van de beschikbare endpoints en hun bijbehorende methoden en authenticatievereisten.

### Endpoints

| Endpoint          | Method | beschrijving                      | Authenticated? |
| ----------------- | ------ | --------------------------------- | -------------- |
| /api/info         | GET    | Toon alle endpoints               | Nee            |
| /api/user         | GET    | Toon van alle users               | Ja             |
| /api/user/profile | GET    | Toon van de ingelogde user        | Ja             |
| /api/user/:id     | GET    | Toon van een specifieke user      | Ja             |
| /api/user/:id     | PUT    | Verander van een specifieke user  | Ja             |
| /api/user/:id     | DEL    | Verwijder een specifiek user      | Ja             |
| /api/meal         | GET    | Toon alle maaltijden              | nee            |
| /api/meal/:id     | GET    | Toon een specifieke maaltijden    | Nee            |
| /api/meal/:id     | PUT    | Verander een specifieke maaltijd  | Ja             |
| /api/meal/:id     | DEL    | Verwijder een specifieke maaltijd | Ja             |

## Authenticatie

Om toegang te krijgen tot de beveiligde endpoints van de Share-a-meal API, moet je een geldige authenticatie-header meesturen met je verzoek. De authenticatie-header moet de volgende indeling hebben:

```
Authorization: Bearer <token>
```

Vervang `<token>` door een geldig JWT-token dat je hebt verkregen na succesvol inloggen. Zorg ervoor dat je de header correct opneemt in je verzoek om toegang te krijgen tot de beveiligde endpoints.

Let op: De endpoints die authenticatie vereisen, zijn gemarkeerd met "Ja" in de kolom "Authenticated?" in de tabel hierboven.
