(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".listing-result"));
  const favoriteButtons = Array.from(document.querySelectorAll(".wishlist-btn"));
  const favoritesOnly = document.getElementById("favoritesOnly");
  const resultCount = document.getElementById("visibleListingCount");
  const resultNoun = document.getElementById("visibleListingNoun");
  const noFavoritesMessage = document.getElementById("noFavoritesMessage");
  const status = document.getElementById("favoritesStatus");

  if (!favoriteButtons.length) return;

  let favoriteIds;
  try {
    const storedFavorites = JSON.parse(localStorage.getItem("staysphere-favorites") || "[]");
    favoriteIds = new Set(Array.isArray(storedFavorites) ? storedFavorites : []);
  } catch (error) {
    console.error("Could not read saved stays from browser storage.", error);
    favoriteIds = new Set();
    if (status) status.textContent = "Saved stays could not be loaded from this browser.";
  }

  const saveFavorites = () => {
    try {
      localStorage.setItem("staysphere-favorites", JSON.stringify(Array.from(favoriteIds)));
    } catch (error) {
      console.error("Could not save stays to browser storage.", error);
      if (status) status.textContent = "Your change is temporary because browser storage is unavailable.";
    }
  };

  const updateCards = () => {
    let visibleCount = 0;
    cards.forEach((card) => {
      const isFavorite = favoriteIds.has(card.dataset.listingId);
      card.hidden = Boolean(favoritesOnly && favoritesOnly.checked && !isFavorite);
      if (!card.hidden) visibleCount += 1;
    });

    if (resultCount) resultCount.textContent = String(visibleCount);
    if (resultNoun) resultNoun.textContent = visibleCount === 1 ? "stay" : "stays";
    if (noFavoritesMessage) {
      noFavoritesMessage.hidden = !favoritesOnly || !favoritesOnly.checked || visibleCount > 0;
    }
    favoriteButtons.forEach((button) => {
      const isFavorite = favoriteIds.has(button.dataset.listingId);
      button.textContent = isFavorite ? "♥" : "♡";
      button.classList.toggle("is-favorite", isFavorite);
      button.setAttribute("aria-pressed", String(isFavorite));
      button.setAttribute(
        "aria-label",
        `${isFavorite ? "Remove" : "Save"} ${button.dataset.listingTitle || "stay"} ${isFavorite ? "from" : "to"} favorites`
      );
    });
  };

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const listingId = button.dataset.listingId;
      if (favoriteIds.has(listingId)) {
        favoriteIds.delete(listingId);
      } else {
        favoriteIds.add(listingId);
      }
      saveFavorites();
      updateCards();
    });
  });

  if (favoritesOnly) favoritesOnly.addEventListener("change", updateCards);
  updateCards();
});
