document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('nav ul');
  const modal = document.getElementById("modal");
  const span = document.getElementsByClassName("close")[0];

  hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('is-active');
  });

  document.getElementById('searchButton').addEventListener('click', function() {
      var searchQuery = document.getElementById('searchInput').value.toLowerCase();
      const proizvodi = document.querySelectorAll('.kartica');
      proizvodi.forEach(function(kartica) {
          const naziv = kartica.querySelector('h3').textContent.toLowerCase();
          const opis = kartica.querySelector('.detalji-proizvoda p').textContent.toLowerCase();
          if (naziv.includes(searchQuery) || opis.includes(searchQuery)) {
              kartica.style.display = '';
          } else {
              kartica.style.display = 'none';
          }
      });
  });

  document.querySelectorAll('.kartica').forEach(function(kartica) {
      const img = kartica.querySelector('img');
      img.addEventListener('click', function() {
          const detalji = kartica.querySelector('.detalji-proizvoda').innerHTML;
          document.querySelector(".modal-details").innerHTML = detalji;
          modal.style.display = "block";
      });
  });

  document.querySelectorAll('.dodaj-u-korpu-btn').forEach(function(dugme) {
      dugme.addEventListener('click', function(e) {
          e.stopPropagation();
          const proizvod = this.closest('.kartica');
          dodajUKorpu(proizvod);
      });
  });

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});

function dodajUKorpu(proizvod) {
  const nazivProizvoda = proizvod.querySelector('h3').textContent;
  const cenaProizvoda = proizvod.querySelector('.detalji-proizvoda p:nth-child(3)').textContent;
  const korpa = JSON.parse(localStorage.getItem('korpa')) || [];
  korpa.push({ naziv: nazivProizvoda, cena: cenaProizvoda });
  localStorage.setItem('korpa', JSON.stringify(korpa));
  alert(nazivProizvoda + " je dodat u korpu.");
}

function ucitajKorpu() {
  const korpa = JSON.parse(localStorage.getItem('korpa')) || [];
  const korpaDiv = document.querySelector('.korpa-items');
  korpaDiv.innerHTML = '';
  let ukupnaCena = 0;
  korpa.forEach(function(proizvod) {
      const proizvodDiv = document.createElement('div');
      proizvodDiv.textContent = proizvod.naziv + ' - ' + proizvod.cena;
      ukupnaCena += parseFloat(proizvod.cena.match(/[\d,.]+/)[0]);
      korpaDiv.appendChild(proizvodDiv);
  });
  const ukupnoZaNaplatuInput = document.getElementById('ukupnoZaNaplatu');
  if (ukupnoZaNaplatuInput) {
      ukupnoZaNaplatuInput.value = ukupnaCena.toFixed(2) + ' RSD';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const formaZaPorucivanje = document.getElementById('formaZaPorucivanje');
  if (formaZaPorucivanje) {
      formaZaPorucivanje.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Porudžbina je uspešno kreirana.');
          localStorage.removeItem('korpa');
          window.location.href = 'Korpa.html'; // Pretpostavka da postoji stranica za potvrdu porudžbine
      });
  }

  ucitajKorpu();
});

$(document).ready(function() {
  $.validate({
      form : '#formaZaPorucivanje',
      modules : 'location, date, security, file',
      onModulesLoaded : function() {
          $('input[name="datum"]').datepicker();
      },
      onElementValidate : function(valid, $el, $form, errorMess) {
          if (!valid) {
              console.log('Greška u validaciji za:', $el);
          }
      },
      lang : 'sr', 
  });
});
