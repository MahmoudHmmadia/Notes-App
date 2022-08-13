// aside show
let asideShowBtn = document.querySelector("aside .show-aside-btn"),
    settigsAsideBtn = document.querySelector(
        ".settings-page .aside .show-aside-btn"
    ),
    aside = document.querySelector("aside"),
    settigsAside = document.querySelector(".settings-page .aside");
asideShowBtn.addEventListener("click", () => {
    aside.classList.toggle("show");
});
settigsAsideBtn.addEventListener("click", () => {
    settigsAside.classList.toggle("show");
});
//chose page & Chosen Settings Page

let allPagesList = Array.from(document.querySelectorAll(".pages li")),
    settingsPagesList = Array.from(
        document.querySelectorAll(".app-body .settings-page li")
    ),
    allPages = Array.from(document.querySelectorAll(".app-body .page")),
    settingsPages = Array.from(
        document.querySelectorAll(".app-body .settings-page .page")
    ),
    addPage = document.querySelector(".add-page"),
    allNotesPage = document.querySelector(".all-page"),
    doneNotesPage = document.querySelector(".done-page"),
    settingsPage = document.querySelector(".settings-page"),
    delNotesPage = document.querySelector(".settings-page .del-notes-container"),
    settingsPageBtn = document.querySelector(".pages li.settings");

