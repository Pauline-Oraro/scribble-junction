// declaring and initializing variables by retreveing elements from the DOM 
// the querySelector returns the first element that matches a specified css selector
const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = popupBox.querySelector('header p');
const closeIcon = document.querySelector('header i');
const titleElement = document.querySelector('input');
const descElement = document.querySelector('textarea');
const addButton = document.querySelector('button ');


const months= ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//localStorage allows js sites and apps to store and access data without any expiration date
//the getItem retrieves the value
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false;
let updateId;


//displayes the notes
function showNotes() {
    //the querySelectorAll returns all elements that matches a specified css selector
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index)=>{
        let liEl=`<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onClick="updateNote(${index}, '${note.title}', '${note.description}')"  class="uil uil-edit"></i>
                                <i onClick="deleteNote(${index})" class="uil uil-trash"></i>
                            </div>
                        </div>
                    </li>`;
                    //inserts the above html code after addBox element
        addBox.insertAdjacentHTML('afterend', liEl);
    });
}

showNotes();

//to delete a note
function deleteNote(noteId) {
    let confirmDelete= confirm("Are you sure you want to delete this note?");
    if(!confirmDelete) return;
    notes.splice(noteId, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

//to update a note
function updateNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleElement.value = title;
    descElement.value = desc;
    addButton.innerText = 'Edit Note';
    popupTitle.innerText = 'Editing a Note';
}

//when the addBox element is clicked the title will be on focus and a new class is added to the popupBox element
addBox.addEventListener('click', ()=>{
    titleElement.focus();
    popupBox.classList.add('show');
});

//to close the popup box
closeIcon.addEventListener('click', ()=>{
    isUpdate = false;
    titleElement.value = '';
    descElement.value = '';
    addButton.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
    popupBox.classList.remove('show');
});

addButton.addEventListener('click', (e)=>{
    e.preventDefault();
    let noteTitle = titleElement.value,
    noteDesc = descElement.value;
    if (noteTitle || noteDesc) {
        let dateEl= new Date(),
        month = months[dateEl.getMonth()],
        day = dateEl.getDate(),
        year = dateEl.getFullYear();


        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day} ${year}`
        }
        
        if (!isUpdate) {
            notes.push(noteInfo);
        }else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});

