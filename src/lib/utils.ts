export const shortAddress = (adr: string) => {
    const start = adr.slice(0, 5);
    const end = adr.slice(-5); // get last 5 characters
    return `${start}...${end}`;
};


export const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const mapStatus = (num: number) => {
    return num === 0 ? "Pending"
        : num === 1 ? "In Progress"
            : num === 3 ? "Resolved"
                : "N/A"
}