let peopleData = [];

    // Load JSON Data
    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        peopleData = data;
        displayGallery(data);
      });

    function displayGallery(data) {
      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';

      data.forEach(person => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${person.photo}" alt="${person.name}">
          <div class="card-content">
            <h3>${person.name}</h3>
            <button class="btn" onclick="showInfo(${person.id})">View Info</button>
          </div>
        `;
        gallery.appendChild(card);
      });
    }

    // Search Function
    document.getElementById('searchInput').addEventListener('input', e => {
      const searchTerm = e.target.value.toLowerCase();
      const filtered = peopleData.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.email.toLowerCase().includes(searchTerm) ||
        p.address.toLowerCase().includes(searchTerm) ||
        p.month.toLowerCase().includes(searchTerm)
      );
      displayGallery(filtered);
    });

    function showInfo(id) {
      const gallery = document.getElementById('gallery');
      const infoBox = document.getElementById('infoBox');
      const details = document.getElementById('infoDetails');
      const note = document.getElementById('monthMatch');

      const person = peopleData.find(p => p.id === id);
      details.innerHTML = `
        <div class="info-item"><strong>ID:</strong> ${person.id}</div>
        <div class="info-item"><strong>Name:</strong> ${person.name}</div>
        <div class="info-item"><strong>Age:</strong> ${person.age}</div>
        <div class="info-item"><strong>Birth:</strong> ${person.year} / ${person.month}</div>
        <div class="info-item"><strong>Email:</strong> ${person.email}</div>
        <div class="info-item"><strong>Phone:</strong> ${person.ph}</div>
        <div class="info-item"><strong>Address:</strong> ${person.address}</div>
      `;

      // Find matching birth month
      const sameMonth = peopleData.filter(p => p.month === person.month && p.id !== person.id);

      if (sameMonth.length > 0) {
        note.textContent = `🎂 ${sameMonth.length} person(s) share the same birth month (${person.month})!`;
      } else {
        note.textContent = "";
      }

      gallery.style.display = 'none';
      infoBox.classList.add('active');
    }

    function goBack() {
      document.getElementById('infoBox').classList.remove('active');
      document.getElementById('gallery').style.display = 'grid';
      document.getElementById('monthMatch').textContent = "";
    }




  

  
    