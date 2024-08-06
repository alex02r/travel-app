//update del travel nel localstorage
export const StorageService = {
    getTravels() {
        return JSON.parse(localStorage.getItem('travels') || '[]');
    },
    setTravels(travels) {
        localStorage.setItem('travels', JSON.stringify(travels));
    }
};