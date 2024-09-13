// Get references to HTML elements
const resumeForm = document.getElementById('resume-form') as HTMLFormElement;
const experienceList = document.getElementById('experience-list') as HTMLDivElement;
const educationList = document.getElementById('education-list') as HTMLDivElement;
const resumePreview = document.getElementById('resume-preview') as HTMLDivElement;

// Event listener for form submission
 resumeForm.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // Prevent default form submission

  // Gather user data
  const name = document.getElementById('name') as HTMLInputElement;
  const title = document.getElementById('title') as HTMLInputElement;
  const email = document.getElementById('email') as HTMLInputElement;
  const phone = document.getElementById('phone') as HTMLInputElement;
  const skills = document.getElementById('skills') as HTMLInputElement;

  // Get experience and education data
  const experienceData: Experience[] = Array.from(experienceList.children as HTMLCollectionOf<HTMLDivElement>).map((experienceItem: HTMLDivElement) => {
      const jobTitle = experienceItem.querySelector('input[name="job-title"]') as HTMLInputElement;
      const company = experienceItem.querySelector('input[name="company"]') as HTMLInputElement;
      const location = experienceItem.querySelector('input[name="location"]') as HTMLInputElement;
      const startDate = experienceItem.querySelector('input[name="start-date"]') as HTMLInputElement;
      const endDate = experienceItem.querySelector('input[name="end-date"]') as HTMLInputElement;
      const responsibilities = Array.from(experienceItem.querySelectorAll('input[name="responsibility"]'))
      .map((input) => (input as HTMLInputElement).value)
        .filter((responsibility: string) => responsibility !== '');

      return {
        jobTitle: jobTitle.value,
        company: company.value,
        location: location.value,
        startDate: startDate.value,
        endDate: endDate.value,
        responsibilities
      };
    } 
  );
  
  const educationData: Education[] = Array.from(educationList.children as HTMLCollectionOf<HTMLDivElement>).map((educationItem: HTMLDivElement) => {
      const degree = educationItem.querySelector('input[name="degree"]') as HTMLInputElement;
      const school = educationItem.querySelector('input[name="school"]') as HTMLInputElement;
      const location = educationItem.querySelector('input[name="location"]') as HTMLInputElement;
      const startDate = educationItem.querySelector('input[name="start-date"]') as HTMLInputElement;
      const endDate = educationItem.querySelector('input[name="end-date"]') as HTMLInputElement;
  
      return {
        degree: degree.value,
        school: school.value,
        location: location.value,
        startDate: startDate.value,
        endDate: endDate.value
      };
    }
  );

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
        ${experienceData.map((experience: Experience) => `
          <li>
            <h3>${experience.jobTitle}</h3>
            <p>${experience.company}</p>
            <p>${experience.location}</p>
            <p>${experience.startDate} - ${experience.endDate}</p>
            <ul>
              ${experience.responsibilities.map((responsibility: string) => `<li>${responsibility}</li>`).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
    </div>
    <div class="resume-section">
      <h2>Education</h2>
      <ul>
        ${educationData.map((education: Education) => `
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

  const removeButton = experienceItem.querySelector('.remove-experience') as HTMLButtonElement;
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

  const removeButton = educationItem.querySelector('.remove-education') as HTMLButtonElement;
  removeButton.addEventListener('click', () => {
    educationList.removeChild(educationItem);
  });

  educationList.appendChild(educationItem);
}

// Event listeners for adding experience and education sections
document.getElementById('add-experience')!.addEventListener('click', addExperience);
document.getElementById('add-education')!.addEventListener('click', addEducation);

// Type definitions for experience and education data
interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}