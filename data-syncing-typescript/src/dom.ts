import { getAllCampgrounds, deleteCampground, addCampground, Campsite } from './api';

const tbody = document.getElementById('tbody') as HTMLElement;
let submit = document.getElementById('submit');

export const showCampgrounds = (data: Array<Campsite>): void => {
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
        deleteButton.onclick = () => deleteCampgroundHandler(item.id);

        td3.appendChild(deleteButton);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
};

const deleteCampgroundHandler = async (id: string): Promise<void> => {
    await deleteCampground(id);
    loadCampgrounds();
};

export const setupEventListeners = (): void => {
    submit?.addEventListener('click', (e) => addCampgroundHandler(e));
};

const addCampgroundHandler = async (e: Event): Promise<void> => {
    e.preventDefault();
    let campground = (document.getElementById('campground') as HTMLInputElement).value;
    let location = (document.getElementById('location') as HTMLInputElement).value;

    await addCampground(campground, location);
    (document.getElementById('campground') as HTMLInputElement).value = '';
    (document.getElementById('location') as HTMLInputElement).value = '';
    loadCampgrounds();
};

export const loadCampgrounds = async (): Promise<void> => {
    const campgrounds = await getAllCampgrounds(`http://localhost:3000/campgrounds/`);
    showCampgrounds(campgrounds);
};