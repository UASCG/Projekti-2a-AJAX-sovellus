# Finnkino Info - Elokuvateattereiden esitykset pääkaupunkiseudulla

Tämä on verkkosivu jonka toteutin kurssia **"Web-sovellusten kehittäminen Javascriptillä TO00BL10-3022"** ja sen toista projektia, **"Projekti 2a: AJAX-sovellus REST APIa hyödyntäen"** varten.

Verkkosivu sallii käyttäjän hakea tietoja Finnkinon elokuvateattereiden esityksistä pääkaupunkiseudulla, käyttäen Finnkinon API:a osoitteista https://www.finnkino.fi/xml/TheatreAreas/ ja https://www.finnkino.fi/xml/Schedule/.

Verkkosivulla on toteutettu käyttäen HTML:ää, CSS:ää ja JavaScriptiä. Verkkosivulla on pudotusvalikko, josta voi valita alueen tai teatterin, jonka esitykset halutaan nähdä. Sivusto hakee listan alueista ja teattereista heti sivuston latautuessa.

Kun käyttäjä valitsee listasta alueen/teatterin, verkkosivu hakee tuoreimmat tiedot Finnkinon aikataulusta ja esittää ne käyttäjälle. Esitykset näytetään siten, että aikaisimmat esitykset näytetään ensin. Sivusto kertoo kuinka monta esitystä löydettiin.

Käyttäjä voi valita alueen tai teatterin uudestaan, jolloin sivusto poistaa vanhat esitystiedot ja hakee uudet.

Sivusto ainoastaan hakee pääkaupunkiseudun Finnkino-teattereiden tietoja, koska Finnkinon API ei sisällä pääkaupunkiseudun ulkopuolella olevien teattereiden esitystietoja.