allPagesList.forEach((li) => {
    li.addEventListener("click", (e) => {
        allPagesList.forEach((li) => {
            li.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        showPage();
    });
});
settingsPagesList.forEach((li) => {
    li.addEventListener("click", (e) => {
        settingsPagesList.forEach((li) => {
            li.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        showPage();
    });
});

//add new note && edit exist note

let titleInput = document.querySelector(".add-page .title-input"),
    descriptionInput = document.querySelector(".add-page .discription-input"),
    addBtn = document.querySelector(".add-page .add-btn"),
    addIcon = Array.from(document.querySelectorAll(" .add-icon")),
    notes = [],
    id,
    edit = false;
const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
// Get Notes From Local Storage
if (window.localStorage.getItem("notes")) {
    notes = JSON.parse(window.localStorage.getItem("notes"));
}

addBtn.onclick = () => {
    if (titleInput.value && descriptionInput.value) {
        if (edit) {
            edit = false;
            addBtn.innerHTML = "Add Note";
            notes.forEach((note) => {
                if (note.id === id) {
                    note.title = titleInput.value;
                    note.description = descriptionInput.value;
                }
            });
        } else {
            addBtn.innerHTML = "Add Note";
            addNewNote();
        }
        allPagesList.forEach((li) => {
            li.classList.remove("active");
        });
        document.querySelector(".pages li.all").classList.add("active");
        titleInput.value = "";
        descriptionInput.value = "";
        showPage();
        displayNotes();
    }
};

//Select Popup Element
let popupPage = document.querySelector(".popup");
// Delete All Notes Btn
let delAllBtn = document.querySelector(".settings-page .delete-all");
delAllBtn.addEventListener("click", () => delAllNote());
//Stop Form Default
document.querySelectorAll("form").forEach((e) => {
    e.onsubmit = (e) => {
        e.preventDefault();
    };
});

// Call Display Notes Function
displayNotes();

// ====> *_* functions *_* <====

// -- [1] --
// Add Note ^_^
function addNewNote() {
    const time = new Date();
    notes.push({
        id: Math.floor(Math.random() * 1000),
        done: false,
        title: titleInput.value,
        description: descriptionInput.value,
        date: `${time.getFullYear()} ${Months[time.getMonth()]} ${
      days[time.getDay()]
    } ${time.getHours() < 10 ? "0" + time.getHours() : time.getHours()}:${
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    }`,
        delete: false,
    });
    window.localStorage.setItem("notes", JSON.stringify(notes));
}

// -- [2] --
// Display Notes ^_^
function displayNotes() {
    let doneNotes = [];
    let normalNotes = [];
    let delNotes = [];
    let theDoneNoteTaple = "";
    let theNormalNoteTaple = "";
    let theDelNoteTaple = "";
    const doneNotesDefault = `    
<div class="empty-page">
    <h1>There Is No done Notes</h1>
    <div class='add-icon' onclick='returnToAddNotePage()'>
        <i class="fa-solid fa-add"></i>
    </div>
    <p>Press To Add One</p>
</div>`;
    const normalNotesDefault = `
<div class="empty-page">
  <h1>There Is No Notes</h1> 
  <div class='add-icon' onclick='returnToAddNotePage()'>
        <i class="fa-solid fa-add"></i>
  </div>
  <p>Press To Add One</p>
</div>
  `;
    const delNotesDefault = `<h1>There Is No Deleted Notes</h1>`;
    if (notes.length > 0) {
        notes.forEach((note) => {
            if (note.done && !note.delete) {
                doneNotes.push(note);
            } else if (!note.done && !note.delete) {
                normalNotes.push(note);
            }
            if (note.delete) {
                delNotes.push(note);
            }
        });
        doneNotes.forEach((note) => {
            theDoneNoteTaple += `
                    <div class="note" >
                    <div class="detailes">
                      <h4 class="title">${note.title}</h4>
                      <span class="discription">
                        ${note.description}
                      </span>
                      <span class="date">
                        ${note.date}
                      </span>
                    </div>
                    <ul class="note-settings" id=${note.id}>
                      <li class="delete" onclick='moveNoteToRecycleBin(this)'><i class="fa-solid fa-delete-left"></i></li>
                      <li class="edit" onclick='editNote(this)'><i class="fa-solid fa-edit"></i></li>
                      <li class="done" onclick='done(this)'><i class="fa-solid fa-check-double"></i></li>
                      <li class="focus" onclick='popup(this)' ><i class="fa-solid fa-eye"></i></li>
                    </ul>
                  </div> 
    `;
        });
        normalNotes.forEach((note) => {
            theNormalNoteTaple += `
        <div class="note" >
          <div class="detailes">
            <h4 class="title">${note.title}</h4>
            <span class="discription">
              ${note.description}
            </span>
            <span class="date">
              ${note.date}
            </span>
          </div>
          <ul class="note-settings" id=${note.id}>
            <li class="delete" onclick='moveNoteToRecycleBin(this)'><i class="fa-solid fa-delete-left"></i></li>
            <li class="edit" onclick='editNote(this)'><i class="fa-solid fa-edit"></i></li>
            <li class="done" onclick='done(this)'><i class="fa-solid fa-check"></i></li>
            <li class="focus" onclick='popup(this)' ><i class="fa-solid fa-eye"></i></li>
          </ul>
        </div> 
    `;
        });
        delNotes.forEach((note) => {
            theDelNoteTaple += `
            <div class="del-note">
                            <div class="preview">
                                <p>${note.title}</p>
                            </div>
                            <div class="controlres" id=${note.id}>
                                <span class="restore" onclick='restoreNote(this)'>Restore</span>
                                <span class="delete-from-trash" onclick='delNote(${note.id})'>Delete</span>
                            </div>
                        </div>
            `;
        });
        if (theDoneNoteTaple) {
            doneNotesPage.innerHTML = theDoneNoteTaple;
        } else {
            doneNotesPage.innerHTML = doneNotesDefault;
        }
        if (theNormalNoteTaple) {
            allNotesPage.innerHTML = theNormalNoteTaple;
        } else {
            allNotesPage.innerHTML = normalNotesDefault;
        }
        if (theDelNoteTaple) {
            delNotesPage.innerHTML = theDelNoteTaple;
        } else {
            delNotesPage.innerHTML = delNotesDefault;
        }
    } else if (notes.length === 0) {
        allNotesPage.innerHTML = normalNotesDefault;
        doneNotesPage.innerHTML = doneNotesDefault;
        delNotesPage.innerHTML = delNotesDefault;
    }
    displayDelAllNotesBtn();
    window.localStorage.setItem("notes", JSON.stringify(notes));
}

// -- [3] --
// Show Page ^_^
function showPage() {
    allPages.forEach((page) => {
        page.classList.add("hide");
        allPagesList.forEach((li) => {
            if (li.classList.contains("active")) {
                document.querySelector(`${li.dataset.page}`).classList.remove("hide");
            }
        });
    });
    allPages.forEach((page) => {
        settingsPagesList.forEach((li) => {
            if (li.classList.contains("active")) {
                document.querySelector(`${li.dataset.page}`).classList.remove("hide");
            }
        });
    });

    if (settingsPageBtn.classList.contains("active")) {
        document.querySelector(".pages li.settings svg").classList.add("fa-spin");
    } else {
        document
            .querySelector(".pages li.settings svg")
            .classList.remove("fa-spin");
    }
}

// -- [4] --
// Show Popup ^_^
function popup(e) {
    notes.forEach((note) => {
        if (note.id === parseInt(e.parentElement.id)) {
            popupPage.innerHTML = "";
            popupPage.innerHTML += `
                <div class="popup-content">
                <div class="note">
                    <div class="detailes">
                        <h4 class="title">${note.title}</h4>
                        <div class="discription"> ${note.description}</div>
                        <span class="date">${note.date}</span>
                    </div>
                    <ul class='note-settings'>
                        <li class="done" onclick='closePopup()'>
                            <i class="fa-solid fa-eye-low-vision"></i>
                        </li>
                    </ul>
                </div>
            </div>
                `;
            popupPage.classList.remove("hide");
        }
    });
}

// -- [5] --
// Close Popup ^_^
function closePopup() {
    popupPage.classList.add("hide");
}

// -- [6] --
// Done Note ^_^
function done(e) {
    notes.forEach((note) => {
        if (note.id === parseInt(e.parentElement.id)) {
            note.done = true;
        }
    });
    allPagesList.forEach((li) => {
        li.classList.remove("active");
    });
    document.querySelector(".pages li.done").classList.add("active");
    showPage();
    displayNotes();
}

// -- [7] --
// Move Note To Recycle Bin ^_^
function moveNoteToRecycleBin(e) {
    notes.forEach((note) => {
        if (parseInt(e.parentElement.id) === note.id) {
            note.delete = true;
        }
    });
    displayNotes();
}

// -- [8] --
// Edit Note ^_^
function editNote(e) {
    edit = true;
    addBtn.innerHTML = "Update";
    notes.forEach((note) => {
        if (note.id === parseInt(e.parentElement.id)) {
            allPagesList.forEach((li) => {
                li.classList.remove("active");
            });
            document.querySelector(".pages li.add").classList.add("active");
            showPage();
            titleInput.value = note.title;
            descriptionInput.value = note.description;
            id = note.id;
        }
    });
}
// -- [9] --
// Delete All Notes Btn Display ^_^
function displayDelAllNotesBtn() {
    if (notes.length > 0) {
        delAllBtn.classList.remove("hide");
    } else {
        delAllBtn.classList.add("hide");
    }
}

// -- [10] --
// Delete All Notes  ^_^
function delAllNote() {
    notes.length = 0;
    displayNotes();
}

// -- [11] --
// Return To Add Note Page ^_^
function returnToAddNotePage() {
    allPagesList.forEach((li) => {
        li.classList.remove("active");
    });
    document.querySelector(".pages li.add").classList.add("active");
    showPage();
}

// -- [12] --
// Delete Note ^_^
function delNote(id) {
    for (let i in notes) {
        if (id === notes[i].id) {
            notes.splice(i, 1);
        }
    }
    displayNotes();
}

// -- [13] --
// Restore Note ^_^
function restoreNote(e) {
    notes.forEach((note) => {
        if (parseInt(e.parentElement.id) === note.id) {
            note.delete = false;
        }
    });
    displayNotes();
}