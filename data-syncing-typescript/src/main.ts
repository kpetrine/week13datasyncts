import "bootstrap/dist/css/bootstrap.min.css"
//link to localhost
const PORT = 3000;
const defaultBaseUrl = `http://localhost:${PORT}/campgrounds/`;

let submit = document.getElementById('submit');
submit?.addEventListener('click', (e) => addCampground(e));

const getAllCampgrounds = async (baseURL: string) => {
    try {
        let response = await fetch(`${baseURL}`);
        let data = await response.json();
        showCampgrounds(data);
    } catch (error) {
        console.error('Error fetching campgrounds:', error);
    }
};
// show database 
type Campsite = {
    campground: string,
    location: string
}
function showCampgrounds(data: Array<Campsite>) {
    let tbody = document.getElementById('tbody') as HTMLElement;
    tbody.innerHTML = ''; // Clear existing rows

    for (let item of data) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.textContent = item.campground;
        td2.textContent = item.location;

        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = () => deleteCampground(item.id);

        td3.appendChild(deleteButton);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
}
// Delete
const deleteCampground = async (id: string) => {
    try {
        let response = await fetch(`${defaultBaseUrl}${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            getAllCampgrounds(defaultBaseUrl);
        } else {
            console.error('Failed to delete campground:', response.status);
        }
    } catch (error) {
        console.error('Error deleting campground:', error);
    }
};

// Create 
const addCampground = async (e) => {
    e.preventDefault();
    let campground = document.getElementById('campground').value;
    let location = document.getElementById('location').value;
    let newCampground = { campground, location };

    try {
        let response = await fetch(defaultBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCampground)
        });
        let data = await response.json();
        console.log('New campground added:', data);
        
        document.getElementById('campground').value = '';
        document.getElementById('location').value = '';
        getAllCampgrounds(defaultBaseUrl);
    } catch (error) {
        console.error('Error adding campground:', error);
    }
};

// Initial call to get all campgrounds
getAllCampgrounds(defaultBaseUrl);
