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
      var searchQuery = document.getElementById('searchInput').value;
      if (searchQuery) {
        window.location.href = '/search?query=' + encodeURIComponent(searchQuery);
      } else {
        alert("Molimo unesite termin za pretragu.");
      }
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
    const korpa = JSON.parse(localStorage.getItem('korpa')) || [];
    korpa.push(nazivProizvoda);
    localStorage.setItem('korpa', JSON.stringify(korpa));
    alert(nazivProizvoda + " je dodat u korpu.");
  }
  
  function ucitajKorpu() {
    const korpa = JSON.parse(localStorage.getItem('korpa')) || [];
    const korpaDiv = document.querySelector('.korpa-proizvodi');
    korpaDiv.innerHTML = '';
    korpa.forEach(function(nazivProizvoda) {
      const proizvodDiv = document.createElement('div');
      proizvodDiv.textContent = nazivProizvoda;
      korpaDiv.appendChild(proizvodDiv);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Kod za hamburger meni i dugme za pretragu
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav ul');
  
    if (hamburger) {
      hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('is-active');
      });
    }
  
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', function() {
        var searchQuery = document.getElementById('searchInput').value;
        if (searchQuery) {
          window.location.href = '/search?query=' + encodeURIComponent(searchQuery);
        } else {
          alert("Molimo unesite termin za pretragu.");
        }
      });
    }
  
    // Kod za dodavanje u korpu na stranici Proizvodi.html
    const dodajUKorpuButtons = document.querySelectorAll('.dodaj-u-korpu-btn');
    if (dodajUKorpuButtons.length > 0) {
      dodajUKorpuButtons.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          // ... (logika za dodavanje proizvoda u korpu)
        });
      });
    }
  
    // Kod za prikazivanje proizvoda u korpi na stranici Korpa.html
    const korpaItemsDiv = document.querySelector('.korpa-items');
    if (korpaItemsDiv) {
      const korpa = JSON.parse(localStorage.getItem('korpa')) || [];
      let ukupnaCena = 0;
  
      korpa.forEach(proizvod => {
        // ... (logika za prikazivanje proizvoda u korpi)
      });
  
      const ukupnoZaNaplatuInput = document.getElementById('ukupnoZaNaplatu');
      if (ukupnoZaNaplatuInput) {
        ukupnoZaNaplatuInput.value = ukupnaCena + ' RSD';
      }
  
      const formaZaPorucivanje = document.getElementById('formaZaPorucivanje');
      if (formaZaPorucivanje) {
        formaZaPorucivanje.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Porudžbina je uspešno kreirana.');
          // ... (logika za slanje porudžbine na server)
        });
      }
    }
  });
  