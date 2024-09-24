document.addEventListener('DOMContentLoaded', () => {
  const emailList = document.getElementById('emailList');
  const emailContent = document.getElementById('emailContent');
  const summaryContent = document.getElementById('summaryContent');
  const archiveList = document.getElementById('archiveList');
  const dailyArchiveList = document.getElementById('dailyArchiveList');
  const generateDailySummaryBtn = document.getElementById('generateDailySummary');
  const currentDateDisplay = document.getElementById('currentDate');
  
  let archive = [];
  let dailyArchive = {}; // Object to store daily summaries by date

  // Simulating an email inbox
  const emails = [
      { id: 1, subject: "Project Update", content: "Here is the latest update on the project..." },
      { id: 2, subject: "Meeting Invitation", content: "You are invited to a meeting on Monday..." },
      { id: 3, subject: "Event Reminder", content: "Don't forget about the event tomorrow..." }
  ];

  // Load current date in the daily summaries section
  if (currentDateDisplay) {
      const currentDate = new Date().toLocaleDateString();
      currentDateDisplay.textContent = currentDate;
  }

  if (emailList) {
      // Load emails into inbox
      emails.forEach(email => {
          const li = document.createElement('li');
          li.textContent = email.subject;
          li.dataset.id = email.id;
          li.addEventListener('click', () => loadEmailContent(email.id));
          emailList.appendChild(li);
      });
  }

  // Function to load email content into textarea
  function loadEmailContent(emailId) {
      const selectedEmail = emails.find(email => email.id == emailId);
      if (emailContent) {
          emailContent.value = selectedEmail.content;
      }
  }

  // Summarize button action
  if (document.getElementById('summarizeBtn')) {
      document.getElementById('summarizeBtn').addEventListener('click', () => {
          const content = emailContent.value;
          if (content) {
              summaryContent.value = "Summarized: " + content.split(" ").slice(0, 10).join(" ") + "...";
          } else {
              summaryContent.value = "No email content to summarize.";
          }
      });
  }

  // Archive button action
  if (document.getElementById('archiveBtn')) {
      document.getElementById('archiveBtn').addEventListener('click', () => {
          const summary = summaryContent.value;
          if (summary) {
              archive.push(summary);
              updateArchiveList();
              alert("Summary saved to archive.");
          } else {
              alert("No summary to archive.");
          }
      });
  }

  // Function to update archive list
  function updateArchiveList() {
      if (archiveList) {
          archiveList.innerHTML = '';
          archive.forEach((summary, index) => {
              const li = document.createElement('li');
              li.textContent = `Summary ${index + 1}: ${summary}`;
              archiveList.appendChild(li);
          });
      }
  }


function saveDailySummary() {
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
  if (!dailyArchive[currentDate]) {
    dailyArchive[currentDate] = [];
  }
  const summariesToArchive = document.querySelectorAll('#emailList input[type="checkbox"]:checked');
  summariesToArchive.forEach(checkbox => {
    const emailId = checkbox.id.split('-')[1];
    const email = emails.find(email => email.id == emailId);
    if (email) {
      dailyArchive[currentDate].push(email.subject + ': ' + email.content);
    }
  });
  updateDailyArchiveList(currentDate);
}

function updateDailyArchiveList(date) {
  const dailyArchiveList = document.getElementById('dailyArchiveList');
  dailyArchiveList.innerHTML = '';
  dailyArchive[date].forEach(summary => {
    const li = document.createElement('li');
    li.textContent = summary;
    dailyArchiveList.appendChild(li);
  });
}

// Call saveDailySummary at the end of the day (using a simulated timeout for demonstration)
setTimeout(() => {
  saveDailySummary();
}, 1000 * 60 * 60 * 24); // Replace with your actual timing logic


  // Generate daily summaries
  if (generateDailySummaryBtn) {
      generateDailySummaryBtn.addEventListener('click', () => {
          const currentDate = new Date().toLocaleDateString();
          const dailySummaries = emails.map(email => ({
              subject: email.subject,
              summary: summarizeEmail(email.content)
          }));

          // Save daily summaries by date
          dailyArchive[currentDate] = dailySummaries;
          updateDailyArchiveList(currentDate);
          alert("Daily summaries generated and saved.");
      });
  }

  // Function to summarize an email
  function summarizeEmail(content) {
      return "Summarized: " + content.split(" ").slice(0, 10).join(" ") + "...";
  }

  // Function to update daily archive list
  function updateDailyArchiveList(date) {
      if (dailyArchiveList) {
          dailyArchiveList.innerHTML = ''; // Clear previous list
          const dailySummaries = dailyArchive[date];

          dailySummaries.forEach((summaryObj, index) => {
              const li = document.createElement('li');
              li.textContent = `${summaryObj.subject}: ${summaryObj.summary}`;
              dailyArchiveList.appendChild(li);
          });
      }
  }
});
