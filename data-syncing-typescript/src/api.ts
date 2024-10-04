const PORT = 3000;
const defaultBaseUrl = `http://localhost:${PORT}/campgrounds/`;

export type Campsite = {
    id: string;
    campground: string;
    location: string;
};

export const getAllCampgrounds = async (baseURL: string): Promise<Array<Campsite>> => {
    try {
        let response = await fetch(`${baseURL}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching campgrounds:', error);
        return [];
    }
};

export const deleteCampground = async (id: string): Promise<void> => {
    try {
        let response = await fetch(`${defaultBaseUrl}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            console.error('Failed to delete campground:', response.status);
        }
    } catch (error) {
        console.error('Error deleting campground:', error);
    }
};

export const addCampground = async (campground: string, location: string): Promise<void> => {
    const newCampground = { campground, location };

    try {
        let response = await fetch(defaultBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCampground),
        });
        if (!response.ok) {
            throw new Error('Failed to add campground');
        }
    } catch (error) {
        console.error('Error adding campground:', error);
    }
};