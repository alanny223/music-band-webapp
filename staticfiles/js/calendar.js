
    function filterEvents(category) {
      const eventCards = document.querySelectorAll('.event-card');
      let hasEvents = false;

      eventCards.forEach(card => {
        if (card.getAttribute('data-category') === category || category === 'All') {
          card.style.display = 'block';
          card.style.animation = 'slideIn 0.7s ease-in-out';
          hasEvents = true;
        } else {
          card.style.display = 'none';
        }
      });

      document.getElementById('noEventsMessage').style.display = hasEvents ? 'none' : 'block';
    }
