const jobsContainer = document.getElementById("jobsContainer");
const savedJobsContainer = document.getElementById("savedJobs");
const savedCount = document.getElementById("savedCount");

let jobs = [
    { id: 1, title: "Frontend Developer", company: "TechSoft", location: "Hyderabad", salary: "6 LPA", exp: "1-3 Years", category: "IT" },
    { id: 2, title: "Backend Developer", company: "CodeLabs", location: "Bangalore", salary: "8 LPA", exp: "2-4 Years", category: "IT" },
    { id: 3, title: "UI Designer", company: "Creative Studio", location: "Mumbai", salary: "5 LPA", exp: "1-2 Years", category: "Design" },
    { id: 4, title: "Digital Marketing Executive", company: "MarketPro", location: "Pune", salary: "4 LPA", exp: "1-2 Years", category: "Marketing" },
    { id: 5, title: "Data Analyst", company: "DataCorp", location: "Chennai", salary: "7 LPA", exp: "2-3 Years", category: "IT" },
    { id: 6, title: "AI Engineer", company: "FutureTech", location: "Bangalore", salary: "15 LPA", exp: "3-6 Years", category: "IT" },
    { id: 7, title: "Graphic Designer", company: "PixelWorks", location: "Delhi", salary: "4 LPA", exp: "1-2 Years", category: "Design" }
];

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

function displayJobs(list) {
    jobsContainer.innerHTML = "";

    list.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";

        div.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> - ${job.location}</p>
            <p>Salary: ${job.salary}</p>
            <p>Experience: ${job.exp}</p>
            <span class="category-tag">${job.category}</span><br>
            <button class="action-btn apply-btn" onclick="applyJob('${job.title}')">Apply</button>
            <button class="action-btn save-btn" onclick="saveJob(${job.id})">Save</button>
        `;

        jobsContainer.appendChild(div);
    });
}

function searchJobs() {
    const keyword = document.getElementById("keyword").value.toLowerCase();
    const location = document.getElementById("location").value.toLowerCase();
    const category = document.getElementById("category").value;

    const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(keyword) &&
        job.location.toLowerCase().includes(location) &&
        (category === "" || job.category === category)
    );

    displayJobs(filtered);
}

function saveJob(id) {
    const job = jobs.find(j => j.id === id);

    if (!savedJobs.some(j => j.id === id)) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        displaySavedJobs();
    }
}

function displaySavedJobs() {
    savedJobsContainer.innerHTML = "";
    savedCount.textContent = savedJobs.length;

    savedJobs.forEach((job, index) => {
        const div = document.createElement("div");
        div.className = "job-card";

        div.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <button class="action-btn delete-btn" onclick="deleteSaved(${index})">Remove</button>
        `;

        savedJobsContainer.appendChild(div);
    });
}

function deleteSaved(index) {
    savedJobs.splice(index, 1);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    displaySavedJobs();
}

function applyJob(title) {
    alert("Application submitted for " + title);
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

displayJobs(jobs);
displaySavedJobs();
