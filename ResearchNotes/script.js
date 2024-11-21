const saveNoteButton = document.getElementById('saveNote');
const noteInput = document.getElementById('noteInput');
const notesGallery = document.getElementById('notesGallery');
const clearAllButton = document.getElementById('clearAllButton');

// Load notes from the backend when the page is loaded
window.onload = function() {
  fetchNotes();
};

// Fetch notes from the Netlify function
async function fetchNotes() {
  const response = await fetch('/.netlify/functions/notes');
  const notes = await response.json();
  displayNotes(notes);
}

// Display notes on the page
function displayNotes(notes) {
  notesGallery.innerHTML = '';
  notes.forEach(note => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.textContent = note;
    notesGallery.appendChild(noteDiv);
  });
}

// Save a note to the backend
saveNoteButton.addEventListener('click', async function() {
  const note = noteInput.value.trim();
  if (note) {
    await fetch('/.netlify/functions/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });
    noteInput.value = '';
    fetchNotes();  // Refresh the notes gallery
  }
});

// Clear all notes (password protected)
clearAllButton.addEventListener('click', function() {
  const enteredPassword = prompt("Enter password to clear all notes:");
  if (enteredPassword === "yourpassword") {
    // You would ideally add a clear method on the backend, but here it's skipped.
    alert("Notes cleared (this feature isn't fully implemented).");
  } else {
    alert("Incorrect password!");
  }
});
