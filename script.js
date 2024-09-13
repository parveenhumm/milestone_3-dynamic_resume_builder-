"use strict";
// Get references to HTML elements
const resumeForm = document.getElementById('resume-form');
const experienceList = document.getElementById('experience-list');
const educationList = document.getElementById('education-list');
const resumePreview = document.getElementById('resume-preview');
// Event listener for form submission
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    // Gather user data
    const name = document.getElementById('name');
    const title = document.getElementById('title');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const skills = document.getElementById('skills');
    // Get experience and education data
    const experienceData = Array.from(experienceList.children).map((experienceItem) => {
        const jobTitle = experienceItem.querySelector('input[name="job-title"]');
        const company = experienceItem.querySelector('input[name="company"]');
        const location = experienceItem.querySelector('input[name="location"]');
        const startDate = experienceItem.querySelector('input[name="start-date"]');
        const endDate = experienceItem.querySelector('input[name="end-date"]');
        const responsibilities = Array.from(experienceItem.querySelectorAll('input[name="responsibility"]'))
            .map((input) => input.value)
            .filter((responsibility) => responsibility !== '');
        return {
            jobTitle: jobTitle.value,
            company: company.value,
            location: location.value,
            startDate: startDate.value,
            endDate: endDate.value,
            responsibilities
        };
    });
    const educationData = Array.from(educationList.children).map((educationItem) => {
        const degree = educationItem.querySelector('input[name="degree"]');
        const school = educationItem.querySelector('input[name="school"]');
        const location = educationItem.querySelector('input[name="location"]');
        const startDate = educationItem.querySelector('input[name="start-date"]');
        const endDate = educationItem.querySelector('input[name="end-date"]');
        return {
            degree: degree.value,
            school: school.value,
            location: location.value,
            startDate: startDate.value,
            endDate: endDate.value
        };
    });
    // Generate resume HTML using the collected data
    const resumeHTML = `
    <div class="resume-header">
      <h1>${name.value}</h1>
      <p>${title.value}</p>
      <p>${email.value}</p>
      <p>${phone.value}</p>
    </div>
    <div class="resume-section">
      <h2>Experience</h2>
      <ul>
        ${experienceData.map((experience) => `
          <li>
            <h3>${experience.jobTitle}</h3>
            <p>${experience.company}</p>
            <p>${experience.location}</p>
            <p>${experience.startDate} - ${experience.endDate}</p>
            <ul>
              ${experience.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
    </div>
    <div class="resume-section">
      <h2>Education</h2>
      <ul>
        ${educationData.map((education) => `
          <li>
            <h3>${education.degree}</h3>
            <p>${education.school}</p>
            <p>${education.location}</p>
            <p>${education.startDate} - ${education.endDate}</p>
          </li>
        `).join('')}
      </ul>
    </div>
    <div class="resume-section">
      <h2>Skills</h2>
      <p>${skills.value}</p>
    </div>
  `;
    // Display the generated resume
    resumePreview.innerHTML = resumeHTML;
});
// Function to add a new experience section
function addExperience() {
    const experienceItem = document.createElement('div');
    experienceItem.innerHTML = `
    <input type="text" name="job-title" placeholder="Job Title" required>
    <input type="text" name="company" placeholder="Company" required>
    <input type="text" name="location" placeholder="Location">
    <input type="date" name="start-date" placeholder="Start Date">
    <input type="date" name="end-date" placeholder="End Date">
    <button type="button" class="remove-experience">Remove</button>
  `;
    const removeButton = experienceItem.querySelector('.remove-experience');
    removeButton.addEventListener('click', () => {
        experienceList.removeChild(experienceItem);
    });
    experienceList.appendChild(experienceItem);
}
// Function to add a new education section
function addEducation() {
    const educationItem = document.createElement('div');
    educationItem.innerHTML = `
    <input type="text" name="degree" placeholder="Degree" required>
    <input type="text" name="school" placeholder="School" required>
    <input type="text" name="location" placeholder="Location">
    <input type="date" name="start-date" placeholder="Start Date">
    <input type="date" name="end-date" placeholder="End Date">
    <button type="button" class="remove-education">Remove</button>
  `;
    const removeButton = educationItem.querySelector('.remove-education');
    removeButton.addEventListener('click', () => {
        educationList.removeChild(educationItem);
    });
    educationList.appendChild(educationItem);
}
// Event listeners for adding experience and education sections
document.getElementById('add-experience').addEventListener('click', addExperience);
document.getElementById('add-education').addEventListener('click', addEducation);
